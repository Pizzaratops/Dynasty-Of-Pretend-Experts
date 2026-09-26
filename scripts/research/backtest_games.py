"""Backtest auf Spielebene: Sagt das Fazit der Matchup-Advantage-Seite Spiele voraus?

Fuer jedes REG-Spiel 2021-2025 ab Woche 2 werden die Unit-Stats NUR aus den
Spielen davor derselben Saison berechnet (wie live), Raenge 1-32 gebildet und
das Fazit der Seite nachgebaut:
  Block (Offense X vs Defense Y): je Kategorie adv = (DefRang_Y - OffRang_X)/31,
  Vorteil Offense bei adv > 0.1, Vorteil Defense bei adv < -0.1.
  Netto fuer Heimteam = (Heim-Off-Vorteile - Gast-Def-Vorteile im Block 1)
                      - (Gast-Off-Vorteile - Heim-Def-Vorteile im Block 2).
Varianten:
  site4        live: Pass/Rush EPA, Sack Rate, Explosive (ohne Red Zone)
  site5        alte Version inkl. Red-Zone-TD %
  site4_prior  wie site4, Rohwerte mit Vorjahr gemischt ((g*Saison + 4*Vorjahr)/(g+4))
  netepa       kontinuierlich: (Heim Off EPA - Gast Def EPA zugel.) - (Gast Off - Heim Def)
Vergleich: Heimteam, Vegas-Favorit; gegen den Spread (ATS) 52,4 % = Break-even.
"""
import pandas as pd, numpy as np

N = {'LA': 'LAR', 'STL': 'LAR', 'WAS': 'WSH', 'SD': 'LAC', 'OAK': 'LV'}
USE = ['game_id', 'season_type', 'week', 'posteam', 'defteam', 'pass', 'rush', 'qb_dropback', 'sack', 'epa',
       'yards_gained', 'play_type', 'two_point_attempt', 'fixed_drive', 'fixed_drive_result', 'drive_inside20']

def team_game_aggs(y):
    p = pd.read_csv(f'bt/pbp{y}.csv.gz', usecols=USE, low_memory=False)
    p = p[(p.season_type == 'REG') & p.posteam.notna() & p.defteam.notna()].copy()
    p['posteam'] = p.posteam.replace(N); p['defteam'] = p.defteam.replace(N)
    pl = p[p.play_type.isin(['pass', 'run']) & (p.two_point_attempt != 1) & p.epa.notna() & ((p['pass'] == 1) | (p.rush == 1))].copy()
    pl['isP'] = (pl['pass'] == 1).astype(int); pl['isR'] = ((pl['pass'] != 1) & (pl.rush == 1)).astype(int)
    pl['pE'] = pl.epa * pl.isP; pl['rE'] = pl.epa * pl.isR
    pl['db'] = (pl.qb_dropback == 1).astype(int); pl['sk'] = ((pl.qb_dropback == 1) & (pl.sack == 1)).astype(int)
    pl['ex'] = (((pl.isP == 1) & (pl.sack != 1) & (pl.yards_gained >= 20)) | ((pl.isR == 1) & (pl.yards_gained >= 10))).astype(int)
    pl['one'] = 1
    cols = ['isP', 'pE', 'isR', 'rE', 'db', 'sk', 'ex', 'one', 'epa']
    rz = p[p.drive_inside20 == 1].drop_duplicates(['game_id', 'fixed_drive', 'posteam'])
    rz = rz.assign(rzN=1, rzT=(rz.fixed_drive_result == 'Touchdown').astype(int))
    out = []
    for side in ['posteam', 'defteam']:
        a = pl.groupby(['game_id', 'week', side])[cols].sum()
        r = rz.groupby(['game_id', 'week', side])[['rzN', 'rzT']].sum()
        a = a.join(r, how='left').fillna(0).reset_index().rename(columns={side: 'team'})
        a['side'] = 'off' if side == 'posteam' else 'def'
        out.append(a)
    d = pd.concat(out); d['season'] = y
    return d

AG = pd.concat([team_game_aggs(y) for y in range(2020, 2026)])
AG.to_pickle('bt/team_game_aggs.pkl')
SUMS = ['isP', 'pE', 'isR', 'rE', 'db', 'sk', 'ex', 'one', 'epa', 'rzN', 'rzT']
METRICS = [('passEpa', 'high'), ('rushEpa', 'high'), ('sackRate', 'low'), ('explosive', 'high'), ('rzTd', 'high')]

def rates(s):
    return pd.DataFrame({
        'passEpa': s.pE / s.isP, 'rushEpa': s.rE / s.isR, 'sackRate': s.sk / s.db,
        'explosive': s.ex / s.one, 'rzTd': s.rzT / s.rzN.replace(0, np.nan), 'epa': s.epa / s.one,
    })

G = pd.read_csv('bt/games.csv', low_memory=False)
G = G[(G.game_type == 'REG') & G.season.between(2021, 2025) & G.result.notna()].copy()
G['home_team'] = G.home_team.replace(N); G['away_team'] = G.away_team.replace(N)

rows = []
for s in range(2021, 2026):
    A = AG[AG.season == s]; P = AG[AG.season == s - 1]
    prior = {side: rates(P[P.side == side].groupby('team')[SUMS].sum()) for side in ['off', 'def']}
    for w in sorted(G[G.season == s].week.unique()):
        if w < 2: continue
        B = A[A.week < w]
        cur = {side: B[B.side == side].groupby('team')[SUMS].sum() for side in ['off', 'def']}
        gcount = B[B.side == 'off'].groupby('team').game_id.nunique()
        R = {}
        for variant in ['cur', 'prior4']:
            vals = {}
            for side in ['off', 'def']:
                v = rates(cur[side])
                if variant == 'prior4':
                    g = gcount.reindex(v.index).fillna(0)
                    pv = prior[side].reindex(v.index)
                    mixed = (v.mul(g, axis=0) + pv.mul(4)).div(g + 4, axis=0)
                    v = mixed.where(pv.notna(), v)
                vals[side] = v
            ranks = {}
            for side in ['off', 'def']:
                rk = pd.DataFrame(index=vals[side].index)
                for m, better in METRICS:
                    # Offense: better wie angegeben; Defense: umgekehrt (weniger zugelassen = besser), Sack Rate erzeugt = hoch
                    b = better if side == 'off' else ('low' if better == 'high' else 'high')
                    rk[m] = vals[side][m].rank(ascending=(b == 'low'), method='first')
                ranks[side] = rk
            R[variant] = (vals, ranks)
        for _, g in G[(G.season == s) & (G.week == w)].iterrows():
            h, a = g.home_team, g.away_team
            rec = dict(season=s, week=w, home=h, away=a, result=g.result, spread=g.spread_line)
            for variant, (vals, ranks) in R.items():
                if h not in ranks['off'].index or a not in ranks['off'].index: continue
                for label, mlist in [('4', ['passEpa', 'rushEpa', 'sackRate', 'explosive']), ('5', ['passEpa', 'rushEpa', 'sackRate', 'explosive', 'rzTd'])]:
                    def block(o, d):
                        oe = de = 0; adv = 0.0
                        for m in mlist:
                            oR, dR = ranks['off'].at[o, m], ranks['def'].at[d, m]
                            if np.isnan(oR) or np.isnan(dR): continue
                            x = (dR - oR) / 31; adv += x
                            if x > 0.1: oe += 1
                            elif x < -0.1: de += 1
                        return oe, de, adv
                    o1, d1, a1 = block(h, a); o2, d2, a2 = block(a, h)
                    rec[f'net_{variant}_{label}'] = (o1 - d1) - (o2 - d2)
                    rec[f'adv_{variant}_{label}'] = a1 - a2
                if variant == 'cur':
                    vo, vd = vals['off'], vals['def']
                    rec['netepa'] = (vo.at[h, 'epa'] - vd.at[a, 'epa']) - (vo.at[a, 'epa'] - vd.at[h, 'epa'])
            rows.append(rec)
X = pd.DataFrame(rows)
X['home_win'] = np.sign(X.result)
X['ats'] = np.sign(X.result - X.spread)  # + = Heim deckt
X['phase'] = X.week.map(lambda w: 'W2-4' if w <= 4 else 'W5-8' if w <= 8 else 'W9+')
X.to_pickle('bt/game_bt.pkl')

def ev(df, col, thr=0):
    d = df[df[col].notna() & (df[col].abs() > thr)]
    pick = np.sign(d[col])
    win = d[d.home_win != 0]; pw = np.sign(win[col])
    ats = d[d.ats != 0]; pa = np.sign(ats[col])
    return dict(games=len(df), picks=len(d), coverage=round(len(d) / len(df) * 100, 1),
                su=round((pw == win.home_win).mean() * 100, 1), ats=round((pa == ats.ats).mean() * 100, 1))

base = []
for ph in ['W2-4', 'W5-8', 'W9+', 'ALLE']:
    df = X if ph == 'ALLE' else X[X.phase == ph]
    hw = df[df.home_win != 0]
    fav = df[(df.spread != 0) & (df.home_win != 0)]
    base.append(dict(phase=ph, games=len(df), heim=round((hw.home_win > 0).mean() * 100, 1),
                     vegas_fav=round((np.sign(fav.spread) == fav.home_win).mean() * 100, 1)))
print('=== Vergleichswerte (Sieger) ===')
print(pd.DataFrame(base).to_string(index=False))

res = []
for ph in ['W2-4', 'W5-8', 'W9+', 'ALLE']:
    df = X if ph == 'ALLE' else X[X.phase == ph]
    for col, thr, name in [('net_cur_4', 0, 'Seite (4 Kat.)'), ('net_cur_4', 2, 'Seite, Netto ≥3'), ('net_cur_5', 0, 'alt (5 Kat.)'),
                           ('net_prior4_4', 0, 'Seite + Vorjahr'), ('adv_cur_4', 0, 'Rang-Summe'), ('netepa', 0, 'Netto-EPA')]:
        res.append(dict(phase=ph, variante=name, **ev(df, col, thr)))
print('\n=== Modelle: su = Sieger richtig %, ats = gegen den Spread richtig % (52,4 = Break-even) ===')
print(pd.DataFrame(res).to_string(index=False))

# Mehrwert gegenueber Vegas: Korrelation Signal mit (Ergebnis - Spread)
X['beat'] = X.result - X.spread
print('\n=== Korrelation mit Ergebnis vs Spread (Info über Vegas hinaus) ===')
for col in ['net_cur_4', 'adv_cur_4', 'net_prior4_4', 'netepa']:
    d = X[X[col].notna()]
    print(f'{col:14s} r(Ergebnis) = {np.corrcoef(d[col], d.result)[0,1]:.3f}   r(Ergebnis - Spread) = {np.corrcoef(d[col], d.beat)[0,1]:.3f}   n={len(d)}')
d = X[X.spread.notna()]
print(f'{"Vegas Spread":14s} r(Ergebnis) = {np.corrcoef(d.spread, d.result)[0,1]:.3f}')
