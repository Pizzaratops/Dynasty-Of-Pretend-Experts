"""Verbesserung: gegner-bereinigte FPA (Punkte UEBER ERWARTUNG zugelassen).

Defense-Signal = Ø Residuum (Ist - eigener Schnitt) aller Spieler der
Position, die in den Vorwochen gegen diese Defense gespielt haben.
Varianten: nur Saison (oe_cur), mit Vorjahr gemischt (oe_blend_k), und
der Stufenplan: W1 Vorjahr, W2 Mix k=12, ab W3 laufende Saison.
"""
import pandas as pd, numpy as np

T = pd.read_pickle('bt/T.pkl')
# Alle relevanten Spiele (base vorhanden) als Evidenz fuer die Defense
E = T[['season', 'week', 'opp', 'position', 'resid']].dropna()
agg = E.groupby(['season', 'week', 'opp', 'position']).resid.agg(['sum', 'count']).reset_index()

rows = []
for s in sorted(T.season.unique()):
    a = agg[agg.season == s]
    p = agg[agg.season == s - 1]
    prior = (p.groupby(['opp', 'position'])['sum'].sum() / p.groupby(['opp', 'position'])['count'].sum()) if len(p) else pd.Series(dtype=float)
    for w in range(1, int(T[T.season == s].week.max()) + 1):
        b = a[a.week < w]
        cs = b.groupby(['opp', 'position'])['sum'].sum(); cn = b.groupby(['opp', 'position'])['count'].sum()
        gw = b.groupby('opp').week.nunique()
        keys = set(cs.index) | set(prior.index)
        for key in keys:
            n = cn.get(key, 0)
            rows.append(dict(season=s, week=w, opp=key[0], position=key[1], g=int(gw.get(key[0], 0)),
                             oe_cur=(cs.get(key, np.nan) / n) if n else np.nan, oe_prior=prior.get(key, np.nan)))
O = pd.DataFrame(rows)
for k in [4, 8, 12]:
    O[f'oe_blend_{k}'] = np.where(O.oe_prior.notna(), (O.g * O.oe_cur.fillna(0) + k * O.oe_prior) / (O.g + k), O.oe_cur)
M = ['oe_cur', 'oe_prior', 'oe_blend_4', 'oe_blend_8', 'oe_blend_12']
for m in M:
    O[m + '_rank'] = O.groupby(['season', 'week', 'position'])[m].rank(ascending=False, method='first')
    O[m + '_dev'] = O[m] - O.groupby(['season', 'week', 'position'])[m].transform('mean')
X = T.merge(O, on=['season', 'week', 'opp', 'position'], how='left')

# Stufenplan fuer beide Signalarten
def staged(df, prefix_prior, prefix_mid, prefix_cur):
    r = np.where(df.week == 1, df[prefix_prior + '_rank'], np.where(df.week == 2, df[prefix_mid + '_rank'], df[prefix_cur + '_rank']))
    d = np.where(df.week == 1, df[prefix_prior + '_dev'], np.where(df.week == 2, df[prefix_mid + '_dev'], df[prefix_cur + '_dev']))
    return r, d
X['stufen_fpa_rank'], X['stufen_fpa_dev'] = staged(X, 'prior', 'blend_12', 'cur')
X['stufen_oe_rank'], X['stufen_oe_dev'] = staged(X, 'oe_prior', 'oe_blend_12', 'oe_cur')
X['oe_best_rank'], X['oe_best_dev'] = staged(X, 'oe_prior', 'oe_blend_12', 'oe_blend_4')

def ev(sub, m):
    s = sub[sub[m + '_rank'].notna()]
    if len(s) < 50: return None
    r = s[m + '_rank']; g, rd = s[r <= 8], s[r >= 25]
    return dict(n=len(s), spread=round(g.resid.mean() - rd.resid.mean(), 2),
                hit_g=round((g.resid > 0).mean() * 100, 1), hit_r=round((rd.resid < 0).mean() * 100, 1),
                corr=round(np.corrcoef(s[m + '_dev'], s.resid)[0, 1], 3))

H = X[X.season.between(2021, 2025)]
H = H.assign(phase=H.week.map(lambda w: 'W1' if w == 1 else 'W2' if w == 2 else 'W3-4' if w <= 4 else 'W5-8' if w <= 8 else 'W9+'))
CMP = ['cur', 'stufen_fpa', 'oe_cur', 'oe_blend_4', 'stufen_oe', 'oe_best']
out = []
for ph in ['W1', 'W2', 'W3-4', 'W5-8', 'W9+', 'ALLE']:
    sub = H if ph == 'ALLE' else H[H.phase == ph]
    for m in CMP:
        e = ev(sub, m)
        if e: out.append(dict(phase=ph, method=m, **e))
print('=== 2021-2025 ===')
print(pd.DataFrame(out).to_string(index=False))

out = []
for pos in ['QB', 'RB', 'WR', 'TE']:
    for m in ['cur', 'oe_best']:
        e = ev(H[H.position == pos], m)
        if e: out.append(dict(pos=pos, method=m, **e))
print('\n=== je Position, alle Wochen 2021-2025 ===')
print(pd.DataFrame(out).to_string(index=False))

out = []
X26 = X[X.season == 2026]
for w in [1, 2]:
    for m in CMP:
        e = ev(X26[X26.week == w], m)
        if e: out.append(dict(week=w, method=m, **e))
print('\n=== 2026 ===')
print(pd.DataFrame(out).to_string(index=False))

# Wie gross ist der Effekt im Verhaeltnis zur normalen Schwankung?
print('\nStreuung Residuum (SD) je Position:', H.groupby('position').resid.std().round(1).to_dict())
X.to_pickle('bt/X.pkl')
