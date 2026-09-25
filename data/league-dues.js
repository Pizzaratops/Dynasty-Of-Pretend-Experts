// ============================================================
//  LEAGUE_DUES — Liga-Beiträge nach Saison, manuell gepflegt
// ============================================================
//  Traegt nur ein, WER SCHON BEZAHLT HAT (LEAGUE_DUES_PAID). Alles, was
//  hier nicht als bezahlt eingetragen ist, wird automatisch berechnet:
//
//   - Fuer die aktuelle Saison (CURRENT_DUES_YEAR) gilt ohne Eintrag
//     automatisch "muss zahlen" -- jeder zahlt jedes Jahr.
//   - Fuer Zukunftsjahre gilt "offen", AUSSER das Team taucht in
//     FUTURE_PICKS (data/trades.js, automatisch aus Sleeper) fuer dieses
//     Jahr auf (als urspruenglicher Besitzer "from" ODER als aktueller
//     Besitzer "owner" eines getradeten Picks) -- dann "muss zahlen".
//
//  Zum Eintragen einer Zahlung: { team, year } ergaenzen. team = die
//  Team-ID aus data/teams.js (= Sleeper-Username in Kleinbuchstaben, z.B.
//  "milchreis") -- bleibt stabil, auch wenn jemand seinen Teamnamen
//  aendert. Der aktuelle Teamname funktioniert zur Not auch.
// ============================================================

const DUES_YEARS = [2026, 2027, 2028, 2029];
const CURRENT_DUES_YEAR = 2026;

const LEAGUE_DUES_PAID = [
  // { team: "milchreis", year: 2026 },
];

// Rueckgabe: "paid" | "owes" | "not-relevant"
function leagueDuesStatus(teamName, year) {
  const team = (typeof LEAGUE_TEAMS !== 'undefined' ? LEAGUE_TEAMS : []).find(t => t.name === teamName);
  const keys = [teamName, team && team.id].filter(Boolean);
  const paid = LEAGUE_DUES_PAID.some(d => keys.includes(d.team) && d.year === year);
  if (paid) return "paid";
  if (year <= CURRENT_DUES_YEAR) return "owes";
  const picks = (typeof FUTURE_PICKS !== 'undefined' ? (FUTURE_PICKS[year] || []) : []);
  const involved = picks.some(p => p.from === teamName || p.owner === teamName);
  return involved ? "owes" : "not-relevant";
}
