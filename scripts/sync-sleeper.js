#!/usr/bin/env node
// ============================================================
//  SLEEPER SYNC — Dynasty of Pretend Experts HQ
// ============================================================
//  Ersetzt die vier ESPN-Syncs aus Bear Witch Project HQ durch EINEN
//  Lauf gegen die oeffentliche Sleeper-API (kein Login, keine Cookies):
//
//    data/teams.js          LEAGUE_TEAMS (Emoji/Owner-Name bleiben erhalten)
//    data/rosters-live.js   ROSTERS_LIVE + TEAM_RECORDS_LIVE
//    data/weekly-scores.js  WEEKLY_SCORES (inkl. Median-Spiel)
//    data/schedule.js       SCHEDULE (kompletter Spielplan)
//    data/position-points.js POSITION_POINTS (fuer Fantasy Power Score)
//    data/draft.js          Rookie Draft (Ergebnisse bzw. Order + getradete Picks)
//    data/trades.js         TRADES + FUTURE_PICKS (automatisch aus Sleeper!)
//    data/player-stats.js   PLAYER_SEASON_STATS (mit Liga-Scoring berechnet)
//    data/projections.js    PLAYER_PROJECTIONS (mit Liga-Scoring berechnet)
//    data/league-info.js    LEAGUE_INFO (Settings, Scoring, Roster-Slots)
//
//  Dateien werden nur geschrieben, wenn sich ihr Inhalt wirklich
//  geaendert hat -> keine Leer-Commits der GitHub Action.
//
//  Usage:
//    node scripts/sync-sleeper.js
//  Offline gegen gespeicherte Rohdaten testen:
//    SLEEPER_FIXTURE=pfad/raw.json node scripts/sync-sleeper.js
//  players/nfl (~5MB) cachen (GitHub Action macht das automatisch):
//    SLEEPER_PLAYERS_CACHE_PATH=/tmp/sleeper-players.json
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const core = require('./lib/sleeper-core');
const sfetch = require('./lib/sleeper-fetch');

const ROOT = path.join(__dirname, '..');
const D = f => path.join(ROOT, 'data', f);

function loadModuleSandbox(files) {
  const sandbox = {};
  vm.createContext(sandbox);
  files.forEach(f => {
    if (!fs.existsSync(f)) return;
    const code = fs.readFileSync(f, 'utf8');
    const names = [...code.matchAll(/^\s*const\s+([A-Za-z_\$][\w\$]*)/gm)].map(m => m[1]);
    const expose = names.map(n => `try { this.${n} = ${n}; } catch (e) {}`).join('\n');
    try { vm.runInContext(code + '\n' + expose, sandbox); }
    catch (e) { console.warn(`⚠️  ${path.basename(f)} nicht lesbar: ${e.message}`); }
  });
  return sandbox;
}

function header(title, lines) {
  return `// ============================================================
//  ${title}
// ============================================================
//  AUTO-GENERIERT von scripts/sync-sleeper.js (GitHub Action
//  ".github/workflows/sync-sleeper.yml"). Nicht von Hand editieren --
//  Aenderungen werden beim naechsten Sync ueberschrieben.${lines ? '\n' + lines.map(l => '//  ' + l).join('\n') : ''}
// ============================================================

`;
}

const changed = [];
function writeIfChanged(file, content) {
  const old = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
  if (old === content) return false;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, 'utf8');
  changed.push(path.relative(ROOT, file));
  return true;
}
const J = (v, indent) => JSON.stringify(v, null, indent === undefined ? 1 : indent);

async function loadPlayers() {
  const cache = process.env.SLEEPER_PLAYERS_CACHE_PATH;
  if (cache && fs.existsSync(cache)) {
    try { return JSON.parse(fs.readFileSync(cache, 'utf8')); } catch (e) { /* neu laden */ }
  }
  console.log('Lade players/nfl (~5MB) ...');
  const all = await sfetch.getJson(`${sfetch.API}/players/nfl`);
  const slim = sfetch.slimPlayers(all);
  if (cache) fs.writeFileSync(cache, JSON.stringify(slim));
  return slim;
}

async function main() {
  const cfg = loadModuleSandbox([path.join(ROOT, 'js', 'league-config.js')]);
  const leagueId = process.env.SLEEPER_LEAGUE_ID || cfg.SLEEPER_LEAGUE_ID;
  if (!leagueId) throw new Error('SLEEPER_LEAGUE_ID fehlt in js/league-config.js');

  const existing = loadModuleSandbox([D('teams.js'), D('dynasty-board.js'), D('trade-values.js')]);
  const canonNames = [
    ...((existing.DYNASTY_BOARD || []).map(p => p.name)),
    ...((existing.TRADE_VALUES || []).map(p => p.name)),
  ];

  let raw;
  if (process.env.SLEEPER_FIXTURE) {
    raw = JSON.parse(fs.readFileSync(process.env.SLEEPER_FIXTURE, 'utf8'));
    console.log(`Fixture geladen: ${process.env.SLEEPER_FIXTURE}`);
  } else {
    raw = await sfetch.fetchRaw({ leagueId, loadPlayers, withStats: true, withProjections: true, log: m => console.log(m) });
  }

  const out = core.buildAll(raw, { existingTeams: existing.LEAGUE_TEAMS || [], canonNames });
  const season = out.season;

  const totalPlayers = Object.values(out.rosters).reduce((s, r) => s + r.length, 0);
  if (out.teams.length < 2 || totalPlayers < 100) {
    throw new Error(`Nur ${out.teams.length} Teams / ${totalPlayers} Spieler -- sieht nach Teil-/Fehlantwort aus, breche ab ohne zu schreiben.`);
  }

  // ---- teams.js ----
  writeIfChanged(D('teams.js'), header('LEAGUE_TEAMS — Teams der Liga', [
    'id = Sleeper-Username (stabil, auch wenn der Teamname sich aendert).',
    'emoji/owner duerfen HIER von Hand angepasst werden -- der Sync',
    'uebernimmt sie beim naechsten Lauf (alles andere wird ueberschrieben).',
  ]) + `const LEAGUE_TEAMS = [\n${out.teams.map(t => '  ' + JSON.stringify(t)).join(',\n')}\n];\n`);

  // ---- rosters-live.js ----
  const rosterLines = Object.keys(out.rosters).sort().map(tid =>
    `  "${tid}": [${out.rosters[tid].map(p => JSON.stringify(p)).join(', ')}]`);
  writeIfChanged(D('rosters-live.js'), header('ROSTERS_LIVE — volle Kader aus Sleeper', [
    'slot: "TAXI" = Taxi Squad, "IR" = Reserve-Slot. isStarter = aktuelles Lineup.',
  ]) + `const ROSTERS_LIVE = {\n${rosterLines.join(',\n')}\n};\n\nconst TEAM_RECORDS_LIVE = {\n  season: ${season},\n  records: ${JSON.stringify(out.records)},\n  detail: ${JSON.stringify(out.recordDetail)}\n};\n`);

  // ---- weekly-scores.js / schedule.js / position-points.js ----
  // Vorjahre bleiben erhalten (Sleeper-Liga-ID wechselt jede Saison).
  const oldScores = loadModuleSandbox([D('weekly-scores.js')]).WEEKLY_SCORES || {};
  const scores = { ...oldScores, ...out.weeklyScores };
  writeIfChanged(D('weekly-scores.js'), header('WEEKLY_SCORES — woechentliche Matchup-Punkte', [
    'Nur abgeschlossene Wochen (Sleeper last_scored_leg). medianResult =',
    'Ergebnis im Zusatzspiel gegen den Liga-Median (league_average_match).',
  ]) + `const WEEKLY_SCORES = ${J(scores)};\n`);

  writeIfChanged(D('schedule.js'), header('SCHEDULE — kompletter Regular-Season-Spielplan') +
    `const SCHEDULE = ${J(out.schedule)};\n`);

  const oldPP = loadModuleSandbox([D('position-points.js')]).POSITION_POINTS || {};
  writeIfChanged(D('position-points.js'), header('POSITION_POINTS — Starter-Punkte nach echter Position', [
    'POSITION_POINTS[season][week][teamId] = { qbPts, rbPts, wrPts, tePts, kPts, defPts }',
    'Quelle fuer scripts/sync-fantasy-position-score.js.',
  ]) + `const POSITION_POINTS = ${J({ ...oldPP, ...out.positionPoints })};\n`);

  // ---- draft.js ----
  const dr = out.draft;
  writeIfChanged(D('draft.js'), header(`ROOKIE DRAFT ${dr.season || ''} — aus Sleeper`, [
    'Laeuft der Draft noch nicht, ist DRAFT_RESULTS leer und das Board zeigt',
    'die Pick-Besitzer (inkl. getradeter Picks aus TRADED_PICKS_CURRENT).',
  ]) +
`const DRAFT_SEASON = ${J(dr.season)};
const DRAFT_STATUS = ${J(dr.status)};
const DRAFT_TYPE = ${J(dr.type)};
const TOTAL_DRAFT_ROUNDS = ${J(dr.rounds)};
const DRAFT_DATE = ${J(dr.startTime)};
const DRAFT_ORDER = ${J(dr.order, 2)};
const DRAFT_TEAMS = ${J(out.teams.map(t => ({ team: t.name, keepers: [] })), 0)};
const DRAFT_RESULTS = ${J(dr.results)};
`);

  // ---- trades.js ----
  writeIfChanged(D('trades.js'), header('TRADES & PICKS — automatisch aus Sleeper', [
    'TRADES: alle abgeschlossenen Trades der Saison (neueste zuerst).',
    'TRADED_PICKS_CURRENT: getradete Picks des NOCH NICHT gelaufenen Rookie Drafts.',
    'FUTURE_PICKS: nur Picks, die den Besitzer gewechselt haben ("from" =',
    'urspruengliches Team, "owner" = aktueller Besitzer). Rest = "Own".',
  ]) +
`const TRADES = ${J(out.trades)};

const TRADED_PICKS_CURRENT = ${J(dr.tradedPicks)};

const FUTURE_PICKS = ${J(out.futurePicks)};
`);

  // ---- player-stats.js / projections.js (nur wenn Daten da) ----
  if (out.playerStats && out.playerStats.players.length) {
    const ps = { ...out.playerStats }; delete ps.updated;
    writeIfChanged(D('player-stats.js'), header('PLAYER_SEASON_STATS — echte Wochenpunkte (Liga-Scoring)') +
      `const PLAYER_SEASON_STATS = ${JSON.stringify(ps)};\n`);
  }
  if (out.projections && out.projections.players.length > 50) {
    const pr = { ...out.projections }; delete pr.updated;
    writeIfChanged(D('projections.js'), header('PLAYER_PROJECTIONS — Saisonprojektionen (Liga-Scoring)', [
      'Quelle: Sleeper/Rotowire-Projektionen, mit den echten Scoring-Settings',
      'der Liga neu berechnet.',
    ]) + `const PLAYER_PROJECTIONS = ${JSON.stringify(pr)};\n`);
  }

  // ---- league-info.js (Zeitstempel nur bei echten Aenderungen) ----
  const infoFile = D('league-info.js');
  const oldInfo = loadModuleSandbox([infoFile]).LEAGUE_INFO || {};
  const info = { ...out.leagueInfo };
  const cmpNew = J(info), cmpOld = J({ ...oldInfo, syncedAt: undefined });
  info.syncedAt = (changed.length || cmpNew !== cmpOld || !oldInfo.syncedAt) ? new Date().toISOString() : oldInfo.syncedAt;
  writeIfChanged(infoFile, header('LEAGUE_INFO — Liga-Settings aus Sleeper') + `const LEAGUE_INFO = ${J(info)};\n`);

  console.log(`✅ Sleeper Sync: ${out.teams.length} Teams, ${totalPlayers} Kaderspieler, ` +
    `${Object.keys(out.weeklyScores[season] || {}).length} gewertete Wochen, ${out.trades.length} Trades.`);
  console.log(changed.length ? `Geaendert: ${changed.join(', ')}` : 'Keine Aenderungen.');
}

main().catch(err => {
  console.error('❌ Sleeper Sync fehlgeschlagen:', err.message);
  process.exit(1); // sichtbarer Fehlschlag in der Action (letzter guter Stand bleibt)
});
