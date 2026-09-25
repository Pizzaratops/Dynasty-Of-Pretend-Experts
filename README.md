# Dynasty of Pretend Experts HQ 🧐🏈

Liga-HQ für die Sleeper-Dynasty-Liga **Dynasty of Pretend Experts** (Sleeper League ID
`1312799736218017792`, 14 Teams, PPR, 1QB, Median-Spiel). Ein 1:1-Umbau von
[Bear Witch Project HQ](https://github.com/Pizzaratops/Bear-Witch-Project-HQ), aber statt ESPN
läuft alles über die **öffentliche Sleeper-API**. Dafür braucht es keine Cookies, keine Secrets
und keinen Worker. Colorway „Film Room“ (Petrol + Amber/Gold), Light- und Dark-Mode, PWA
(installierbar).

## Einrichten (einmalig)

1. Diesen Ordner nach GitHub pushen (Repo `Dynasty-Of-Pretend-Experts`).
2. **Settings → Pages** öffnen, dann *Deploy from a branch* mit `main` / `/ (root)` wählen.
3. **Settings → Actions → General → Workflow permissions** auf *Read and write* stellen.
   Sonst dürfen die Syncs nicht committen.
4. **Actions → „Sleeper Sync“ → Run workflow** starten. Danach laufen alle Syncs automatisch.
5. Optional für den Status Report: Unter **Settings → Secrets and variables → Actions** die
   Secrets `ESPN_S2` und `SWID` anlegen, mit denselben Werten wie im Bear-Witch-Repo. Ohne die
   Secrets zeigt der Status Report nur die Sleeper-Ligen.

## Was automatisch läuft

| Workflow | Wann | Schreibt |
|---|---|---|
| `sync-sleeper.yml` | alle 2 h | Teams, Kader (inkl. Taxi/IR), Weekly Scores (+ Median), Spielplan, Rookie Draft, **Trades & Future Picks**, Player Stats, Projections, Liga-Settings, Fantasy Power Score |
| `sync-status-report.yml` | alle 2 h | Status Report (ESPN- + Sleeper-Ligen von Milchreis) |
| `sync-espn-nfl-standings.yml` | 9 & 21 Uhr | NFL Power Rankings (nflverse, ligaunabhängig) |
| `sync-nfl-power-score.yml` | 9 & 21 Uhr | Bootleg Power Score der NFL-Teams |
| `snapshot-projections.yml` | Mi. 10 Uhr | Vorab-Projektion der nächsten Matchup-Woche |

Die Sleeper-Syncs schreiben Dateien nur, wenn sich wirklich etwas geändert hat. So entstehen
keine Leer-Commits.

## Unterschiede zu Bear Witch Project HQ

- **Trades, getradete Picks und Future Draft Boards kommen automatisch aus Sleeper**
  (`traded_picks` + Transaktionen). In Bear Witch mussten sie von Hand gepflegt werden. Das gilt
  auch für FAAB in Trades und 3-Team-Trades.
- **Keeper-Tabs entfallen.** Stattdessen gibt es das **Rookie Draft Board**. Spalten sind die
  ursprünglichen Slot-Besitzer, und getradete Picks zeigen das Team, das tatsächlich gepickt hat.
  Zugeordnet wird über `roster_id` des Picks, **nicht** über `picked_by`: `picked_by` ist nur der
  User, der geklickt hat, und das kann auch der Commish sein.
- **Punkte werden mit dem echten Liga-Scoring berechnet**, und zwar aus Sleepers Rohstatistiken,
  nicht aus Standard-PPR. Gegen Sleepers eigene Matchup-Punkte geprüft: 644/644 Spieler-Wochen
  identisch.
- **Median-Spiel**: Standings und Rolling Rankings zählen den zusätzlichen W/L gegen den
  Liga-Median mit, genau wie Sleeper.
- **Lineup-Slots** (QB, 2 RB, 3 WR, TE, 2 FLEX, K, DEF) kommen aus den Sleeper-Settings. Die
  Matchup-Engine und der Slot-Vergleich passen sich automatisch an.
- **„Erklärung“ heißt jetzt „Liga-Regeln“.** Die Seite zeigt Kader, Scoring, Waiver, Taxi und
  Playoffs live aus den Sleeper-Settings.
- **Namensabgleich**: Sleeper-Namen werden auf die Schreibweise von Dynasty Board und Trade
  Values normalisiert (z. B. „Kenneth Walker“ → „Kenneth Walker III“). Bei den ersten Tests
  passten 323 von 324 Kaderspielern.

## Von Hand pflegen

| Datei | Was |
|---|---|
| `js/league-config.js` | League ID, Saison, Countdowns auf der Startseite |
| `data/teams.js` | nur `emoji` und `owner` (alles andere überschreibt der Sync) |
| `data/league-dues.js` | wer bezahlt hat, als `{ team: "milchreis", year: 2026 }` |
| `data/league-history.js` / `season-history-standings.js` | nach jeder Saison |
| `data/dynasty-board.js`, `trade-values.js`, `dynasty-rolling.js` | Rankings-Uploads, wie in Bear Witch (1QB-Werte, gleiche Dateien) |
| `js/status-report-config.js` + `STATUS_REPORT_GATE` in `js/app.js` | Personen und Passwort des Status Reports |

## ⚠️ Saisonwechsel (Sleeper „Renew“)

Beim Renew legt Sleeper für Dynasty-Ligen eine **neue League ID** an. Danach in
`js/league-config.js` `SLEEPER_LEAGUE_ID` und `LEAGUE_SEASON` anpassen und in
`data/league-dues.js` `CURRENT_DUES_YEAR` hochsetzen. Weekly Scores der Vorjahre bleiben in
`data/weekly-scores.js` erhalten.

## Sync lokal testen

```bash
node scripts/sync-sleeper.js                     # live gegen Sleeper
SLEEPER_FIXTURE=raw.json node scripts/sync-sleeper.js   # offline gegen gespeicherte Rohdaten
node scripts/sync-fantasy-position-score.js
```

Die Logik steckt in `scripts/lib/sleeper-core.js` (reine Transformation, läuft auch im Browser)
und `scripts/lib/sleeper-fetch.js` (API-Abrufe).

## Struktur

```
index.html                 Single-Page-App
css/style.css              Colorway (CSS-Variablen, Light/Dark)
js/league-config.js        Liga-ID, Saison, Countdowns (von Hand)
js/app.js                  Navigation + Rendering
js/matchup-engine.js       Win%-/Projektions-Logik (Browser + Snapshot-Script)
js/status-report-config.js Status-Report-Personen
data/*.js                  Daten (größtenteils automatisch, siehe oben)
scripts/sync-sleeper.js    Haupt-Sync
scripts/lib/               sleeper-core, sleeper-fetch, nflverse, espn-maps
.github/workflows/         Automatische Syncs
```
