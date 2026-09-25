#!/usr/bin/env node
// ============================================================
//  PLAYER DNA SYNC — Perzentil-Profile fuer QB / RB / WR / TE
// ============================================================
//  NFL-Pendant zum "Cat Web" aus Taco Tuesday HQ: je Spieler und Saison
//  8 positionsspezifische Kategorien, jeweils als Perzentil (0-100)
//  gegen ALLE NFL-Spieler derselben Position mit Mindest-Volumen.
//
//  Quellen (nflverse, oeffentlich, taeglich aktualisiert):
//    stats_player_reg_<Saison>.csv    Basis-Stats inkl. EPA/CPOE/Shares
//    ngs_passing|rushing|receiving    Next Gen Stats (ab 2016, Saisonzeile week=0)
//    snap_counts_<Saison>.csv         Snap-Anteil (nur RB, ab 2012)
//    players.csv                      pfr_id -> gsis_id (fuer Snap Counts)
//
//  Vorjahre aendern sich nicht mehr -> werden aus der bestehenden
//  data/player-dna.js uebernommen, neu gerechnet wird nur die laufende
//  Saison (ausser DNA_REBUILD=1 oder die Kategorien haben sich geaendert).
//
//  Usage:
//    node scripts/sync-player-dna.js
//    DNA_REBUILD=1 node scripts/sync-player-dna.js      # alle Saisons neu
//    NFLVERSE_CACHE_DIR=/pfad node scripts/sync-player-dna.js  # lokale CSVs bevorzugen
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const zlib = require('zlib');
const https = require('https');
const { parseCsv, normTeam } = require('./lib/nflverse');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'player-dna.js');
const FIRST_SEASON = 2016; // ab hier gibt es Next Gen Stats
const REL = 'https://github.com/nflverse/nflverse-data/releases/download';

// ---------------- Kategorien ----------------
// v(r) bekommt die zusammengefuehrte Statzeile eines Spielers; null = kein Wert.
// invert: niedriger ist besser (Perzentil wird gespiegelt).
const div = (a, b) => (b > 0 ? a / b : null);
const CATEGORIES = {
  QB: [
    { k: 'vol',  label: 'Volumen',        unit: 'Att/Spiel',   v: r => div(r.attempts, r.games) },
    { k: 'epa',  label: 'EPA/Play',       unit: 'EPA',         v: r => div(r.passing_epa + r.rushing_epa, r.attempts + r.sacks_suffered + r.carries) },
    { k: 'cpoe', label: 'CPOE',           unit: '%',           v: r => r.passing_cpoe_raw },
    { k: 'adot', label: 'aDOT',           unit: 'Yds',         v: r => div(r.passing_air_yards, r.attempts) },
    { k: 'rush', label: 'Rushing',        unit: 'Yds/Spiel',   v: r => div(r.rushing_yards, r.games) },
    { k: 'td',   label: 'TD-Rate',        unit: '% der Att',   v: r => div(100 * r.passing_tds, r.attempts) },
    { k: 'sec',  label: 'Ball Security',  unit: 'TO % der Plays', invert: true, v: r => div(100 * (r.passing_interceptions + r.sack_fumbles_lost + r.rushing_fumbles_lost), r.attempts + r.carries) },
    { k: 'sack', label: 'Sack-Vermeidung', unit: 'Sack-%',     invert: true, v: r => div(100 * r.sacks_suffered, r.attempts + r.sacks_suffered) },
  ],
  RB: [
    { k: 'car',  label: 'Carries',        unit: '/Spiel',      v: r => div(r.carries, r.games) },
    { k: 'repa', label: 'Rush-EPA',       unit: 'EPA/Carry',   v: r => div(r.rushing_epa, r.carries) },
    { k: 'ryoe', label: 'RYOE',           unit: 'Yds/Carry',   v: r => r.ngs_ryoe },
    { k: 'tgt',  label: 'Target Share',   unit: '%',           v: r => r.target_share != null ? 100 * r.target_share : null },
    { k: 'recy', label: 'Receiving',      unit: 'Yds/Spiel',   v: r => div(r.receiving_yards, r.games) },
    { k: 'snap', label: 'Snap-Anteil',    unit: '%',           v: r => r.snap_pct },
    { k: 'td',   label: 'TDs',            unit: '/Spiel',      v: r => div(r.rushing_tds + r.receiving_tds, r.games) },
    { k: 'expl', label: 'Explosivität',   unit: '% Runs 10+',  v: r => div(100 * r.rushing_10, r.carries) },
  ],
  WR: null, // = REC (siehe unten)
  TE: null,
};
const REC = [
  { k: 'tgt',  label: 'Target Share',     unit: '%',          v: r => r.target_share != null ? 100 * r.target_share : null },
  { k: 'ay',   label: 'Air Yards Share',  unit: '%',          v: r => r.air_yards_share != null ? 100 * r.air_yards_share : null },
  { k: 'adot', label: 'aDOT',             unit: 'Yds',        v: r => div(r.receiving_air_yards, r.targets) },
  { k: 'yac',  label: 'YAC',              unit: 'Yds/Catch',  v: r => div(r.receiving_yards_after_catch, r.receptions) },
  { k: 'sep',  label: 'Separation',       unit: 'Yds (NGS)',  v: r => r.ngs_sep },
  { k: 'yds',  label: 'Receiving',        unit: 'Yds/Spiel',  v: r => div(r.receiving_yards, r.games) },
  { k: 'td',   label: 'TDs',              unit: '/Spiel',     v: r => div(r.receiving_tds, r.games) },
  { k: 'epa',  label: 'EPA/Target',       unit: 'EPA',        v: r => div(r.receiving_epa, r.targets) },
];
CATEGORIES.WR = REC;
CATEGORIES.TE = REC;

// Mindest-Volumen je Position, skaliert mit W = gespielte Wochen der Saison
const QUALIFIES = {
  QB: (r, W) => r.attempts >= 12 * W,
  RB: (r, W) => r.carries >= 5 * W,
  WR: (r, W) => r.targets >= 2.5 * W,
  TE: (r, W) => r.targets >= 2 * W,
};
const CAT_VERSION = 'v1:' + Object.entries(CATEGORIES).map(([p, cs]) => p + '=' + cs.map(c => c.k).join('.')).join('|');

// ---------------- Laden ----------------
function getBuffer(url, depth = 0) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'dpe-hq-bot' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && depth < 5) {
        res.resume();
        return getBuffer(res.headers.location, depth + 1).then(resolve, reject);
      }
      if (res.statusCode !== 200) { res.resume(); return reject(new Error(`HTTP ${res.statusCode} für ${url}`)); }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function loadCsv(relPath) {
  const name = path.basename(relPath);
  const cacheDir = process.env.NFLVERSE_CACHE_DIR;
  let buf;
  if (cacheDir && fs.existsSync(path.join(cacheDir, name))) buf = fs.readFileSync(path.join(cacheDir, name));
  else buf = await getBuffer(`${REL}/${relPath}`);
  const text = name.endsWith('.gz') ? zlib.gunzipSync(buf).toString('utf8') : buf.toString('utf8');
  return parseCsv(text); // liefert bereits Objekte (Header -> Wert)
}

const num = x => (x === undefined || x === '' || x === 'NA' ? null : Number(x));
const n0 = x => num(x) || 0;

// ---------------- Rechnen ----------------
function percentiles(values, invert) {
  // values: Array (Zahl|null) -> Perzentile 0-100 (null bleibt null)
  const sorted = values.filter(v => v != null && isFinite(v)).sort((a, b) => a - b);
  const n = sorted.length;
  return values.map(v => {
    if (v == null || !isFinite(v) || n < 2) return null;
    let lo = 0, hi = n;
    while (lo < hi) { const m = (lo + hi) >> 1; if (sorted[m] < v) lo = m + 1; else hi = m; }
    let eq = lo; while (eq < n && sorted[eq] === v) eq++;
    const p = 100 * ((lo + (eq - lo - 1) / 2) / (n - 1));
    return Math.round(invert ? 100 - p : p);
  });
}

function round(v) { return v == null ? null : Math.round(v * 1000) / 1000; }

async function buildSeason(season, shared) {
  const stats = await loadCsv(`stats_player/stats_player_reg_${season}.csv`);
  const ngs = shared.ngs;
  // W = gespielte Wochen der Saison (Leerzeilen ohne player_id = Teamsummen raus;
  // getradete Spieler koennen 18 Spiele haben -> auf 17 deckeln)
  const W = Math.min(17, Math.max(1, ...stats.filter(r => r.player_id && r.position).map(r => n0(r.games))));

  // Snap-Anteil (Durchschnitt offense_pct ueber Spiele mit Offense-Snaps)
  let snapByGsis = {};
  try {
    const snaps = await loadCsv(`snap_counts/snap_counts_${season}.csv`);
    const agg = {};
    snaps.forEach(s => {
      if (s.game_type && s.game_type !== 'REG') return;
      const pct = num(s.offense_pct);
      if (pct == null || n0(s.offense_snaps) <= 0) return;
      const a = agg[s.pfr_player_id] = agg[s.pfr_player_id] || { sum: 0, n: 0 };
      a.sum += pct; a.n++;
    });
    Object.entries(agg).forEach(([pfr, a]) => {
      const gsis = shared.pfrToGsis[pfr];
      if (gsis) snapByGsis[gsis] = 100 * a.sum / a.n;
    });
  } catch (e) {
    console.warn(`⚠️  Snap Counts ${season} nicht verfuegbar: ${e.message}`);
  }

  const out = {};
  for (const pos of ['QB', 'RB', 'WR', 'TE']) {
    const rows = stats.filter(r => r.player_id && r.position === pos).map(r => {
      const o = { id: r.player_id, name: r.player_display_name, team: normTeam(r.recent_team), games: n0(r.games) };
      ['attempts', 'passing_epa', 'rushing_epa', 'sacks_suffered', 'carries', 'passing_air_yards', 'rushing_yards',
        'passing_tds', 'passing_interceptions', 'sack_fumbles_lost', 'rushing_fumbles_lost', 'receiving_yards',
        'rushing_tds', 'receiving_tds', 'rushing_10', 'targets', 'receptions', 'receiving_air_yards',
        'receiving_yards_after_catch', 'receiving_epa'].forEach(k => { o[k] = n0(r[k]); });
      o.target_share = num(r.target_share);
      o.air_yards_share = num(r.air_yards_share);
      o.passing_cpoe_raw = num(r.passing_cpoe);
      const nR = ngs.rushing[`${season}|${r.player_id}`];
      const nC = ngs.receiving[`${season}|${r.player_id}`];
      o.ngs_ryoe = nR ? num(nR.rush_yards_over_expected_per_att) : null;
      o.ngs_sep = nC ? num(nC.avg_separation) : null;
      o.snap_pct = snapByGsis[r.player_id] != null ? snapByGsis[r.player_id] : null;
      return o;
    }).filter(r => QUALIFIES[pos](r, W));

    const cats = CATEGORIES[pos];
    const raw = rows.map(r => cats.map(c => { const v = c.v(r); return v != null && isFinite(v) ? v : null; }));
    const pcts = cats.map((c, ci) => percentiles(raw.map(x => x[ci]), c.invert));
    out[pos] = rows.map((r, i) => ({
      id: r.id, n: r.name, t: r.team, g: r.games,
      v: raw[i].map(round),
      p: cats.map((c, ci) => pcts[ci][i]),
    })).sort((a, b) => a.n.localeCompare(b.n));
  }
  return { weeks: W, players: out };
}

function loadExisting() {
  if (!fs.existsSync(OUT)) return null;
  try {
    const sb = {}; vm.createContext(sb);
    vm.runInContext(fs.readFileSync(OUT, 'utf8') + '\nthis.D = PLAYER_DNA;', sb);
    return sb.D || null;
  } catch (e) { return null; }
}

async function main() {
  const cfgSb = {}; vm.createContext(cfgSb);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'js', 'league-config.js'), 'utf8') + '\nthis.S = LEAGUE_SEASON;', cfgSb);
  const current = Number(process.env.DNA_SEASON || cfgSb.S);

  const existing = loadExisting();
  const reuse = existing && existing.version === CAT_VERSION && !process.env.DNA_REBUILD;

  console.log('Lade Next Gen Stats + players.csv ...');
  const ngs = { rushing: {}, receiving: {} };
  for (const kind of ['rushing', 'receiving']) {
    (await loadCsv(`nextgen_stats/ngs_${kind}.csv.gz`)).forEach(r => {
      if (r.week === '0' && r.season_type === 'REG') ngs[kind][`${r.season}|${r.player_gsis_id}`] = r;
    });
  }
  const pfrToGsis = {};
  (await loadCsv('players/players.csv')).forEach(p => { if (p.pfr_id && p.gsis_id) pfrToGsis[p.pfr_id] = p.gsis_id; });
  const shared = { ngs, pfrToGsis };

  const seasons = {};
  for (let y = FIRST_SEASON; y <= current; y++) {
    if (reuse && y < current && existing.seasons && existing.seasons[y]) { seasons[y] = existing.seasons[y]; continue; }
    try {
      seasons[y] = await buildSeason(y, shared);
      const c = Object.fromEntries(Object.entries(seasons[y].players).map(([p, l]) => [p, l.length]));
      console.log(`Saison ${y}: ${seasons[y].weeks} Wochen, ${JSON.stringify(c)}`);
    } catch (e) {
      if (existing && existing.seasons && existing.seasons[y]) { seasons[y] = existing.seasons[y]; console.warn(`⚠️  ${y}: ${e.message} -- alter Stand bleibt`); }
      else console.warn(`⚠️  ${y}: ${e.message} -- uebersprungen`);
    }
  }
  if (!seasons[current]) throw new Error(`Keine Daten fuer die laufende Saison ${current}.`);

  const categories = Object.fromEntries(Object.entries(CATEGORIES).map(([p, cs]) =>
    [p, cs.map(c => ({ k: c.k, label: c.label, unit: c.unit, invert: !!c.invert }))]));
  const data = { version: CAT_VERSION, current, categories, seasons };
  const body = `// ============================================================
//  PLAYER_DNA — Perzentil-Profile je Position (nflverse)
// ============================================================
//  AUTO-GENERIERT von scripts/sync-player-dna.js (GitHub Action
//  ".github/workflows/sync-player-dna.yml"). Nicht von Hand editieren.
//
//  PLAYER_DNA.seasons[Saison].players[Pos] = [{ id, n, t, g, v:[Rohwerte], p:[Perzentile] }]
//  Reihenfolge von v/p = PLAYER_DNA.categories[Pos]. null = kein Wert
//  (z.B. keine Next Gen Stats, weil unter der NGS-Mindestanzahl).
//  Pool = alle NFL-Spieler der Position mit Mindest-Volumen (skaliert mit
//  gespielten Wochen), NICHT nur die gerosterten Spieler der Liga.
// ============================================================

const PLAYER_DNA = ${JSON.stringify(data)};
`;
  const old = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : null;
  if (old === body) { console.log('Keine Aenderungen.'); return; }
  fs.writeFileSync(OUT, body, 'utf8');
  console.log(`✅ ${OUT} geschrieben (${Math.round(body.length / 1024)} KB, Saisons ${Object.keys(seasons).join(', ')}).`);
}

main().catch(e => { console.error('❌ Player DNA Sync fehlgeschlagen:', e.message); process.exit(1); });
