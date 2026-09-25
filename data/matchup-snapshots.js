// ============================================================
//  MATCHUP_SNAPSHOTS — serverseitig gesicherte Vorab-Projektionen
// ============================================================
//  AUTO-GENERIERT von scripts/snapshot-projections.js über die GitHub
//  Action ".github/workflows/snapshot-projections.yml". Nicht von Hand
//  editieren — läuft automatisch einmal pro Woche (Mittwoch) und
//  schreibt NUR neue, noch nicht gespielte Wochen dazu. Einmal gesetzte
//  Einträge werden nie überschrieben, damit sie eine echte "vorher"-
//  Momentaufnahme bleiben.
//  Zuletzt synchronisiert: 2026-09-25T17:06:12.387Z
//
//  Struktur: MATCHUP_SNAPSHOTS[season][week][teamId] = {
//    capturedAt, lineup, mode, teamMean, starters: [{slot,name,pos,mean}]
//  }
//
//  Fallback: bevor der erste Lauf passiert ist (oder für Wochen, die er
//  noch nicht erreicht hat), nutzt die Seite ergänzend lokale Snapshots
//  aus dem Browser-localStorage (siehe js/app.js, loadMatchupSnapshot).
// ============================================================

const MATCHUP_SNAPSHOTS = {
 "2026": {}
};
