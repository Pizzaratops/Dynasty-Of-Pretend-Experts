// ============================================================
//  TRADES_HISTORY — Trades vor Sleeper (Saisons 2024 & 2025)
// ============================================================
//  MANUELL gepflegt, wird vom Sleeper-Sync NICHT ueberschrieben.
//  Die Liga lief vor 2026 nicht auf Sleeper, daher gibt es keine
//  exakten Daten -- die Reihenfolge innerhalb einer Saison ist
//  chronologisch (aeltester Trade zuerst).
//
//  a / b = Team-ID aus data/teams.js (Sleeper-Username, klein).
//  aGives / bGives = was das jeweilige Team abgibt.
//  "via X" = Pick gehoerte urspruenglich Team X.
// ============================================================

const TRADES_HISTORY_SEASONS = {
  2024: 'Saison 2024',
  2025: 'Offseason & Saison 2025',
};

const TRADES_HISTORY = [
  // ---------------- Saison 2024 ----------------
  { season: 2024, a: "milchreis", aGives: ["Terry McLaurin", "2025 4th"], b: "lovethecheesehead", bGives: ["2025 1st"] },
  { season: 2024, a: "milchreis", aGives: ["George Pickens", "2025 3rd"], b: "giantmarv", bGives: ["2025 1st"] },
  { season: 2024, a: "bomba12", aGives: ["Jayden Reed", "2025 4th"], b: "unicornsruegen", bGives: ["2025 1st"] },
  { season: 2024, a: "milchreis", aGives: ["Drake Maye", "2025 3rd (via Blowout Arctic Yetis)"], b: "jiggydee2312", bGives: ["2025 2nd"] },
  { season: 2024, a: "r4xon", aGives: ["Josh Jacobs", "2025 4th", "2026 4th", "2027 4th"], b: "lovethecheesehead", bGives: ["Braelon Allen", "2026 3rd", "2027 3rd"],
    note: "Pick-Swap: 4th gegen 3rd in 2026 und 2027" },
  { season: 2024, a: "milchreis", aGives: ["2025 1st (via Tempelhof Thunder Turtles)"], b: "bomba12", bGives: ["Kyle Pitts Sr.", "Rome Odunze", "David Njoku", "2025 4th"],
    note: "Konditional: TTT-1st 2025 oder eigener 1st 2026 — es wurde der TTT-1st 2025" },
  { season: 2024, a: "lovethecheesehead", aGives: ["Najee Harris", "2025 4th (via Husum Husos)"], b: "svennyg", bGives: ["2025 2nd (2.02)"] },

  // ---------------- Offseason & Saison 2025 ----------------
  { season: 2025, a: "milchreis", aGives: ["2025 1st", "2026 4th"], b: "lovethecheesehead", bGives: ["2025 4th", "2026 1st"] },
  { season: 2025, a: "dickvanhurik", aGives: ["Roman Wilson", "2026 3rd"], b: "danfre", bGives: ["Justin Fields"] },
  { season: 2025, a: "lovethecheesehead", aGives: ["Michael Pittman Jr.", "2026 2nd"], b: "jiggydee2312", bGives: ["Marvin Harrison Jr."] },
  { season: 2025, a: "milchreis", aGives: ["Dak Prescott"], b: "svennyg", bGives: ["2026 3rd"] },
  { season: 2025, a: "lovethecheesehead", aGives: ["Terry McLaurin"], b: "danfre", bGives: ["Derrick Henry"] },
  { season: 2025, a: "milchreis", aGives: ["Keon Coleman", "Dylan Sampson"], b: "r4xon", bGives: ["2026 1st"] },
  { season: 2025, a: "milchreis", aGives: ["2026 1st", "Kenneth Walker III"], b: "dickvanhurik", bGives: ["Rashee Rice"] },
  { season: 2025, a: "danfre", aGives: ["Roman Wilson", "Tank Bigsby"], b: "r4xon", bGives: ["Sam LaPorta"] },
  { season: 2025, a: "milchreis", aGives: ["Khalil Shakir"], b: "giantmarv", bGives: ["2026 1st"] },
  { season: 2025, a: "lovethecheesehead", aGives: ["2026 3rd", "Isaiah Guerendo"], b: "jiggydee2312", bGives: ["Jordan Love"] },
  { season: 2025, a: "lovethecheesehead", aGives: ["Jacory Croskey-Merritt", "Amari Cooper"], b: "unicornsruegen", bGives: ["Cooper Kupp"] },
  { season: 2025, a: "lovethecheesehead", aGives: ["Kyren Williams"], b: "milchreis", bGives: ["Rashee Rice"] },
  { season: 2025, a: "bomba12", aGives: ["Davante Adams", "2026 3rd"], b: "lovethecheesehead", bGives: ["2027 1st"],
    note: "inkl. potenziellem 2027 Pick-Swap" },
  { season: 2025, a: "dseinn", aGives: ["Tyrone Tracy Jr.", "Jahmyr Gibbs"], b: "lovethecheesehead", bGives: ["Kyler Murray", "Cam Skattebo", "Nico Collins", "2027 2nd"] },
  { season: 2025, a: "dseinn", aGives: ["DK Metcalf"], b: "r4xon", bGives: ["2027 1st", "2026 3rd"] },
  { season: 2025, a: "bomba12", aGives: ["2026 1st", "2027 1st (via San José Salamancas)", "Rashid Shaheed"], b: "jiggydee2312", bGives: ["Amon-Ra St. Brown"] },
  { season: 2025, a: "giantmarv", aGives: ["Chuba Hubbard", "2026 3rd"], b: "lovethecheesehead", bGives: ["Jordan Mason"] },
  { season: 2025, a: "danfre", aGives: ["Luther Burden III"], b: "milchreis", bGives: ["Kyle Pitts Sr."] },
  { season: 2025, a: "lovethecheesehead", aGives: ["2026 3rd (via Tempelhof Thunder Turtles)", "2026 4th"], b: "jiggydee2312", bGives: ["Stefon Diggs"] },
  { season: 2025, a: "milchreis", aGives: ["Xavier Worthy", "2026 3rd"], b: "unicornsruegen", bGives: ["Breece Hall"] },
  { season: 2025, a: "giantmarv", aGives: ["Alvin Kamara"], b: "jiggydee2312", bGives: ["C.J. Stroud", "Chuba Hubbard"] },
  { season: 2025, a: "lovethecheesehead", aGives: ["Cooper Kupp"], b: "jiggydee2312", bGives: ["Evan Engram"] },
  { season: 2025, a: "giantmarv", aGives: ["Tory Horton"], b: "milchreis", bGives: ["Rhamondre Stevenson"] },
  { season: 2025, a: "dickvanhurik", aGives: ["T.J. Hockenson", "2026 3rd"], b: "unicornsruegen", bGives: ["Woody Marks"] },
  { season: 2025, a: "unicornsruegen", aGives: ["Chase Brown", "2026 2nd"], b: "lovethecheesehead", bGives: ["Marvin Harrison Jr.", "2026 3rd"] },
  { season: 2025, a: "lovethecheesehead", aGives: ["Davante Adams", "Derrick Henry", "Stefon Diggs"], b: "teambeermode", bGives: ["2026 3rd", "2027 1st"] },
  { season: 2025, a: "lovethecheesehead", aGives: ["Rashee Rice"], b: "jiggydee2312", bGives: ["2026 2nd", "2027 1st"] },
  { season: 2025, a: "lovethecheesehead", aGives: ["Chase Brown", "2027 4th"], b: "danfre", bGives: ["2027 1st"] },
  { season: 2025, a: "lovethecheesehead", aGives: ["2026 4th"], b: "unicornsruegen", bGives: ["Tyler Allgeier"] },
  { season: 2025, a: "lovethecheesehead", aGives: ["Jake Ferguson", "2026 3rd (via RioRainRats)"], b: "giantmarv", bGives: ["2026 2nd"] },
  { season: 2025, a: "jiggydee2312", aGives: ["Rashee Rice"], b: "milchreis", bGives: ["Bhayshul Tuten", "Ricky Pearsall"],
    note: "Genauer Zeitpunkt unbekannt, zwischen Rice zu den Sloths und dem Saisonende" },
  { season: 2025, a: "milchreis", aGives: ["Brock Purdy", "AJ Barner"], b: "r4xon", bGives: ["Colston Loveland"] },
];
