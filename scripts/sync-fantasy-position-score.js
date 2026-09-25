#!/usr/bin/env node
// ============================================================
//  FANTASY POWER SCORE SYNC — 6-Kategorien-Spinnennetz je Fantasy-Team
// ============================================================
//  Fantasy-Pendant zu scripts/sync-nfl-power-score.js -- gleiche Idee
//  (Rang 1-12 je Kategorie, kumulativ + pro Woche isoliert), aber für
//  die eigene Liga (14 Teams) statt für die 32 NFL-Teams:
//
//    1. Points Scored     -> eigene wöchentliche Punktzahl
//    2. Points Allowed    -> Punktzahl des Gegners
//    3. Points by QB      -> Punkte der QB-Starter
//    4. Points by RB      -> Punkte der RB-Starter (inkl. FLEX, falls RB)
//    5. Points by WR      -> Punkte der WR-Starter (inkl. FLEX, falls WR)
//    6. Points by TE      -> Punkte der TE-Starter (inkl. FLEX, falls TE)
//
//  WICHTIG zur FLEX-Zuordnung: gezählt wird nach der ECHTEN Position
//  des Spielers, NICHT nach dem Lineup-Slot -- ein WR im FLEX-Slot
//  zaehlt zu "Points by WR". K/DST fliessen in keine der 4 Positions-
//  Kategorien ein (nur in Points Scored/Allowed).
//
//  Datenquellen (beide von scripts/sync-sleeper.js geschrieben, KEIN
//  eigener API-Abruf mehr noetig):
//    data/weekly-scores.js    -> Points Scored / Allowed
//    data/position-points.js  -> Points by QB/RB/WR/TE
//
//  Usage:
//    node scripts/sync-fantasy-position-score.js
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'fantasy-power-score.js');

const CATEGORIES = [
  { key: 'pointsFor', label: 'Points Scored', unit: 'pro Woche', better: 'high' },
  { key: 'pointsAgainst', label: 'Points Allowed', unit: 'pro Woche zugelassen', better: 'low' },
  { key: 'qbPts', label: 'Points by QB', unit: 'pro Woche', better: 'high' },
  { key: 'rbPts', label: 'Points by RB', unit: 'pro Woche', better: 'high' },
  { key: 'wrPts', label: 'Points by WR', unit: 'pro Woche', better: 'high' },
  { key: 'tePts', label: 'Points by TE', unit: 'pro Woche', better: 'high' },
];
const NON_STARTER_SLOTS = [20, 21]; // Bench, IR

function loadModuleSandbox(files) {
  const sandbox = {};
  vm.createContext(sandbox);
  files.forEach(f => {
    const code = fs.readFileSync(f, 'utf8');
    const names = [...code.matchAll(/^const\s+([A-Za-z_\$][\w\$]*)/gm)].map(m => m[1]);
    const expose = names.map(n => `this.${n} = ${n};`).join('\n');
    vm.runInContext(code + '\n' + expose, sandbox);
  });
  return sandbox;
}

function loadConfig() {
  const sandbox = loadModuleSandbox([path.join(ROOT, 'js', 'league-config.js')]);
  return { SEASON: sandbox.LEAGUE_SEASON };
}
function loadLeagueTeams() {
  return loadModuleSandbox([path.join(ROOT, 'data', 'teams.js')]).LEAGUE_TEAMS;
}
function loadWeeklyScores(season) {
  const sandbox = loadModuleSandbox([path.join(ROOT, 'data', 'weekly-scores.js')]);
  return (sandbox.WEEKLY_SCORES && sandbox.WEEKLY_SCORES[season]) || {};
}
function loadExisting() {
  if (!fs.existsSync(OUT)) return { weeks: {} };
  const sandbox = {};
  vm.createContext(sandbox);
  try {
    vm.runInContext(fs.readFileSync(OUT, 'utf8') + '\nthis.FANTASY_POWER_SCORE = FANTASY_POWER_SCORE;', sandbox);
    return sandbox.FANTASY_POWER_SCORE && sandbox.FANTASY_POWER_SCORE.weeks ? sandbox.FANTASY_POWER_SCORE : { weeks: {} };
  } catch (e) {
    console.warn('⚠️  Konnte bestehende fantasy-power-score.js nicht parsen, starte frisch:', e.message);
    return { weeks: {} };
  }
}

function round2(n) { return Math.round(n * 100) / 100; }

function assignRanks(list) {
  CATEGORIES.forEach(cat => {
    const withValue = list.filter(t => t.values[cat.key] != null);
    const sorted = withValue.slice().sort((a, b) =>
      cat.better === 'high' ? b.values[cat.key] - a.values[cat.key] : a.values[cat.key] - b.values[cat.key]
    );
    sorted.forEach((t, i) => { t.ranks[cat.key] = i + 1; });
    list.filter(t => t.values[cat.key] == null).forEach(t => { t.ranks[cat.key] = null; });
  });
}

function loadPositionPoints(season) {
  const sandbox = loadModuleSandbox([path.join(ROOT, 'data', 'position-points.js')]);
  return (sandbox.POSITION_POINTS && sandbox.POSITION_POINTS[season]) || {};
}

async function main() {
  const cfg = loadConfig();
  const leagueTeams = loadLeagueTeams();
  const season = cfg.SEASON;
  const weeklyScores = loadWeeklyScores(season);
  const playedWeeks = Object.keys(weeklyScores).map(Number).filter(w => (weeklyScores[w] || []).length > 0).sort((a, b) => a - b);

  if (!playedWeeks.length) {
    console.log(`Season ${season}: noch keine gespielte Woche in data/weekly-scores.js -- Sync übersprungen, keine Datei geschrieben.`);
    return;
  }

  const perWeekPosition = loadPositionPoints(season); // week -> {teamId -> {qbPts,...}}

  const allTeamIds = leagueTeams.map(t => t.id);
  const weeksOut = {};

  playedWeeks.forEach(uptoWeek => {
    const weeklyList = allTeamIds.map(teamId => {
      const scoreEntry = (weeklyScores[uptoWeek] || []).find(e => e.teamId === teamId);
      const posEntry = (perWeekPosition[uptoWeek] || {})[teamId];
      const values = {
        pointsFor: scoreEntry ? scoreEntry.points : null,
        pointsAgainst: scoreEntry ? scoreEntry.opponentPoints : null,
        qbPts: posEntry ? posEntry.qbPts : null,
        rbPts: posEntry ? posEntry.rbPts : null,
        wrPts: posEntry ? posEntry.wrPts : null,
        tePts: posEntry ? posEntry.tePts : null,
      };
      return { teamId, values, ranks: {} };
    });
    assignRanks(weeklyList);

    const cumulativeList = allTeamIds.map(teamId => {
      const weeksSoFar = playedWeeks.filter(w => w <= uptoWeek);
      const values = {};
      CATEGORIES.forEach(cat => {
        const vals = weeksSoFar
          .map(w => {
            const scoreEntry = (weeklyScores[w] || []).find(e => e.teamId === teamId);
            const posEntry = (perWeekPosition[w] || {})[teamId];
            if (cat.key === 'pointsFor') return scoreEntry ? scoreEntry.points : null;
            if (cat.key === 'pointsAgainst') return scoreEntry ? scoreEntry.opponentPoints : null;
            return posEntry ? posEntry[cat.key] : null;
          })
          .filter(v => v != null);
        values[cat.key] = vals.length ? round2(vals.reduce((a, b) => a + b, 0) / vals.length) : null;
      });
      return { teamId, values, ranks: {}, gamesPlayed: weeksSoFar.length };
    });
    assignRanks(cumulativeList);

    weeksOut[uptoWeek] = { cumulative: cumulativeList, weekly: weeklyList };
  });

  const out = `// ============================================================
//  FANTASY_POWER_SCORE — "Bootleg Power Score" fürs Fantasy-Team (Sleeper)
// ============================================================
//  AUTO-GENERIERT von scripts/sync-fantasy-position-score.js über die
//  GitHub Action ".github/workflows/sync-fantasy-position-score.yml".
//  Nicht von Hand editieren.
//
//  6 Kategorien: Points Scored, Points Allowed, Points by QB/RB/WR/TE
//  (FLEX zaehlt nach echter Spieler-Position, K/DST fliessen in keine
//  der 4 Positions-Kategorien ein). Struktur identisch zu
//  data/nfl-power-score.js, nur mit unseren Team-IDs (data/teams.js)
//  statt NFL-Kuerzeln und Rang 1-N (N = Anzahl Teams) statt 1-32.
//
//  FANTASY_POWER_SCORE.weeks[week] = { cumulative, weekly }, je ein
//  Array aller Teams: { teamId, values:{<key>:Zahl|null},
//  ranks:{<key>:1-N|null} }.
// ============================================================

const FANTASY_POWER_SCORE = {
  season: ${season},
  teamCount: ${allTeamIds.length},
  categories: ${JSON.stringify(CATEGORIES, null, 2).split('\n').join('\n  ')},
  weeks: ${JSON.stringify(weeksOut, null, 2).split('\n').join('\n  ')}
};
`;

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, out, 'utf8');
  console.log(`${OUT} aktualisiert: Season ${season}, Wochen ${playedWeeks[0]}–${playedWeeks[playedWeeks.length - 1]}, ${allTeamIds.length} Teams, 6 Kategorien.`);
}

main().then(() => process.exit(0)).catch(err => {
  console.error('Fantasy Power Score Sync fehlgeschlagen:', err.message);
  process.exit(1);
});
