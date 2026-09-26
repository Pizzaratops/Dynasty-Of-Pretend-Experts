"""Backtest der Matchup-Badges (Fantasy Points Allowed je Position).

Fuer jedes Spieler-Spiel 2021-2026 wird der Badge so berechnet, wie ihn
die Seite VOR dem Spiel gezeigt haette, und mit dem Ergebnis verglichen.

Erwartung je Spieler = Schnitt seiner letzten 8 Spiele (auch ueber die
Saisongrenze), mind. 3 Spiele. Residuum = Ist - Erwartung.
Methoden fuer die Defense-Staerke (FPA pro Spiel an die Position):
  cur        nur laufende Saison bis Vorwoche (= aktuelles Live-Modell)
  prior      nur Vorjahr der Defense
  blend_k    (g*cur + k*prior) / (g + k), g = bisherige Spiele
"""
import pandas as pd, numpy as np, sys

NORM = {'LA': 'LAR', 'STL': 'LAR', 'WAS': 'WSH', 'SD': 'LAC', 'OAK': 'LV'}
POS = ['QB', 'RB', 'WR', 'TE']
frames = []
for y in range(2020, 2027):
    d = pd.read_csv(f'bt/spw{y}.csv', usecols=['player_id', 'player_display_name', 'position', 'season', 'week',
                                                 'season_type', 'team', 'opponent_team', 'fantasy_points_ppr'], low_memory=False)
    frames.append(d)
df = pd.concat(frames)
df = df[(df.season_type == 'REG') & df.position.isin(POS) & df.opponent_team.notna()].copy()
df['opp'] = df.opponent_team.replace(NORM)
df['pts'] = df.fantasy_points_ppr.fillna(0.0)
df = df.sort_values(['player_id', 'season', 'week']).reset_index(drop=True)

# ---- Erwartung je Spieler: Schnitt der letzten 8 Spiele davor ----
g = df.groupby('player_id')['pts']
df['n_prev'] = g.cumcount()
df['base'] = g.transform(lambda s: s.shift(1).rolling(8, min_periods=3).mean())
df['resid'] = df.pts - df.base

# ---- Defense-FPA je Saison/Woche/Position ----
fpa_w = df.groupby(['season', 'week', 'opp', 'position'])['pts'].sum().rename('fp').reset_index()
seasons = sorted(df.season.unique())
rows = []
for s in seasons:
    fs = fpa_w[fpa_w.season == s]
    weeks = sorted(fs.week.unique())
    prev_full = fpa_w[fpa_w.season == s - 1]
    prior = None
    if len(prev_full):
        gp = prev_full.groupby('opp').week.nunique()
        prior = (prev_full.groupby(['opp', 'position']).fp.sum() / prev_full.opp.map(gp).groupby([prev_full.opp, prev_full.position]).first())
    for w in range(1, max(weeks) + 2):
        before = fs[fs.week < w]
        if len(before):
            gcnt = before.groupby('opp').week.nunique()
            cur = before.groupby(['opp', 'position']).fp.sum() / before.opp.map(gcnt).groupby([before.opp, before.position]).first()
        else:
            gcnt, cur = pd.Series(dtype=float), pd.Series(dtype=float)
        for (opp, pos) in set(list(cur.index) + (list(prior.index) if prior is not None else [])):
            rows.append({'season': s, 'week': w, 'opp': opp, 'position': pos,
                         'g': int(gcnt.get(opp, 0)),
                         'cur': cur.get((opp, pos), np.nan),
                         'prior': prior.get((opp, pos), np.nan) if prior is not None else np.nan})
D = pd.DataFrame(rows)
for k in [2, 4, 6, 8, 12]:
    D[f'blend_{k}'] = np.where(D.prior.notna(),
                               (D.g * D.cur.fillna(0) + k * D.prior) / (D.g + k),
                               D.cur)
METHODS = ['cur', 'prior'] + [f'blend_{k}' for k in [2, 4, 6, 8, 12]]
# Rang je (Saison, Woche, Position): 1 = laesst am meisten zu
for m in METHODS:
    D[m + '_rank'] = D.groupby(['season', 'week', 'position'])[m].rank(ascending=False, method='first')
    D[m + '_dev'] = D[m] - D.groupby(['season', 'week', 'position'])[m].transform('mean')

T = df.merge(D, on=['season', 'week', 'opp', 'position'], how='left')
T = T[T.base.notna() & (T.base >= 6)]  # fantasy-relevante Spieler

def phase(w):
    return 'W1' if w == 1 else 'W2' if w == 2 else 'W3-4' if w <= 4 else 'W5-8' if w <= 8 else 'W9+'
T['phase'] = T.week.map(phase)

def evaluate(sub, m):
    r = sub[m + '_rank']; ok = r.notna()
    s = sub[ok]; r = r[ok]
    if len(s) < 50:
        return None
    green, red = s[r <= 8], s[r >= 25]
    corr = np.corrcoef(s[m + '_dev'], s.resid)[0, 1]
    return dict(n=len(s), green=round(green.resid.mean(), 2), red=round(red.resid.mean(), 2),
                spread=round(green.resid.mean() - red.resid.mean(), 2),
                hit_g=round((green.resid > 0).mean() * 100, 1), hit_r=round((red.resid < 0).mean() * 100, 1),
                corr=round(corr, 3))

hist = T[T.season.between(2021, 2025)]
print('=== Historisch 2021-2025: Spread = Ø Residuum grün minus rot (PPR-Punkte) ===')
out = []
for ph in ['W1', 'W2', 'W3-4', 'W5-8', 'W9+']:
    for m in METHODS:
        e = evaluate(hist[hist.phase == ph], m)
        if e: out.append(dict(phase=ph, method=m, **e))
R = pd.DataFrame(out)
print(R.to_string(index=False))
R.to_csv('bt/result_hist.csv', index=False)

print('\n=== Je Position, 2021-2025, W2-4 und W9+ (cur vs blend_6 vs prior) ===')
out = []
for ph, cond in [('W2-4', hist.week.between(2, 4)), ('W9+', hist.week >= 9)]:
    for pos in POS:
        for m in ['cur', 'blend_6', 'prior']:
            e = evaluate(hist[cond & (hist.position == pos)], m)
            if e: out.append(dict(phase=ph, pos=pos, method=m, **e))
print(pd.DataFrame(out).to_string(index=False))

print('\n=== 2026 ===')
cur26 = T[T.season == 2026]
out = []
for w in [1, 2]:
    for m in METHODS:
        e = evaluate(cur26[cur26.week == w], m)
        if e: out.append(dict(week=w, method=m, **e))
print(pd.DataFrame(out).to_string(index=False))

# groesste Fehlgriffe W2 2026 mit dem Live-Modell
w2 = cur26[(cur26.week == 2) & cur26.cur_rank.notna()].copy()
w2['badge'] = np.where(w2.cur_rank <= 8, 'GRÜN', np.where(w2.cur_rank >= 25, 'ROT', '-'))
cols = ['player_display_name', 'position', 'opp', 'badge', 'cur_rank', 'blend_6_rank', 'prior_rank', 'base', 'pts', 'resid']
print('\nW2 2026, grün markiert und gefloppt:')
print(w2[w2.badge == 'GRÜN'].sort_values('resid').head(6)[cols].round(1).to_string(index=False))
print('\nW2 2026, rot markiert und geboomt:')
print(w2[w2.badge == 'ROT'].sort_values('resid', ascending=False).head(6)[cols].round(1).to_string(index=False))
T.to_pickle('bt/T.pkl')
