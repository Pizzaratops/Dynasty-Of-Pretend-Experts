"""Stabilitaet der Matchup-Stats: Teamwert ungerade Wochen vs gerade Wochen 2025 (Pearson r).
Zusaetzlich Jahr-zu-Jahr (2024 -> 2025) fuer Fantasy Points Allowed."""
import pandas as pd, numpy as np, gzip
N = {'LA':'LAR','WAS':'WSH','SD':'LAC','OAK':'LV'}
use = ['game_id','play_id','season_type','week','posteam','defteam','pass','rush','qb_dropback','sack','qb_scramble','epa','yards_gained','play_type','two_point_attempt','fixed_drive','fixed_drive_result','drive_inside20','pass_attempt']
p = pd.read_csv('pbp25.csv.gz', usecols=use, low_memory=False)
p = p[(p.season_type=='REG') & p.posteam.notna()].copy()
p['posteam']=p.posteam.replace(N); p['defteam']=p.defteam.replace(N)
p['half'] = np.where(p.week % 2 == 1, 'a', 'b')
pl = p[p.play_type.isin(['pass','run']) & (p.two_point_attempt!=1) & p.epa.notna() & ((p['pass']==1)|(p.rush==1))].copy()
pl['expl'] = (((pl['pass']==1)&(pl.sack!=1)&(pl.yards_gained>=20)) | ((pl.rush==1)&(pl.yards_gained>=10))).astype(int)
def metric(df, side):
    g = df.groupby([side,'half'])
    out = pd.DataFrame({
      'passEpa': df[df['pass']==1].groupby([side,'half']).epa.mean(),
      'rushEpa': df[df.rush==1].groupby([side,'half']).epa.mean(),
      'sackRate': df[df.qb_dropback==1].groupby([side,'half']).sack.mean(),
      'explosive': g.expl.mean(),
    })
    rz = p[p.drive_inside20==1].drop_duplicates(['game_id','fixed_drive',side])
    rz = rz.assign(td=(rz.fixed_drive_result=='Touchdown').astype(int))
    out['rzTd'] = rz.groupby([side,'half']).td.mean()
    return out
res = {}
for side, lab in [('posteam','off'),('defteam','def')]:
    m = metric(pl, side).unstack('half')
    for k in ['passEpa','rushEpa','sackRate','explosive','rzTd']:
        res[f'{lab}.{k}'] = round(m[k]['a'].corr(m[k]['b']), 2)
# Scheme (FTN)
f = pd.read_csv('ftn25.csv', low_memory=False)
f['key'] = f.nflverse_game_id + '#' + f.nflverse_play_id.astype(str)
pl['key'] = pl.game_id + '#' + pl.play_id.astype(int).astype(str)
j = pl.merge(f[['key','n_blitzers','n_defense_box','is_play_action','is_screen_pass','is_motion']], on='key')
T = lambda s: s.astype(str).str.upper().eq('TRUE')
j['blitz'] = (j.n_blitzers>0).astype(int); j['box8'] = (j.n_defense_box>=8).astype(int)
j['pa']=T(j.is_play_action).astype(int); j['screen']=T(j.is_screen_pass).astype(int); j['motion']=T(j.is_motion).astype(int)
db = j[j.qb_dropback==1]; ru = j[(j.rush==1)&(j.qb_scramble!=1)&(j.n_defense_box>0)]; pa_ = j[(j.pass_attempt==1)&(j.sack!=1)]
for k, df, side in [('blitz',db,'defteam'),('box8',ru,'defteam'),('pa',db,'posteam'),('screen',pa_,'posteam'),('motion',j,'posteam')]:
    m = df.groupby([side,'half'])[k].mean().unstack('half'); res[f'scheme.{k}'] = round(m['a'].corr(m['b']),2)
# FPA je Position: ungerade/gerade 2025 und Jahr-zu-Jahr 2024->2025
def fpa(y, half=None):
    s = pd.read_csv(f'bt/spw{y}.csv', usecols=['position','season_type','week','opponent_team','fantasy_points_ppr'], low_memory=False)
    s = s[(s.season_type=='REG') & s.position.isin(['QB','RB','WR','TE'])].copy(); s['opp']=s.opponent_team.replace(N)
    if half is not None: s = s[(s.week%2==1)==(half=='a')]
    g = s.groupby('opp').week.nunique()
    return (s.groupby(['opp','position']).fantasy_points_ppr.sum().unstack() .div(g, axis=0))
a, b = fpa(2025,'a'), fpa(2025,'b'); y24, y25 = fpa(2024), fpa(2025)
for pos in ['QB','RB','WR','TE']:
    res[f'fpa.{pos}'] = round(a[pos].corr(b[pos]),2); res[f'fpaYoY.{pos}'] = round(y24[pos].corr(y25[pos]),2)
for k,v in res.items(): print(f'{k:18s} {v}')
import json; json.dump(res, open('bt/stability.json','w'))
