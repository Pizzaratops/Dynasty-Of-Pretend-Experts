# Backtest: Matchup-Badges & Stabilität der Matchup-Stats

Stand 26.09.2026 · Scripts: `scripts/research/` · Grundlage für die Änderungen im Commit „Matchup-Badges: Stufenplan …“.

## Frage
Sagen die Spieler-Badges (Rang der gegnerischen Defense bei *Fantasy Points Allowed* an die Position) etwas über die
tatsächlichen Fantasy-Punkte voraus? Und wie viel Verlass ist auf die Unit-Stats im Matchup Advantage?

## Methode
- Alle Spieler-Spiele 2021–2025 (Regular Season, QB/RB/WR/TE), dazu 2026 Woche 1–2. Nur fantasy-relevante Spieler
  (Erwartung ≥ 6 PPR).
- **Erwartung** je Spieler = Schnitt seiner letzten 8 Spiele (auch über die Saisongrenze), mindestens 3.
  **Residuum** = Ist − Erwartung.
- Badge je Spiel **nur mit Daten vor dem Spiel**: grün = Rang 1–8, rot = Rang 25–32.
- Kennzahlen: *Spread* = Ø Residuum grün − Ø Residuum rot (PPR-Punkte), Trefferquote grün (über Erwartung) bzw.
  rot (unter Erwartung), Korrelation Signal ↔ Residuum.

## Ergebnisse 2021–2025

| Phase | Live-Modell (nur Saison) | Stufenplan (neu) |
|---|---|---|
| Woche 1 | – (keine Daten) | **1,76** (Vorjahr) |
| Woche 2 | **0,05** (Münzwurf) | 0,30 (Mix k = 12) |
| Woche 3–4 | 1,39 | 1,39 |
| Woche 5–8 | 0,61 | 0,61 |
| Woche 9+ | 1,34 | 1,34 |
| **Alle** | 1,10 | **1,15** (und Woche 1 abgedeckt) |

- **Effekt klein, aber echt:** ~1,1 Punkte Unterschied grün vs. rot bei einer normalen Streuung von ±7–8 Punkten je Spieler und Woche (SD Residuum: QB 8,0, RB 7,6, WR 7,6, TE 6,7).
- **Rot verlässlicher als Grün:** rot → 63 % unter Erwartung, grün → 43 % über Erwartung.
- **Je Position (alle Wochen):** QB 2,2 · RB 1,6 · TE 1,2 · **WR 0,3** (Korrelation 0,01, praktisch kein Signal).
- **2026 Woche 2:** Live-Modell 2,5, Stufenplan 4,9 Punkte Spread. Beispiele: Dalton Schultz @ CIN rot → mit Stufenplan
  grün (CIN #1 gegen TE im Vorjahr), 26 Punkte; Stefon Diggs @ DAL rot → grün, 21,7; Rhamondre Stevenson @ PIT grün → neutral, 3,6.
- **Verworfen:** „gegnerbereinigte“ FPA (Punkte über Erwartung zugelassen), Spread 1,02 statt 1,10, also nicht besser.

## Stabilität der Matchup-Stats (Saison 2025, Teamwert ungerade vs. gerade Wochen, Pearson r)

| Stat | Offense | Defense |
|---|---|---|
| Passing EPA | 0,61 | 0,27 |
| Rushing EPA | 0,26 | 0,18 |
| Sack Rate | 0,41 | 0,51 |
| Explosive % | 0,44 | 0,45 |
| Red-Zone-TD % | **−0,01** | 0,16 |

Scheme (FTN): Motion 0,77 · Blitz 0,69 · Play Action 0,60 · Screen 0,49 · Stacked Box 0,36.
FPA (halbe Saison / Jahr-zu-Jahr 2024→25): QB 0,30/0,25 · RB 0,07/0,20 · WR 0,23/**−0,08** · TE 0,28/0,24.

## Umgesetzt
1. **Stufenplan** für FPA im Sync: 0 Spiele → Vorjahr, 1 Spiel → (Saison + 12 × Vorjahr) / 13, ab 2 Spielen → Saison.
   Vor dem ersten Saisonspiel nutzt der Sync die Unit-Stats und das Scheme des Vorjahres (Hinweis-Banner auf der Seite).
2. **WR-Badges ohne Farbe** (Rang bleibt, Tooltip erklärt warum).
3. **Tooltips** mit Basis (Saison/Mix/Vorjahr) und Effektgröße.
4. **Red-Zone-TD %** zählt nicht mehr ins Fazit „wer hat mehr Vorteile“ (bleibt gedimmt zur Info).
5. **Legende „📖 Stats erklärt“** mit diesen Stabilitätswerten.

## Einzelbeispiel Spielebene: ATL @ GB, Woche 3 2026
Mit Daten bis Woche 2: GB-Defense vorne in 4/5 Kategorien gegen die ATL-Offense (ATL Passing EPA Rang 32, keine Red-Zone-Trips).
Ergebnis: ATL 35:14 (+0,31 EPA/Lauf bei 39 Läufen). Das Tool beschreibt Stärken und Schwächen, es ist kein Siegermodell.
Ein Backtest auf Spielebene steht noch aus.
