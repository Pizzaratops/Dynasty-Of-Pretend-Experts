// ============================================================
//  LEAGUE_DUES — Liga-Beiträge nach Saison, manuell gepflegt
// ============================================================
//  Traegt nur ein, WER SCHON BEZAHLT HAT (LEAGUE_DUES_PAID). Alles, was
//  hier nicht eingetragen ist, gilt als "offen".
//
//  Zum Eintragen einer Zahlung: { team, year } ergaenzen. team = die
//  Team-ID aus data/teams.js (= Sleeper-Username in Kleinbuchstaben, z.B.
//  "milchreis") -- bleibt stabil, auch wenn jemand seinen Teamnamen
//  aendert. Der aktuelle Teamname funktioniert zur Not auch.
// ============================================================

const DUES_YEARS = [2026, 2027, 2028, 2029];
const CURRENT_DUES_YEAR = 2026;

const LEAGUE_DUES_PAID = [
  // Blowout Arctic Yetis: bis einschl. 2029
  { team: "bomba12", year: 2026 },
  { team: "bomba12", year: 2027 },
  { team: "bomba12", year: 2028 },
  { team: "bomba12", year: 2029 },
  // Berlin Lightning Sloths: bis einschl. 2029
  { team: "jiggydee2312", year: 2026 },
  { team: "jiggydee2312", year: 2027 },
  { team: "jiggydee2312", year: 2028 },
  { team: "jiggydee2312", year: 2029 },
  // Tokyo Titi Twisters: bis einschl. 2029
  { team: "milchreis", year: 2026 },
  { team: "milchreis", year: 2027 },
  { team: "milchreis", year: 2028 },
  { team: "milchreis", year: 2029 },
  // San José Salamancas: bis einschl. 2028
  { team: "lovethecheesehead", year: 2026 },
  { team: "lovethecheesehead", year: 2027 },
  { team: "lovethecheesehead", year: 2028 },
  // 2027: alle ausser SvenNYG, AmericanWildfireGrizzlies, AngryDucks
  { team: "dickvanhurik", year: 2027 },
  { team: "teambeermode", year: 2027 },
  { team: "dseinn", year: 2027 },
  { team: "giantmarv", year: 2027 },
  { team: "r4xon", year: 2027 },
  { team: "danfre", year: 2027 },
  { team: "unicornsruegen", year: 2027 },
];

// Rueckgabe: "paid" | "open"
function leagueDuesStatus(teamName, year) {
  const team = (typeof LEAGUE_TEAMS !== 'undefined' ? LEAGUE_TEAMS : []).find(t => t.name === teamName);
  const keys = [teamName, team && team.id].filter(Boolean);
  return LEAGUE_DUES_PAID.some(d => keys.includes(d.team) && d.year === year) ? "paid" : "open";
}
