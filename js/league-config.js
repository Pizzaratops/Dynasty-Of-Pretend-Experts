// ============================================================
//  Dynasty of Pretend Experts HQ — Liga-Konfiguration (von Hand)
// ============================================================
//  Wird im Browser (index.html) UND von den Sync-Skripten gelesen.
//
//  ⚠️ JEDES JAHR NACH DEM SAISONWECHSEL PRUEFEN: Sleeper legt fuer
//  Dynasty-Ligen beim "Renew" eine NEUE League-ID an (die alte bleibt
//  als previous_league_id verlinkt). Dann hier SLEEPER_LEAGUE_ID auf die
//  neue ID setzen (steht in der URL: sleeper.com/leagues/<ID>).
// ============================================================

const SLEEPER_LEAGUE_ID = "1312799736218017792";
const LEAGUE_SEASON = 2026;

const LEAGUE_BRAND = {
  name: "Dynasty of Pretend Experts",
  short: "DPE",
  emoji: "🧐",
};

// Countdowns auf der Startseite. Beliebig ergaenzen/entfernen.
// iso = Zeitpunkt mit Zeitzone (MEZ = +01:00, MESZ = +02:00).
// Waehrend der Saison wird zusaetzlich automatisch ein Countdown bis zum
// naechsten Waiver-Lauf angezeigt (aus den Sleeper-Settings).
const LEAGUE_COUNTDOWNS = [
  // Woche 15 = playoff_week_start in Sleeper. TNF Woche 15 (17.12.2026,
  // 20:15 ET) -- Datum bei Bedarf gegen den NFL-Spielplan pruefen.
  { label: "🏆 Playoffs (Woche 15)", iso: "2026-12-18T02:15:00+01:00" },
];
