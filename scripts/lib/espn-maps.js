// ============================================================
//  ESPN-Mappings — nur fuer den Status Report (ESPN-Ligen der Personen
//  in js/status-report-config.js). Die DPE-Liga selbst laeuft komplett
//  ueber Sleeper, siehe scripts/sync-sleeper.js.
// ============================================================

// ESPN player.defaultPositionId -> Positions-Kuerzel.
const ESPN_POS_MAP = {
  1: 'QB', 2: 'RB', 3: 'WR', 4: 'TE', 5: 'K', 16: 'DST',
};

// ESPN player.proTeamId -> NFL-Team-Kuerzel.
const ESPN_NFL_MAP = {
  0:'FA', 1:'ATL', 2:'BUF', 3:'CHI', 4:'CIN', 5:'CLE', 6:'DAL', 7:'DEN',
  8:'DET', 9:'GB', 10:'TEN', 11:'IND', 12:'KC', 13:'LV', 14:'LAR',
  15:'MIA', 16:'MIN', 17:'NE', 18:'NO', 19:'NYG', 20:'NYJ', 21:'PHI',
  22:'ARI', 23:'PIT', 24:'LAC', 25:'SF', 26:'SEA', 27:'TB', 28:'WSH',
  29:'CAR', 30:'JAX', 33:'BAL', 34:'HOU',
};
