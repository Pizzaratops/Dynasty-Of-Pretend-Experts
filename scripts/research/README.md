# Research-Scripts (nicht Teil der Seite)

Einmalige Auswertungen, deren Ergebnisse in `docs/BACKTEST-MATCHUP-BADGES.md` stehen und die Designentscheidungen
in `scripts/sync-matchup-advantage.js` / `js/matchup-advantage.js` begründen. Python 3 + pandas.

Eingaben (vorher in ein Arbeitsverzeichnis laden, relativ dazu ausführen):
- `bt/spw<Jahr>.csv` = `https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_week_<Jahr>.csv` für 2020–2026
- `pbp25.csv.gz` = `.../pbp/play_by_play_2025.csv.gz`, `ftn25.csv` = `.../ftn_charting/ftn_charting_2025.csv` (nur für die Stabilität)

Reihenfolge: `backtest_badges.py` (schreibt `bt/T.pkl`) → `backtest_badges_adjusted.py` → `stability_matchup_stats.py`.
