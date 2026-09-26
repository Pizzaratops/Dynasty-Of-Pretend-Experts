"""Gewicht des Vorjahres (k) fuer die Unit-Stats: Fazit-Trefferquote je Phase, je Saison."""
import pandas as pd, numpy as np
AG = pd.read_pickle('bt/team_game_aggs.pkl')
N = {'LA':'LAR','STL':'LAR','WAS':'WSH','SD':'LAC','OAK':'LV'}
SUMS = ['isP','pE','isR','rE','db','sk','ex','one','epa','rzN','rzT']
M4 = [('passEpa','high'),('rushEpa','high'),('sackRate','low'),('explosive','high')]
def rates(s): return pd.DataFrame({'passEpa': s.pE/s.isP,'rushEpa': s.rE/s.isR,'sackRate': s.sk/s.db,'explosive': s.ex/s.one})
G = pd.read_csv('bt/games.csv', low_memory=False)
G = G[(G.game_type=='REG') & G.season.between(2021,2025) & G.result.notna()].copy()
G['home_team']=G.home_team.replace(N); G['away_team']=G.away_team.replace(N)
KS = [0, 2, 4, 8, 12, 17]
rows = []
for s in range(2021, 2026):
    A = AG[AG.season==s]; P = AG[AG.season==s-1]
    prior = {sd: rates(P[P.side==sd].groupby('team')[SUMS].sum()) for sd in ['off','def']}
    for w in range(2, int(G[G.season==s].week.max())+1):
        B = A[A.week < w]; g = B[B.side=='off'].groupby('team').game_id.nunique()
        cur = {sd: rates(B[B.side==sd].groupby('team')[SUMS].sum()) for sd in ['off','def']}
        ranks = {}
        for k in KS:
            ranks[k] = {}
            for sd in ['off','def']:
                v = cur[sd]; pv = prior[sd].reindex(v.index); gg = g.reindex(v.index).fillna(0)
                if k: v = ((v.mul(gg, axis=0) + pv.mul(k)).div(gg + k, axis=0)).where(pv.notna(), v)
                rk = pd.DataFrame(index=v.index)
                for m, b in M4:
                    bb = b if sd=='off' else ('low' if b=='high' else 'high')
                    rk[m] = v[m].rank(ascending=(bb=='low'), method='first')
                ranks[k][sd] = rk
        for _, gm in G[(G.season==s)&(G.week==w)].iterrows():
            h, a = gm.home_team, gm.away_team
            rec = dict(season=s, week=w, result=gm.result)
            for k in KS:
                R = ranks[k]
                def blk(o, d):
                    oe=de=0
                    for m,_ in M4:
                        x=(R['def'].at[d,m]-R['off'].at[o,m])/31
                        oe += x>0.1; de += x<-0.1
                    return oe, de
                o1,d1 = blk(h,a); o2,d2 = blk(a,h)
                rec[f'k{k}'] = (o1-d1)-(o2-d2)
            rows.append(rec)
X = pd.DataFrame(rows); X = X[X.result != 0]
X['phase'] = X.week.map(lambda w: 'W2-4' if w<=4 else 'W5-8' if w<=8 else 'W9+')
def su(df, c):
    d = df[df[c]!=0]; return round((np.sign(d[c])==np.sign(d.result)).mean()*100,1)
out=[]
for ph in ['W2-4','W5-8','W9+','ALLE']:
    df = X if ph=='ALLE' else X[X.phase==ph]
    out.append(dict(phase=ph, n=len(df), **{f'k={k}': su(df, f'k{k}') for k in KS}))
print('Sieger richtig % je Vorjahres-Gewicht k (k=0 = live):'); print(pd.DataFrame(out).to_string(index=False))
out=[]
for s in range(2021,2026):
    df = X[(X.season==s)&(X.phase=='W2-4')]
    out.append(dict(saison=s, n=len(df), **{f'k={k}': su(df, f'k{k}') for k in [0,4,8]}))
print('\nNur Woche 2-4, je Saison:'); print(pd.DataFrame(out).to_string(index=False))

# Kalibrierung fuer die Seite: Trefferquote je |Netto| und Phase (k=4)
X['absn'] = X.k4.abs(); X['stufe'] = np.where(X.absn >= 3, 'klar (>=3)', np.where(X.absn >= 1, 'leicht (1-2)', 'keiner'))
out = []
for ph in ['W1', 'W2-4', 'W5-8', 'W9+']:
    df = X[X.phase == ph] if ph != 'W1' else X.iloc[0:0]
    for st in ['leicht (1-2)', 'klar (>=3)']:
        d = df[df.stufe == st]
        if len(d): out.append(dict(phase=ph, stufe=st, n=len(d), anteil=round(len(d) / len(df) * 100), treffer=round((np.sign(d.k4) == np.sign(d.result)).mean() * 100, 1)))
print('\nKalibrierung k=4:'); print(pd.DataFrame(out).to_string(index=False))
