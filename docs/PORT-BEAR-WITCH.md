# Port-Anleitung: DPE HQ → Bear Witch Project HQ

**Für Claude.** Beyaz schickt dir diese Datei statt der ganzen Repo. Sie beschreibt jedes Feature, das in
*Dynasty of Pretend Experts HQ* (Sleeper) gebaut wurde, so, dass du es in *Bear Witch Project HQ* (ESPN)
aktivieren kannst.

- Quelle (öffentlich): `https://github.com/Pizzaratops/Dynasty-Of-Pretend-Experts`
- Ziel: `https://github.com/Pizzaratops/Bear-Witch-Project-HQ` (Push-Zugriff über `add_repo`, Branch `main`)
- Dateien zum 1:1-Kopieren holst du per `git clone --depth 1` der Quelle (oder `raw.githubusercontent.com/.../<Referenz-Commit>/<pfad>`).
  Immer den **Referenz-Commit** des jeweiligen Features nehmen, nicht blind `main`.

## Grundsätzliche Unterschiede der beiden Repos

| | DPE HQ | Bear Witch HQ |
|---|---|---|
| Plattform | Sleeper | ESPN (Liga „Foodball“) |
| Navigation | wird in `js/app.js` aus `NAV_SECTIONS` gebaut (`buildNav()`) | **statisch** in `index.html` (Desktop-Dropdown `snav-dropdown-item` + Mobile `subnav-mobile-btn`) |
| Kader | `data/rosters-live.js` → `ROSTERS_LIVE[teamId] = [{name,pos,nfl,…}]` | **identisches Format** |
| nflverse-Helfer | `scripts/lib/nflverse.js` | **identisch** (`httpsGetText, parseCsv, normTeam, NFL_TEAM_META, GAMES_CSV_URL`) |
| Bot-Name in Workflows | `dpe-hq-bot` | `bear-witch-project-hq-bot` |
| Regeln-Seite | `renderErklaerung()` baut Karten aus Sleeper-Settings mit `card()` | `renderErklaerung()` ist **handgeschriebenes HTML** (kein `card()`-Helper) |

Allgemeine Regel: Die Features sind als eigenständige Module gebaut (`js/<feature>.js` + `data/<feature>.js` +
`scripts/sync-<feature>.js` + eigener Workflow). In `app.js`/`index.html` gibt es nur wenige, klar markierte
Andock-Stellen. Nach dem Port: Sync-Script einmal lokal laufen lassen, Seite im Headless-Browser prüfen,
dann pushen. Workflow-Dateien (`.github/workflows/*.yml`) brauchen beim Push ggf. den `workflow`-Scope. Wenn der
Push abgelehnt wird, Beyaz die Datei zum manuellen Anlegen geben.

---

## Feature 1: Matchup Advantage (Unit vs Unit + Spieler-Badges)

**Referenz-Commit in DPE:** `5c5f0a9` (volle Hash-Auflösung per `git rev-parse 5c5f0a9` im Klon)

**Was es ist:** Neue Seite unter NFL. Für jedes NFL-Spiel einer Woche: Offense A gegen Defense B und umgekehrt,
5 Kategorien (Passing EPA, Rushing EPA, Sack Rate, Explosive %, Red-Zone-TD %) mit Liga-Rängen 1–32 und
gespiegelten Vorteils-Balken. Dazu Fantasy Points Allowed (PPR) je Position pro Defense. Daraus ein Badge
(▲ grün Top 8 / • neutral / ▼ rot 25–32) neben jedem QB/RB/WR/TE im Fantasy-Matchup-Detail und in den Team-Kadern.
Plus Erklärtext auf der Regeln-Seite.

**Daten:** nflverse `play_by_play_<season>.csv.gz`, `stats_player_week_<season>.csv`, `games.csv`. Keine Secrets,
keine ESPN-Abhängigkeit → in Bear Witch identisch lauffähig.

### 1a. Dateien 1:1 kopieren
- `scripts/sync-matchup-advantage.js`: unverändert (nutzt nur `scripts/lib/nflverse.js`, das in Bear Witch identisch ist)
- `js/matchup-advantage.js`: unverändert. Enthält `showNflMatchup`, `renderNflMatchup`, `maPlayerBadge`,
  `maOpponent`, `maExplainHtml`. Braucht aus `app.js` nur `navigate()` und `emptyState()`, beides existiert in Bear Witch.
- `.github/workflows/sync-matchup-advantage.yml`: kopieren, dann **`dpe-hq-bot` → `bear-witch-project-hq-bot`**
- CSS: in DPE `css/style.css` den Block ab dem Kommentar
  `/* ---------- MATCHUP ADVANTAGE (js/matchup-advantage.js) ---------- */` bis Dateiende ans Ende der
  Bear-Witch-`css/style.css` hängen. Nutzt nur Tokens, die dort auch existieren (`--surface`, `--surface2`,
  `--border`, `--text`, `--muted`, `--accent`, `--accent-light`, `--green`, `--red`); vorher kurz per grep prüfen.
- `data/matchup-advantage.js`: **nicht kopieren**, sondern in Bear Witch mit
  `NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt node scripts/sync-matchup-advantage.js` frisch erzeugen.

### 1b. Andock-Stellen in Bear Witch

1. **`js/app.js` → `PAGES`**: `'nflmatchup'` ans Array anhängen.
2. **`js/app.js` → `ROUTE_HANDLERS`**: `nflmatchup: () => showNflMatchup(),`
3. **Navigation (`index.html`, statisch!)**: direkt unter dem Power-Rankings-Eintrag, einmal im Desktop-Dropdown
   (bei `data-page="nflrankings"`, ca. Zeile 79) und einmal im Mobile-Menü (ca. Zeile 113):
   ```html
   <button class="snav-dropdown-item" data-page="nflmatchup" onclick="showNflMatchup()">⚔️ Matchup Advantage</button>
   <button class="subnav-mobile-btn" data-page="nflmatchup" onclick="showNflMatchup()">⚔️ Matchup Advantage</button>
   ```
4. **Seiten-Container (`index.html`)** vor `<div class="page page-wide" id="page-nflrankings">`:
   ```html
   <div class="page page-wide" id="page-nflmatchup">
     <div class="page-title">⚔️ Matchup Advantage</div>
     <div class="page-sub">Unit gegen Unit für jedes NFL-Spiel der Woche: wessen Offense trifft auf wessen Defense, und wer hat wo den Vorteil</div>
     <div id="nflmatchupContent"></div>
   </div>
   ```
5. **Script-Tags (`index.html`)**: `<script src="data/matchup-advantage.js"></script>` nach `data/trades.js`,
   `<script src="js/matchup-advantage.js"></script>` nach `js/player-dna.js`.
6. **Badge im Matchup-Detail (`js/app.js`, `renderMatchupDetail`)**: direkt vor `const playerCell = (p, align) => {` einfügen:
   ```js
   // Projektions-Starter tragen evtl. kein NFL-Team -> per Name aus den Live-Kadern
   const _nflByName = {};
   Object.values(typeof ROSTERS_LIVE !== 'undefined' ? ROSTERS_LIVE : {}).forEach(r => r.forEach(x => { if (x.nfl) _nflByName[x.name] = x.nfl; }));
   const _maBadge = (pl, wk) => {
     const nfl = pl.nfl || _nflByName[pl.name];
     return (typeof maPlayerBadge === 'function' && nfl) ? maPlayerBadge(pl.pos, nfl, wk) : '';
   };
   ```
   Dann alle 4 Vorkommen von
   `<div class="mdt-player-meta">${p.pos}${p.nfl ? ' · ' + p.nfl : ''}</div>` ersetzen durch
   `<div class="mdt-player-meta">${p.pos}${(p.nfl || _nflByName[p.name]) ? ' · ' + (p.nfl || _nflByName[p.name]) : ''}${_maBadge(p, week)}</div>`.
   Vorher prüfen, dass in dieser Funktion eine Variable `week` existiert (in DPE aus `matchupDetailState`).
   **ESPN-Wochen-Hinweis:** `maPlayerBadge` braucht die **echte NFL-Woche**. Stand 26.09.2026 zählt die Bear-Witch-Seite ihre
   Wochen NFL-konform (W1/W2 eingefroren in `data/frozen-weeks-2026.js`, ab W3 ESPN, `data/schedule.js` hat Wochen 1, 2, 3 …),
   `week` passt also direkt. Nur falls sich das geändert hat, hier auf die NFL-Woche mappen.
7. **Badge in den Team-Kadern (`js/app.js`, `renderRoster`)**: In Bear Witch gibt es kein `_rosterGroupHtml`. Die Liste
   wird inline in `fullRoster.map(p => { … })` gebaut. Dort vor dem `return`:
   ```js
   const ma = (typeof maPlayerBadge === 'function' && typeof MATCHUP_ADVANTAGE !== 'undefined' && p.nfl)
     ? maPlayerBadge(p.pos, p.nfl, MATCHUP_ADVANTAGE.currentWeek) : '';
   ```
   und das `return` ändern zu `return (ma || dna) ? row.replace(/<\/div>\s*$/, ma + dna + '</div>') : row;`
8. **Regeln-Seite (`renderErklaerung`)**: Bear Witch hat keinen `card()`-Helper. Vor dem schließenden
   `` `; `` am Ende des Template-Strings anhängen:
   ```js
   ${typeof maExplainHtml === 'function' ? `<div class="board-table-wrap" style="padding:18px 20px;margin-bottom:16px;"><h3 style="margin:0 0 10px;font-size:16px;">⚔️ Matchup Advantage</h3>${maExplainHtml()}</div>` : ''}
   ```
   Der Text in `maExplainHtml()` verweist auf „NFL → Matchup Advantage“ bzw. „Liga → Regeln“. In Bear Witch heißt der Menüpunkt
   „📢 Erklärung“, also den letzten Satz in `renderNflMatchup()` (`Details unter <b>Liga → Regeln …`) anpassen.

### 1c. Prüfen
- `node scripts/sync-matchup-advantage.js` → Ausgabe „32 Teams“, Datei `data/matchup-advantage.js` entsteht.
- Headless (Playwright, `python3 -m http.server`): `#nflmatchup` rendert ohne `pageerror`; Spiel wählen; Desktop + 390 px Breite.
- Matchup-Detail öffnen → `.ma-boost` Badges vorhanden (K/DST bekommen bewusst keins).
- Stichprobe: Passing EPA eines Teams gegen eine bekannte Quelle (z. B. rbsdm.com) plausibel.

---

## Feature 2: Air Yards · Tiefenprofil (Karte im Player-DNA-Profil)

**Referenz-Commit in DPE:** `c4a3920`

**Was es ist:** Im Profil jedes Spielers unter Player DNA eine Karte „📏 Air Yards“: geglättete Kurve (Anteil der
Targets je Yard-Tiefe, bei QBs Passversuche) gegen den Schnitt aller Spieler der Position, aDOT gegen Ø, und 5 Zonen
(Hinter LOS / Kurz 0–9 / Mittel 10–19 / Tief 20–29 / Bombe 30+) als Balken mit Ø. Laufende und Vorsaison.
Plus Erklärtext auf der Regeln-Seite. Spieler-ID = nflverse `gsis_id`, dieselbe wie in `data/player-dna.js`.

**Daten:** nflverse `play_by_play_<season>.csv.gz` (zeilenweise gestreamt, nur nötige Spalten) + `players/players.csv`
(Positionen). Keine Secrets. Abgeschlossene Saisons werden aus der bestehenden `data/air-yards.js` übernommen.

### 2a. Dateien 1:1 kopieren
- `scripts/sync-air-yards.js`: unverändert
- `js/air-yards.js`: unverändert (`airYardsMount`, `airYardsExplainHtml`; lädt `data/air-yards.js` selbst nach)
- `.github/workflows/sync-air-yards.yml`: kopieren, **`dpe-hq-bot` → `bear-witch-project-hq-bot`**
- CSS: Block ab `/* ---------- AIR YARDS (js/air-yards.js, Karte im Player-DNA-Profil) ---------- */` bis zum
  nächsten `/* ----------`-Kommentar bzw. Dateiende (inkl. der zwei `@media`-Blöcke) ans Ende der Bear-Witch-CSS
- `data/air-yards.js`: **nicht kopieren**, in Bear Witch per `node scripts/sync-air-yards.js` erzeugen (ca. 5 s, 76 KB)

### 2b. Andock-Stellen in Bear Witch
`js/player-dna.js` ist in Bear Witch bis auf Texte identisch mit DPE (Stand 26.09.2026 per diff geprüft).
1. **`js/player-dna.js` → `_dnaRenderMain()`**: im Template direkt vor `<div class="dna-matches">` einfügen:
   `<div id="dnaAirYards"></div>`
2. **Gleiche Funktion**, direkt nach `_dnaDrawChart(entries, cats);`:
   ```js
   // Air-Yards-Tiefenprofil (js/air-yards.js), falls geladen
   if (typeof airYardsMount === 'function') airYardsMount('dnaAirYards', me.id, pos, season, me.n);
   ```
3. **`index.html`**: `<script src="js/air-yards.js"></script>` nach `js/player-dna.js` (bzw. nach
   `js/matchup-advantage.js`, falls Feature 1 schon portiert). **Kein** Script-Tag für `data/air-yards.js` (Lazy Load).
4. **Regeln-Seite (`renderErklaerung`, handgeschriebenes HTML)**: am Ende des Template-Strings anhängen:
   ```js
   ${typeof airYardsExplainHtml === 'function' ? `<div class="board-table-wrap" style="padding:18px 20px;margin-bottom:16px;"><h3 style="margin:0 0 10px;font-size:16px;">📏 Air Yards (Player DNA)</h3>${airYardsExplainHtml()}</div>` : ''}
   ```
   Der Text nennt „Spieler → Player DNA“. Falls das Menü in Bear Witch anders heißt, den ersten Satz in
   `airYardsExplainHtml()` anpassen.

### 2c. Prüfen
- Sync-Ausgabe: „Saison <Vorjahr>: ~450 Spieler, 18 Wochen“ und „Saison <aktuell>: …“; beim zweiten Lauf „aus bestehender Datei übernommen“.
- Referenzwerte 2026 bis Woche 3 (Stand 26.09.): Jalen Hurts aDOT 8,34 / 30+ 6,5 %, Caleb Williams 7,95 / 3,6 %.
- Headless: `openPlayerDna('Jalen Hurts','QB')` → `#dnaAirYards` enthält die Karte, keine `pageerror`; auch bei 390 px Breite.

---

## Feature 3: Unit-Vergleich im Fantasy-Matchup-Detail

**Referenz-Commit in DPE:** `fef0a81`

**Was es ist:** Im Matchup-Detail (Klick auf ein Fantasy-Matchup) oberhalb der Slot-Liste ein Block „📊 Unit-Vergleich“:
je Position der Saison-Schnitt der Starter-Punkte pro Woche mit Liga-Rang für beide Teams, dazu die Projektion
(vor dem Spiel) bzw. die echten Punkte (danach) dieser Woche als gespiegelter Balken (Türkis = Heim, Pink = Gast)
und ein Fazit, wer wo vorne liegt. Plus Erklärtext auf der Regeln-Seite. **Kein Sync, reines Frontend.**

**Daten in Bear Witch:** Es gibt dort **keine** `data/position-points.js`. Das Modul fällt automatisch auf
`FANTASY_POWER_SCORE.weeks[w].weekly[].values.{qbPts,rbPts,wrPts,tePts}` zurück (in Bear Witch vorhanden, geladen per
`<script src="data/fantasy-power-score.js">`). Dadurch gibt es dort für gespielte Wochen nur die Zeilen QB/RB/WR/TE. Bei der
Projektion kommen K und DEF ohne Saisonwert dazu. Per Node-Test gegen die echte Bear-Witch-Datei vom 26.09.2026 geprüft.
Optional für volle 6 Units: im ESPN-Sync (`scripts/sync-fantasy-position-score.js`, Bucket in Zeile ~168) `kPts`/`defPts`
mitzählen und in `values` ausgeben. Die Positions-IDs für K/DST bei ESPN vorher prüfen.

### 3a. Dateien 1:1 kopieren
- `js/fantasy-units.js`: unverändert (`fuUnitCompareHtml`, `fuExplainHtml`)
- CSS: Block ab `/* ---------- FANTASY UNITS (js/fantasy-units.js, Unit-Vergleich im Matchup-Detail) ---------- */`
  bis zum nächsten `/* ----------`-Kommentar bzw. Dateiende (inkl. `@media (max-width: 480px)`)

### 3b. Andock-Stellen in Bear Witch
1. **`index.html`**: `<script src="js/fantasy-units.js"></script>` hinter die anderen Feature-Module. `data/fantasy-power-score.js`
   ist dort schon eingebunden, prüfen, dass es **vor** `js/app.js` lädt.
2. **`js/app.js` → `renderMatchupDetail()`**: im finalen `content.innerHTML`-Template direkt vor
   `<div class="mdt-rows">${rows.join('')}</div>` (Bear Witch ca. Zeile 1973):
   ```js
   ${typeof fuUnitCompareHtml === 'function' ? fuUnitCompareHtml({ season, week, homeId, awayId, homeName: home.name, awayName: away.name, homeStarters: homeProj.starters, awayStarters: awayProj.starters, played }) : ''}
   ```
   Prüfen, dass `season`, `week`, `homeId`, `awayId`, `home`, `away`, `homeProj`, `awayProj`, `played` in der Funktion so heißen
   (in DPE ja; Bear Witch hat `teamWeekProjection(home, …)` in Zeile ~1852, sieht identisch aus). `season` muss zu
   `FANTASY_POWER_SCORE.season` passen (String/Zahl egal).
3. **Regeln-Seite (`renderErklaerung`, handgeschriebenes HTML)**:
   ```js
   ${typeof fuExplainHtml === 'function' ? `<div class="board-table-wrap" style="padding:18px 20px;margin-bottom:16px;"><h3 style="margin:0 0 10px;font-size:16px;">📊 Unit-Vergleich (Matchups)</h3>${fuExplainHtml()}</div>` : ''}
   ```

### 3c. Prüfen
- Headless: `showMatchups(); openMatchupDetail(<home>,<away>,<Woche>)` für eine gespielte und eine offene Woche → `.fu-box` vorhanden, keine `pageerror`, auch bei 390 px.
- Bei gespielten Wochen: Summe der Unit-Werte ≈ Teampunkte minus K/DST (Bear Witch).

### Nebenbei in DPE gefixt (nicht portieren, Sleeper-spezifisch)
`scripts/lib/sleeper-core.js` → `describePlayer`: Zwei-Wege-Spieler wie Travis Hunter (Sleeper `position: "DB"`) bekommen
jetzt die Fantasy-Position (WR). Vorher fielen seine Punkte aus `POSITION_POINTS` und er stand als „DB“ im Kader.
Bear Witch nutzt ESPN `defaultPositionId`, der Fall dort ggf. separat prüfen.

---

## Feature 4: Scheme-Tendenzen (Erweiterung von Feature 1)

**Referenz-Commit in DPE:** `721cd56`

**Was es ist:** Auf der Matchup-Advantage-Seite unter den FPA-Kacheln ein Abschnitt „🧠 Scheme-Tendenzen“, je Richtung
(Offense A vs Defense B): Blitz, Stacked Box (8+), Play Action, Screen, Motion. Pro Zeile die Häufigkeit der entscheidenden
Seite (mit Rang und Liga-Schnitt), die EPA/Play der Gegenseite in der Situation gegen sonst und eine Einschätzung ▲/▼
(nur wenn die Tendenz >110 % des Liga-Schnitts ist und der EPA-Unterschied >0,05, ab 10 Plays). Erklärung ist in
`maExplainHtml()` enthalten.

**Daten:** zusätzlich nflverse `ftn_charting/ftn_charting_<season>.csv` (FTN, wöchentlich aktualisiert), Join über
`nflverse_game_id` + `nflverse_play_id` = pbp `game_id` + `play_id`. Fehlt die Datei, fällt der Abschnitt weg.
Die Coverage-Schalen (Cover 0–6) aus `pbp_participation` sind für die laufende Saison **nicht** verfügbar (Stand 26.09.2026: 404),
deshalb Blitz/Box statt Coverage.

### Port
Keine neuen Dateien und keine neuen Andock-Stellen. Wenn Feature 1 von **diesem** Commit (oder später) kopiert wird, ist alles
drin. Wurde Feature 1 schon vom älteren Commit portiert, diese drei Stände neu übernehmen:
- `scripts/sync-matchup-advantage.js` (neuer Abschnitt „Scheme-Tendenzen (FTN-Charting)“, Feld `scheme` in der Ausgabe)
- `js/matchup-advantage.js` (`MA_SCHEME_TXT`, `_maSchemeRow`, `_maSchemeBlock`, Einbau in `renderNflMatchup`, Text in `maExplainHtml`)
- CSS: im Matchup-Advantage-Block der Unterabschnitt `/* Scheme-Tendenzen (FTN) */` (vor `/* Spieler-Badge … */`)

### Prüfen
- Sync-Log: „FTN-Charting <season>: N Plays gejoint.“
- Referenz (26.09.2026, bis W3): CHI-Defense Blitz 38,8 % (#8, Liga 31,4 %), PHI-Offense vs Blitz +0,12 (22) / ohne +0,20.

---
*Weitere Features werden unten angehängt, jeweils mit eigenem Referenz-Commit.*
