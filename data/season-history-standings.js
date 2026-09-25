// ============================================================
//  SEASON_HISTORY_STANDINGS — Regular-Season-Endplatzierungen
// ============================================================
//  Manuell nach jeder Saison ergaenzen (Teamnamen wie im jeweiligen Jahr):
//  { year, standings: [{ team, rank, record: "10-4-0" }, ...] }
//
//  TEAM_NAME_ALIASES: alte Teamnamen -> aktueller Name, damit die
//  Verlaufsgrafik eine Franchise ueber Umbenennungen hinweg verbindet:
//  "Alter Name": { canonical: "Aktueller Name", source: "confirmed-user" }
// ============================================================

const SEASON_HISTORY_STANDINGS = [];

const TEAM_NAME_ALIASES = {};
