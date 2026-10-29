// ============================================================
//  FANTASY_POWER_SCORE — "Bootleg Power Score" fürs Fantasy-Team (Sleeper)
// ============================================================
//  AUTO-GENERIERT von scripts/sync-fantasy-position-score.js über die
//  GitHub Action ".github/workflows/sync-fantasy-position-score.yml".
//  Nicht von Hand editieren.
//
//  6 Kategorien: Points Scored, Points Allowed, Points by QB/RB/WR/TE
//  (FLEX zaehlt nach echter Spieler-Position, K/DST fliessen in keine
//  der 4 Positions-Kategorien ein). Struktur identisch zu
//  data/nfl-power-score.js, nur mit unseren Team-IDs (data/teams.js)
//  statt NFL-Kuerzeln und Rang 1-N (N = Anzahl Teams) statt 1-32.
//
//  FANTASY_POWER_SCORE.weeks[week] = { cumulative, weekly }, je ein
//  Array aller Teams: { teamId, values:{<key>:Zahl|null},
//  ranks:{<key>:1-N|null} }.
// ============================================================

const FANTASY_POWER_SCORE = {
  season: 2026,
  teamCount: 14,
  categories: [
    {
      "key": "pointsFor",
      "label": "Points Scored",
      "unit": "pro Woche",
      "better": "high"
    },
    {
      "key": "pointsAgainst",
      "label": "Points Allowed",
      "unit": "pro Woche zugelassen",
      "better": "low"
    },
    {
      "key": "qbPts",
      "label": "Points by QB",
      "unit": "pro Woche",
      "better": "high"
    },
    {
      "key": "rbPts",
      "label": "Points by RB",
      "unit": "pro Woche",
      "better": "high"
    },
    {
      "key": "wrPts",
      "label": "Points by WR",
      "unit": "pro Woche",
      "better": "high"
    },
    {
      "key": "tePts",
      "label": "Points by TE",
      "unit": "pro Woche",
      "better": "high"
    }
  ],
  weeks: {
    "1": {
      "cumulative": [
        {
          "teamId": "milchreis",
          "values": {
            "pointsFor": 145.26,
            "pointsAgainst": 123.4,
            "qbPts": 37.26,
            "rbPts": 33.9,
            "wrPts": 64.1,
            "tePts": 0
          },
          "ranks": {
            "pointsFor": 6,
            "pointsAgainst": 5,
            "qbPts": 1,
            "rbPts": 9,
            "wrPts": 3,
            "tePts": 13
          },
          "gamesPlayed": 1
        },
        {
          "teamId": "bomba12",
          "values": {
            "pointsFor": 130.52,
            "pointsAgainst": 64.6,
            "qbPts": 0.52,
            "rbPts": 31.2,
            "wrPts": 89.3,
            "tePts": 9.5
          },
          "ranks": {
            "pointsFor": 8,
            "pointsAgainst": 1,
            "qbPts": 13,
            "rbPts": 10,
            "wrPts": 1,
            "tePts": 10
          },
          "gamesPlayed": 1
        },
        {
          "teamId": "svennyg",
          "values": {
            "pointsFor": 113.4,
            "pointsAgainst": 196.92,
            "qbPts": 15.4,
            "rbPts": 39.2,
            "wrPts": 31.2,
            "tePts": 5.6
          },
          "ranks": {
            "pointsFor": 11,
            "pointsAgainst": 14,
            "qbPts": 8,
            "rbPts": 6,
            "wrPts": 10,
            "tePts": 11
          },
          "gamesPlayed": 1
        },
        {
          "teamId": "jiggydee2312",
          "values": {
            "pointsFor": 90.82,
            "pointsAgainst": 159.54,
            "qbPts": 12.82,
            "rbPts": 16.2,
            "wrPts": 15.7,
            "tePts": 28.1
          },
          "ranks": {
            "pointsFor": 13,
            "pointsAgainst": 11,
            "qbPts": 10,
            "rbPts": 13,
            "wrPts": 14,
            "tePts": 1
          },
          "gamesPlayed": 1
        },
        {
          "teamId": "dickvanhurik",
          "values": {
            "pointsFor": 151.56,
            "pointsAgainst": 110.7,
            "qbPts": 24.96,
            "rbPts": 42.6,
            "wrPts": 54.9,
            "tePts": 4.1
          },
          "ranks": {
            "pointsFor": 5,
            "pointsAgainst": 3,
            "qbPts": 5,
            "rbPts": 5,
            "wrPts": 5,
            "tePts": 12
          },
          "gamesPlayed": 1
        },
        {
          "teamId": "teambeermode",
          "values": {
            "pointsFor": 168.42,
            "pointsAgainst": 126.06,
            "qbPts": 24.72,
            "rbPts": 60.7,
            "wrPts": 49.3,
            "tePts": 23.7
          },
          "ranks": {
            "pointsFor": 2,
            "pointsAgainst": 6,
            "qbPts": 6,
            "rbPts": 3,
            "wrPts": 8,
            "tePts": 4
          },
          "gamesPlayed": 1
        },
        {
          "teamId": "dseinn",
          "values": {
            "pointsFor": 196.92,
            "pointsAgainst": 113.4,
            "qbPts": 0.62,
            "rbPts": 97.3,
            "wrPts": 63.2,
            "tePts": 27.8
          },
          "ranks": {
            "pointsFor": 1,
            "pointsAgainst": 4,
            "qbPts": 12,
            "rbPts": 1,
            "wrPts": 4,
            "tePts": 2
          },
          "gamesPlayed": 1
        },
        {
          "teamId": "giantmarv",
          "values": {
            "pointsFor": 110.7,
            "pointsAgainst": 151.56,
            "qbPts": 26.6,
            "rbPts": 36.3,
            "wrPts": 23.1,
            "tePts": 12.7
          },
          "ranks": {
            "pointsFor": 12,
            "pointsAgainst": 10,
            "qbPts": 3,
            "rbPts": 8,
            "wrPts": 12,
            "tePts": 7
          },
          "gamesPlayed": 1
        },
        {
          "teamId": "r4xon",
          "values": {
            "pointsFor": 166.8,
            "pointsAgainst": 133.66,
            "qbPts": 22.1,
            "rbPts": 66.7,
            "wrPts": 53.6,
            "tePts": 14.4
          },
          "ranks": {
            "pointsFor": 3,
            "pointsAgainst": 8,
            "qbPts": 7,
            "rbPts": 2,
            "wrPts": 6,
            "tePts": 6
          },
          "gamesPlayed": 1
        },
        {
          "teamId": "danfre",
          "values": {
            "pointsFor": 126.06,
            "pointsAgainst": 168.42,
            "qbPts": 14.26,
            "rbPts": 57.7,
            "wrPts": 29.3,
            "tePts": 9.8
          },
          "ranks": {
            "pointsFor": 9,
            "pointsAgainst": 13,
            "qbPts": 9,
            "rbPts": 4,
            "wrPts": 11,
            "tePts": 9
          },
          "gamesPlayed": 1
        },
        {
          "teamId": "unicornsruegen",
          "values": {
            "pointsFor": 123.4,
            "pointsAgainst": 145.26,
            "qbPts": 26.1,
            "rbPts": 28.1,
            "wrPts": 22.3,
            "tePts": 23.9
          },
          "ranks": {
            "pointsFor": 10,
            "pointsAgainst": 9,
            "qbPts": 4,
            "rbPts": 11,
            "wrPts": 13,
            "tePts": 3
          },
          "gamesPlayed": 1
        },
        {
          "teamId": "lovethecheesehead",
          "values": {
            "pointsFor": 64.6,
            "pointsAgainst": 130.52,
            "qbPts": 0,
            "rbPts": 4,
            "wrPts": 44.6,
            "tePts": 0
          },
          "ranks": {
            "pointsFor": 14,
            "pointsAgainst": 7,
            "qbPts": 14,
            "rbPts": 14,
            "wrPts": 9,
            "tePts": 14
          },
          "gamesPlayed": 1
        },
        {
          "teamId": "americagrizlies",
          "values": {
            "pointsFor": 133.66,
            "pointsAgainst": 166.8,
            "qbPts": 35.66,
            "rbPts": 17,
            "wrPts": 50.2,
            "tePts": 14.8
          },
          "ranks": {
            "pointsFor": 7,
            "pointsAgainst": 12,
            "qbPts": 2,
            "rbPts": 12,
            "wrPts": 7,
            "tePts": 5
          },
          "gamesPlayed": 1
        },
        {
          "teamId": "angryducks",
          "values": {
            "pointsFor": 159.54,
            "pointsAgainst": 90.82,
            "qbPts": 6.44,
            "rbPts": 38.9,
            "wrPts": 71.9,
            "tePts": 10.3
          },
          "ranks": {
            "pointsFor": 4,
            "pointsAgainst": 2,
            "qbPts": 11,
            "rbPts": 7,
            "wrPts": 2,
            "tePts": 8
          },
          "gamesPlayed": 1
        }
      ],
      "weekly": [
        {
          "teamId": "milchreis",
          "values": {
            "pointsFor": 145.26,
            "pointsAgainst": 123.4,
            "qbPts": 37.26,
            "rbPts": 33.9,
            "wrPts": 64.1,
            "tePts": 0
          },
          "ranks": {
            "pointsFor": 6,
            "pointsAgainst": 5,
            "qbPts": 1,
            "rbPts": 9,
            "wrPts": 3,
            "tePts": 13
          }
        },
        {
          "teamId": "bomba12",
          "values": {
            "pointsFor": 130.52,
            "pointsAgainst": 64.6,
            "qbPts": 0.52,
            "rbPts": 31.2,
            "wrPts": 89.3,
            "tePts": 9.5
          },
          "ranks": {
            "pointsFor": 8,
            "pointsAgainst": 1,
            "qbPts": 13,
            "rbPts": 10,
            "wrPts": 1,
            "tePts": 10
          }
        },
        {
          "teamId": "svennyg",
          "values": {
            "pointsFor": 113.4,
            "pointsAgainst": 196.92,
            "qbPts": 15.4,
            "rbPts": 39.2,
            "wrPts": 31.2,
            "tePts": 5.6
          },
          "ranks": {
            "pointsFor": 11,
            "pointsAgainst": 14,
            "qbPts": 8,
            "rbPts": 6,
            "wrPts": 10,
            "tePts": 11
          }
        },
        {
          "teamId": "jiggydee2312",
          "values": {
            "pointsFor": 90.82,
            "pointsAgainst": 159.54,
            "qbPts": 12.82,
            "rbPts": 16.2,
            "wrPts": 15.7,
            "tePts": 28.1
          },
          "ranks": {
            "pointsFor": 13,
            "pointsAgainst": 11,
            "qbPts": 10,
            "rbPts": 13,
            "wrPts": 14,
            "tePts": 1
          }
        },
        {
          "teamId": "dickvanhurik",
          "values": {
            "pointsFor": 151.56,
            "pointsAgainst": 110.7,
            "qbPts": 24.96,
            "rbPts": 42.6,
            "wrPts": 54.9,
            "tePts": 4.1
          },
          "ranks": {
            "pointsFor": 5,
            "pointsAgainst": 3,
            "qbPts": 5,
            "rbPts": 5,
            "wrPts": 5,
            "tePts": 12
          }
        },
        {
          "teamId": "teambeermode",
          "values": {
            "pointsFor": 168.42,
            "pointsAgainst": 126.06,
            "qbPts": 24.72,
            "rbPts": 60.7,
            "wrPts": 49.3,
            "tePts": 23.7
          },
          "ranks": {
            "pointsFor": 2,
            "pointsAgainst": 6,
            "qbPts": 6,
            "rbPts": 3,
            "wrPts": 8,
            "tePts": 4
          }
        },
        {
          "teamId": "dseinn",
          "values": {
            "pointsFor": 196.92,
            "pointsAgainst": 113.4,
            "qbPts": 0.62,
            "rbPts": 97.3,
            "wrPts": 63.2,
            "tePts": 27.8
          },
          "ranks": {
            "pointsFor": 1,
            "pointsAgainst": 4,
            "qbPts": 12,
            "rbPts": 1,
            "wrPts": 4,
            "tePts": 2
          }
        },
        {
          "teamId": "giantmarv",
          "values": {
            "pointsFor": 110.7,
            "pointsAgainst": 151.56,
            "qbPts": 26.6,
            "rbPts": 36.3,
            "wrPts": 23.1,
            "tePts": 12.7
          },
          "ranks": {
            "pointsFor": 12,
            "pointsAgainst": 10,
            "qbPts": 3,
            "rbPts": 8,
            "wrPts": 12,
            "tePts": 7
          }
        },
        {
          "teamId": "r4xon",
          "values": {
            "pointsFor": 166.8,
            "pointsAgainst": 133.66,
            "qbPts": 22.1,
            "rbPts": 66.7,
            "wrPts": 53.6,
            "tePts": 14.4
          },
          "ranks": {
            "pointsFor": 3,
            "pointsAgainst": 8,
            "qbPts": 7,
            "rbPts": 2,
            "wrPts": 6,
            "tePts": 6
          }
        },
        {
          "teamId": "danfre",
          "values": {
            "pointsFor": 126.06,
            "pointsAgainst": 168.42,
            "qbPts": 14.26,
            "rbPts": 57.7,
            "wrPts": 29.3,
            "tePts": 9.8
          },
          "ranks": {
            "pointsFor": 9,
            "pointsAgainst": 13,
            "qbPts": 9,
            "rbPts": 4,
            "wrPts": 11,
            "tePts": 9
          }
        },
        {
          "teamId": "unicornsruegen",
          "values": {
            "pointsFor": 123.4,
            "pointsAgainst": 145.26,
            "qbPts": 26.1,
            "rbPts": 28.1,
            "wrPts": 22.3,
            "tePts": 23.9
          },
          "ranks": {
            "pointsFor": 10,
            "pointsAgainst": 9,
            "qbPts": 4,
            "rbPts": 11,
            "wrPts": 13,
            "tePts": 3
          }
        },
        {
          "teamId": "lovethecheesehead",
          "values": {
            "pointsFor": 64.6,
            "pointsAgainst": 130.52,
            "qbPts": 0,
            "rbPts": 4,
            "wrPts": 44.6,
            "tePts": 0
          },
          "ranks": {
            "pointsFor": 14,
            "pointsAgainst": 7,
            "qbPts": 14,
            "rbPts": 14,
            "wrPts": 9,
            "tePts": 14
          }
        },
        {
          "teamId": "americagrizlies",
          "values": {
            "pointsFor": 133.66,
            "pointsAgainst": 166.8,
            "qbPts": 35.66,
            "rbPts": 17,
            "wrPts": 50.2,
            "tePts": 14.8
          },
          "ranks": {
            "pointsFor": 7,
            "pointsAgainst": 12,
            "qbPts": 2,
            "rbPts": 12,
            "wrPts": 7,
            "tePts": 5
          }
        },
        {
          "teamId": "angryducks",
          "values": {
            "pointsFor": 159.54,
            "pointsAgainst": 90.82,
            "qbPts": 6.44,
            "rbPts": 38.9,
            "wrPts": 71.9,
            "tePts": 10.3
          },
          "ranks": {
            "pointsFor": 4,
            "pointsAgainst": 2,
            "qbPts": 11,
            "rbPts": 7,
            "wrPts": 2,
            "tePts": 8
          }
        }
      ]
    },
    "2": {
      "cumulative": [
        {
          "teamId": "milchreis",
          "values": {
            "pointsFor": 135.29,
            "pointsAgainst": 139.48,
            "qbPts": 22.99,
            "rbPts": 28.8,
            "wrPts": 71.35,
            "tePts": 0.65
          },
          "ranks": {
            "pointsFor": 6,
            "pointsAgainst": 12,
            "qbPts": 3,
            "rbPts": 8,
            "wrPts": 2,
            "tePts": 14
          },
          "gamesPlayed": 2
        },
        {
          "teamId": "bomba12",
          "values": {
            "pointsFor": 144,
            "pointsAgainst": 98.04,
            "qbPts": 14.75,
            "rbPts": 24.5,
            "wrPts": 86.75,
            "tePts": 6.5
          },
          "ranks": {
            "pointsFor": 4,
            "pointsAgainst": 1,
            "qbPts": 8,
            "rbPts": 11,
            "wrPts": 1,
            "tePts": 13
          },
          "gamesPlayed": 2
        },
        {
          "teamId": "svennyg",
          "values": {
            "pointsFor": 114.18,
            "pointsAgainst": 167.56,
            "qbPts": 22.58,
            "rbPts": 37.35,
            "wrPts": 31.05,
            "tePts": 7.2
          },
          "ranks": {
            "pointsFor": 11,
            "pointsAgainst": 14,
            "qbPts": 4,
            "rbPts": 6,
            "wrPts": 12,
            "tePts": 12
          },
          "gamesPlayed": 2
        },
        {
          "teamId": "jiggydee2312",
          "values": {
            "pointsFor": 88.11,
            "pointsAgainst": 162.32,
            "qbPts": 13.31,
            "rbPts": 15.85,
            "wrPts": 22,
            "tePts": 24.95
          },
          "ranks": {
            "pointsFor": 13,
            "pointsAgainst": 13,
            "qbPts": 10,
            "rbPts": 13,
            "wrPts": 14,
            "tePts": 2
          },
          "gamesPlayed": 2
        },
        {
          "teamId": "dickvanhurik",
          "values": {
            "pointsFor": 158.33,
            "pointsAgainst": 98.05,
            "qbPts": 20.38,
            "rbPts": 40.15,
            "wrPts": 64.5,
            "tePts": 13.3
          },
          "ranks": {
            "pointsFor": 3,
            "pointsAgainst": 2,
            "qbPts": 7,
            "rbPts": 5,
            "wrPts": 4,
            "tePts": 6
          },
          "gamesPlayed": 2
        },
        {
          "teamId": "teambeermode",
          "values": {
            "pointsFor": 161.99,
            "pointsAgainst": 125.69,
            "qbPts": 21.44,
            "rbPts": 48.9,
            "wrPts": 68.6,
            "tePts": 12.55
          },
          "ranks": {
            "pointsFor": 2,
            "pointsAgainst": 6,
            "qbPts": 5,
            "rbPts": 4,
            "wrPts": 3,
            "tePts": 7
          },
          "gamesPlayed": 2
        },
        {
          "teamId": "dseinn",
          "values": {
            "pointsFor": 164.2,
            "pointsAgainst": 135.44,
            "qbPts": 12.35,
            "rbPts": 72.3,
            "wrPts": 54.5,
            "tePts": 18.05
          },
          "ranks": {
            "pointsFor": 1,
            "pointsAgainst": 11,
            "qbPts": 11,
            "rbPts": 1,
            "wrPts": 5,
            "tePts": 3
          },
          "gamesPlayed": 2
        },
        {
          "teamId": "giantmarv",
          "values": {
            "pointsFor": 124.45,
            "pointsAgainst": 133.26,
            "qbPts": 13.7,
            "rbPts": 30.4,
            "wrPts": 33.8,
            "tePts": 29.05
          },
          "ranks": {
            "pointsFor": 8,
            "pointsAgainst": 9,
            "qbPts": 9,
            "rbPts": 7,
            "wrPts": 10,
            "tePts": 1
          },
          "gamesPlayed": 2
        },
        {
          "teamId": "r4xon",
          "values": {
            "pointsFor": 143.24,
            "pointsAgainst": 105.78,
            "qbPts": 25.29,
            "rbPts": 50.55,
            "wrPts": 46.9,
            "tePts": 12.5
          },
          "ranks": {
            "pointsFor": 5,
            "pointsAgainst": 4,
            "qbPts": 2,
            "rbPts": 3,
            "wrPts": 7,
            "tePts": 8
          },
          "gamesPlayed": 2
        },
        {
          "teamId": "danfre",
          "values": {
            "pointsFor": 119.12,
            "pointsAgainst": 126.07,
            "qbPts": 12.07,
            "rbPts": 60.35,
            "wrPts": 24.7,
            "tePts": 13.5
          },
          "ranks": {
            "pointsFor": 10,
            "pointsAgainst": 7,
            "qbPts": 12,
            "rbPts": 2,
            "wrPts": 13,
            "tePts": 5
          },
          "gamesPlayed": 2
        },
        {
          "teamId": "unicornsruegen",
          "values": {
            "pointsFor": 111.09,
            "pointsAgainst": 135.14,
            "qbPts": 21.14,
            "rbPts": 24.8,
            "wrPts": 33.4,
            "tePts": 16.75
          },
          "ranks": {
            "pointsFor": 12,
            "pointsAgainst": 10,
            "qbPts": 6,
            "rbPts": 10,
            "wrPts": 11,
            "tePts": 4
          },
          "gamesPlayed": 2
        },
        {
          "teamId": "lovethecheesehead",
          "values": {
            "pointsFor": 71.25,
            "pointsAgainst": 125.1,
            "qbPts": 0,
            "rbPts": 7.5,
            "wrPts": 45.05,
            "tePts": 8.7
          },
          "ranks": {
            "pointsFor": 14,
            "pointsAgainst": 5,
            "qbPts": 14,
            "rbPts": 14,
            "wrPts": 8,
            "tePts": 11
          },
          "gamesPlayed": 2
        },
        {
          "teamId": "americagrizlies",
          "values": {
            "pointsFor": 129.34,
            "pointsAgainst": 132.79,
            "qbPts": 38.24,
            "rbPts": 18.4,
            "wrPts": 40.8,
            "tePts": 10.9
          },
          "ranks": {
            "pointsFor": 7,
            "pointsAgainst": 8,
            "qbPts": 1,
            "rbPts": 12,
            "wrPts": 9,
            "tePts": 10
          },
          "gamesPlayed": 2
        },
        {
          "teamId": "angryducks",
          "values": {
            "pointsFor": 121.63,
            "pointsAgainst": 101.5,
            "qbPts": 10.78,
            "rbPts": 26.9,
            "wrPts": 48.6,
            "tePts": 12.35
          },
          "ranks": {
            "pointsFor": 9,
            "pointsAgainst": 3,
            "qbPts": 13,
            "rbPts": 9,
            "wrPts": 6,
            "tePts": 9
          },
          "gamesPlayed": 2
        }
      ],
      "weekly": [
        {
          "teamId": "milchreis",
          "values": {
            "pointsFor": 125.32,
            "pointsAgainst": 155.56,
            "qbPts": 8.72,
            "rbPts": 23.7,
            "wrPts": 78.6,
            "tePts": 1.3
          },
          "ranks": {
            "pointsFor": 6,
            "pointsAgainst": 12,
            "qbPts": 12,
            "rbPts": 8,
            "wrPts": 3,
            "tePts": 14
          }
        },
        {
          "teamId": "bomba12",
          "values": {
            "pointsFor": 157.48,
            "pointsAgainst": 131.48,
            "qbPts": 28.98,
            "rbPts": 17.8,
            "wrPts": 84.2,
            "tePts": 3.5
          },
          "ranks": {
            "pointsFor": 2,
            "pointsAgainst": 10,
            "qbPts": 3,
            "rbPts": 11,
            "wrPts": 2,
            "tePts": 12
          }
        },
        {
          "teamId": "svennyg",
          "values": {
            "pointsFor": 114.96,
            "pointsAgainst": 138.2,
            "qbPts": 29.76,
            "rbPts": 35.5,
            "wrPts": 30.9,
            "tePts": 8.8
          },
          "ranks": {
            "pointsFor": 9,
            "pointsAgainst": 11,
            "qbPts": 2,
            "rbPts": 5,
            "wrPts": 11,
            "tePts": 9
          }
        },
        {
          "teamId": "jiggydee2312",
          "values": {
            "pointsFor": 85.4,
            "pointsAgainst": 165.1,
            "qbPts": 13.8,
            "rbPts": 15.5,
            "wrPts": 28.3,
            "tePts": 21.8
          },
          "ranks": {
            "pointsFor": 12,
            "pointsAgainst": 14,
            "qbPts": 10,
            "rbPts": 12,
            "wrPts": 12,
            "tePts": 3
          }
        },
        {
          "teamId": "dickvanhurik",
          "values": {
            "pointsFor": 165.1,
            "pointsAgainst": 85.4,
            "qbPts": 15.8,
            "rbPts": 37.7,
            "wrPts": 74.1,
            "tePts": 22.5
          },
          "ranks": {
            "pointsFor": 1,
            "pointsAgainst": 3,
            "qbPts": 8,
            "rbPts": 3,
            "wrPts": 4,
            "tePts": 2
          }
        },
        {
          "teamId": "teambeermode",
          "values": {
            "pointsFor": 155.56,
            "pointsAgainst": 125.32,
            "qbPts": 18.16,
            "rbPts": 37.1,
            "wrPts": 87.9,
            "tePts": 1.4
          },
          "ranks": {
            "pointsFor": 3,
            "pointsAgainst": 9,
            "qbPts": 6,
            "rbPts": 4,
            "wrPts": 1,
            "tePts": 13
          }
        },
        {
          "teamId": "dseinn",
          "values": {
            "pointsFor": 131.48,
            "pointsAgainst": 157.48,
            "qbPts": 24.08,
            "rbPts": 47.3,
            "wrPts": 45.8,
            "tePts": 8.3
          },
          "ranks": {
            "pointsFor": 5,
            "pointsAgainst": 13,
            "qbPts": 5,
            "rbPts": 2,
            "wrPts": 5,
            "tePts": 10
          }
        },
        {
          "teamId": "giantmarv",
          "values": {
            "pointsFor": 138.2,
            "pointsAgainst": 114.96,
            "qbPts": 0.8,
            "rbPts": 24.5,
            "wrPts": 44.5,
            "tePts": 45.4
          },
          "ranks": {
            "pointsFor": 4,
            "pointsAgainst": 6,
            "qbPts": 13,
            "rbPts": 7,
            "wrPts": 7,
            "tePts": 1
          }
        },
        {
          "teamId": "r4xon",
          "values": {
            "pointsFor": 119.68,
            "pointsAgainst": 77.9,
            "qbPts": 28.48,
            "rbPts": 34.4,
            "wrPts": 40.2,
            "tePts": 10.6
          },
          "ranks": {
            "pointsFor": 8,
            "pointsAgainst": 1,
            "qbPts": 4,
            "rbPts": 6,
            "wrPts": 9,
            "tePts": 7
          }
        },
        {
          "teamId": "danfre",
          "values": {
            "pointsFor": 112.18,
            "pointsAgainst": 83.72,
            "qbPts": 9.88,
            "rbPts": 63,
            "wrPts": 20.1,
            "tePts": 17.2
          },
          "ranks": {
            "pointsFor": 10,
            "pointsAgainst": 2,
            "qbPts": 11,
            "rbPts": 1,
            "wrPts": 14,
            "tePts": 5
          }
        },
        {
          "teamId": "unicornsruegen",
          "values": {
            "pointsFor": 98.78,
            "pointsAgainst": 125.02,
            "qbPts": 16.18,
            "rbPts": 21.5,
            "wrPts": 44.5,
            "tePts": 9.6
          },
          "ranks": {
            "pointsFor": 11,
            "pointsAgainst": 8,
            "qbPts": 7,
            "rbPts": 9,
            "wrPts": 8,
            "tePts": 8
          }
        },
        {
          "teamId": "lovethecheesehead",
          "values": {
            "pointsFor": 77.9,
            "pointsAgainst": 119.68,
            "qbPts": 0,
            "rbPts": 11,
            "wrPts": 45.5,
            "tePts": 17.4
          },
          "ranks": {
            "pointsFor": 14,
            "pointsAgainst": 7,
            "qbPts": 14,
            "rbPts": 14,
            "wrPts": 6,
            "tePts": 4
          }
        },
        {
          "teamId": "americagrizlies",
          "values": {
            "pointsFor": 125.02,
            "pointsAgainst": 98.78,
            "qbPts": 40.82,
            "rbPts": 19.8,
            "wrPts": 31.4,
            "tePts": 7
          },
          "ranks": {
            "pointsFor": 7,
            "pointsAgainst": 4,
            "qbPts": 1,
            "rbPts": 10,
            "wrPts": 10,
            "tePts": 11
          }
        },
        {
          "teamId": "angryducks",
          "values": {
            "pointsFor": 83.72,
            "pointsAgainst": 112.18,
            "qbPts": 15.12,
            "rbPts": 14.9,
            "wrPts": 25.3,
            "tePts": 14.4
          },
          "ranks": {
            "pointsFor": 13,
            "pointsAgainst": 5,
            "qbPts": 9,
            "rbPts": 13,
            "wrPts": 13,
            "tePts": 6
          }
        }
      ]
    },
    "3": {
      "cumulative": [
        {
          "teamId": "milchreis",
          "values": {
            "pointsFor": 149.19,
            "pointsAgainst": 140.77,
            "qbPts": 22.73,
            "rbPts": 27.53,
            "wrPts": 74.95,
            "tePts": 9.63
          },
          "ranks": {
            "pointsFor": 5,
            "pointsAgainst": 11,
            "qbPts": 3,
            "rbPts": 7,
            "wrPts": 2,
            "tePts": 10
          },
          "gamesPlayed": 3
        },
        {
          "teamId": "bomba12",
          "values": {
            "pointsFor": 141.61,
            "pointsAgainst": 107.95,
            "qbPts": 15.48,
            "rbPts": 25.73,
            "wrPts": 78.53,
            "tePts": 6.53
          },
          "ranks": {
            "pointsFor": 6,
            "pointsAgainst": 3,
            "qbPts": 10,
            "rbPts": 9,
            "wrPts": 1,
            "tePts": 13
          },
          "gamesPlayed": 3
        },
        {
          "teamId": "svennyg",
          "values": {
            "pointsFor": 113.37,
            "pointsAgainst": 155.79,
            "qbPts": 21.37,
            "rbPts": 29.77,
            "wrPts": 35.23,
            "tePts": 7.67
          },
          "ranks": {
            "pointsFor": 11,
            "pointsAgainst": 13,
            "qbPts": 5,
            "rbPts": 6,
            "wrPts": 10,
            "tePts": 12
          },
          "gamesPlayed": 3
        },
        {
          "teamId": "jiggydee2312",
          "values": {
            "pointsFor": 93.19,
            "pointsAgainst": 156.41,
            "qbPts": 10.79,
            "rbPts": 19.47,
            "wrPts": 19.97,
            "tePts": 29.97
          },
          "ranks": {
            "pointsFor": 13,
            "pointsAgainst": 14,
            "qbPts": 13,
            "rbPts": 12,
            "wrPts": 14,
            "tePts": 2
          },
          "gamesPlayed": 3
        },
        {
          "teamId": "dickvanhurik",
          "values": {
            "pointsFor": 149.63,
            "pointsAgainst": 102.61,
            "qbPts": 20.4,
            "rbPts": 38.4,
            "wrPts": 65.37,
            "tePts": 10.13
          },
          "ranks": {
            "pointsFor": 4,
            "pointsAgainst": 2,
            "qbPts": 6,
            "rbPts": 5,
            "wrPts": 4,
            "tePts": 9
          },
          "gamesPlayed": 3
        },
        {
          "teamId": "teambeermode",
          "values": {
            "pointsFor": 154.9,
            "pointsAgainst": 113.65,
            "qbPts": 18.83,
            "rbPts": 43.47,
            "wrPts": 71,
            "tePts": 12.6
          },
          "ranks": {
            "pointsFor": 1,
            "pointsAgainst": 4,
            "qbPts": 7,
            "rbPts": 4,
            "wrPts": 3,
            "tePts": 7
          },
          "gamesPlayed": 3
        },
        {
          "teamId": "dseinn",
          "values": {
            "pointsFor": 154.85,
            "pointsAgainst": 148.95,
            "qbPts": 13.11,
            "rbPts": 77.37,
            "wrPts": 42.67,
            "tePts": 14.03
          },
          "ranks": {
            "pointsFor": 2,
            "pointsAgainst": 12,
            "qbPts": 11,
            "rbPts": 1,
            "wrPts": 7,
            "tePts": 5
          },
          "gamesPlayed": 3
        },
        {
          "teamId": "giantmarv",
          "values": {
            "pointsFor": 125.56,
            "pointsAgainst": 134.45,
            "qbPts": 13.03,
            "rbPts": 26.73,
            "wrPts": 32.3,
            "tePts": 35.83
          },
          "ranks": {
            "pointsFor": 9,
            "pointsAgainst": 9,
            "qbPts": 12,
            "rbPts": 8,
            "wrPts": 13,
            "tePts": 1
          },
          "gamesPlayed": 3
        },
        {
          "teamId": "r4xon",
          "values": {
            "pointsFor": 154.15,
            "pointsAgainst": 115.9,
            "qbPts": 27.29,
            "rbPts": 49.67,
            "wrPts": 50.1,
            "tePts": 16.1
          },
          "ranks": {
            "pointsFor": 3,
            "pointsAgainst": 5,
            "qbPts": 2,
            "rbPts": 3,
            "wrPts": 6,
            "tePts": 3
          },
          "gamesPlayed": 3
        },
        {
          "teamId": "danfre",
          "values": {
            "pointsFor": 127.61,
            "pointsAgainst": 118.5,
            "qbPts": 16.31,
            "rbPts": 53.47,
            "wrPts": 34.2,
            "tePts": 11.97
          },
          "ranks": {
            "pointsFor": 8,
            "pointsAgainst": 7,
            "qbPts": 8,
            "rbPts": 2,
            "wrPts": 11,
            "tePts": 8
          },
          "gamesPlayed": 3
        },
        {
          "teamId": "unicornsruegen",
          "values": {
            "pointsFor": 109.12,
            "pointsAgainst": 97.73,
            "qbPts": 21.62,
            "rbPts": 25.57,
            "wrPts": 34,
            "tePts": 14.27
          },
          "ranks": {
            "pointsFor": 12,
            "pointsAgainst": 1,
            "qbPts": 4,
            "rbPts": 10,
            "wrPts": 12,
            "tePts": 4
          },
          "gamesPlayed": 3
        },
        {
          "teamId": "lovethecheesehead",
          "values": {
            "pointsFor": 55.13,
            "pointsAgainst": 118.46,
            "qbPts": 0,
            "rbPts": 5,
            "wrPts": 36.03,
            "tePts": 6.43
          },
          "ranks": {
            "pointsFor": 14,
            "pointsAgainst": 6,
            "qbPts": 14,
            "rbPts": 14,
            "wrPts": 9,
            "tePts": 14
          },
          "gamesPlayed": 3
        },
        {
          "teamId": "americagrizlies",
          "values": {
            "pointsFor": 116.08,
            "pointsAgainst": 135.43,
            "qbPts": 31.98,
            "rbPts": 17.37,
            "wrPts": 37.3,
            "tePts": 7.77
          },
          "ranks": {
            "pointsFor": 10,
            "pointsAgainst": 10,
            "qbPts": 1,
            "rbPts": 13,
            "wrPts": 8,
            "tePts": 11
          },
          "gamesPlayed": 3
        },
        {
          "teamId": "angryducks",
          "values": {
            "pointsFor": 128.87,
            "pointsAgainst": 126.66,
            "qbPts": 15.57,
            "rbPts": 24.93,
            "wrPts": 54.9,
            "tePts": 13.13
          },
          "ranks": {
            "pointsFor": 7,
            "pointsAgainst": 8,
            "qbPts": 9,
            "rbPts": 11,
            "wrPts": 5,
            "tePts": 6
          },
          "gamesPlayed": 3
        }
      ],
      "weekly": [
        {
          "teamId": "milchreis",
          "values": {
            "pointsFor": 176.98,
            "pointsAgainst": 143.34,
            "qbPts": 22.22,
            "rbPts": 25,
            "wrPts": 82.16,
            "tePts": 27.6
          },
          "ranks": {
            "pointsFor": 1,
            "pointsAgainst": 11,
            "qbPts": 5,
            "rbPts": 9,
            "wrPts": 1,
            "tePts": 3
          }
        },
        {
          "teamId": "bomba12",
          "values": {
            "pointsFor": 136.84,
            "pointsAgainst": 127.78,
            "qbPts": 16.94,
            "rbPts": 28.2,
            "wrPts": 62.1,
            "tePts": 6.6
          },
          "ranks": {
            "pointsFor": 6,
            "pointsAgainst": 6,
            "qbPts": 9,
            "rbPts": 6,
            "wrPts": 5,
            "tePts": 10
          }
        },
        {
          "teamId": "svennyg",
          "values": {
            "pointsFor": 111.74,
            "pointsAgainst": 132.24,
            "qbPts": 18.94,
            "rbPts": 14.6,
            "wrPts": 43.6,
            "tePts": 8.6
          },
          "ranks": {
            "pointsFor": 10,
            "pointsAgainst": 7,
            "qbPts": 8,
            "rbPts": 13,
            "wrPts": 8,
            "tePts": 9
          }
        },
        {
          "teamId": "jiggydee2312",
          "values": {
            "pointsFor": 103.36,
            "pointsAgainst": 144.6,
            "qbPts": 5.76,
            "rbPts": 26.7,
            "wrPts": 15.9,
            "tePts": 40
          },
          "ranks": {
            "pointsFor": 12,
            "pointsAgainst": 12,
            "qbPts": 13,
            "rbPts": 8,
            "wrPts": 14,
            "tePts": 2
          }
        },
        {
          "teamId": "dickvanhurik",
          "values": {
            "pointsFor": 132.24,
            "pointsAgainst": 111.74,
            "qbPts": 20.44,
            "rbPts": 34.9,
            "wrPts": 67.1,
            "tePts": 3.8
          },
          "ranks": {
            "pointsFor": 8,
            "pointsAgainst": 5,
            "qbPts": 6,
            "rbPts": 4,
            "wrPts": 4,
            "tePts": 12
          }
        },
        {
          "teamId": "teambeermode",
          "values": {
            "pointsFor": 140.72,
            "pointsAgainst": 89.56,
            "qbPts": 13.62,
            "rbPts": 32.6,
            "wrPts": 75.8,
            "tePts": 12.7
          },
          "ranks": {
            "pointsFor": 5,
            "pointsAgainst": 2,
            "qbPts": 11,
            "rbPts": 5,
            "wrPts": 2,
            "tePts": 6
          }
        },
        {
          "teamId": "dseinn",
          "values": {
            "pointsFor": 136.14,
            "pointsAgainst": 175.98,
            "qbPts": 14.64,
            "rbPts": 87.5,
            "wrPts": 19,
            "tePts": 6
          },
          "ranks": {
            "pointsFor": 7,
            "pointsAgainst": 13,
            "qbPts": 10,
            "rbPts": 1,
            "wrPts": 12,
            "tePts": 11
          }
        },
        {
          "teamId": "giantmarv",
          "values": {
            "pointsFor": 127.78,
            "pointsAgainst": 136.84,
            "qbPts": 11.68,
            "rbPts": 19.4,
            "wrPts": 29.3,
            "tePts": 49.4
          },
          "ranks": {
            "pointsFor": 9,
            "pointsAgainst": 9,
            "qbPts": 12,
            "rbPts": 11,
            "wrPts": 11,
            "tePts": 1
          }
        },
        {
          "teamId": "r4xon",
          "values": {
            "pointsFor": 175.98,
            "pointsAgainst": 136.14,
            "qbPts": 31.28,
            "rbPts": 47.9,
            "wrPts": 56.5,
            "tePts": 23.3
          },
          "ranks": {
            "pointsFor": 2,
            "pointsAgainst": 8,
            "qbPts": 1,
            "rbPts": 2,
            "wrPts": 6,
            "tePts": 4
          }
        },
        {
          "teamId": "danfre",
          "values": {
            "pointsFor": 144.6,
            "pointsAgainst": 103.36,
            "qbPts": 24.8,
            "rbPts": 39.7,
            "wrPts": 53.2,
            "tePts": 8.9
          },
          "ranks": {
            "pointsFor": 3,
            "pointsAgainst": 3,
            "qbPts": 3,
            "rbPts": 3,
            "wrPts": 7,
            "tePts": 8
          }
        },
        {
          "teamId": "unicornsruegen",
          "values": {
            "pointsFor": 105.18,
            "pointsAgainst": 22.9,
            "qbPts": 22.58,
            "rbPts": 27.1,
            "wrPts": 35.2,
            "tePts": 9.3
          },
          "ranks": {
            "pointsFor": 11,
            "pointsAgainst": 1,
            "qbPts": 4,
            "rbPts": 7,
            "wrPts": 9,
            "tePts": 7
          }
        },
        {
          "teamId": "lovethecheesehead",
          "values": {
            "pointsFor": 22.9,
            "pointsAgainst": 105.18,
            "qbPts": 0,
            "rbPts": 0,
            "wrPts": 18,
            "tePts": 1.9
          },
          "ranks": {
            "pointsFor": 14,
            "pointsAgainst": 4,
            "qbPts": 14,
            "rbPts": 14,
            "wrPts": 13,
            "tePts": 13
          }
        },
        {
          "teamId": "americagrizlies",
          "values": {
            "pointsFor": 89.56,
            "pointsAgainst": 140.72,
            "qbPts": 19.46,
            "rbPts": 15.3,
            "wrPts": 30.3,
            "tePts": 1.5
          },
          "ranks": {
            "pointsFor": 13,
            "pointsAgainst": 10,
            "qbPts": 7,
            "rbPts": 12,
            "wrPts": 10,
            "tePts": 14
          }
        },
        {
          "teamId": "angryducks",
          "values": {
            "pointsFor": 143.34,
            "pointsAgainst": 176.98,
            "qbPts": 25.14,
            "rbPts": 21,
            "wrPts": 67.5,
            "tePts": 14.7
          },
          "ranks": {
            "pointsFor": 4,
            "pointsAgainst": 14,
            "qbPts": 2,
            "rbPts": 10,
            "wrPts": 3,
            "tePts": 5
          }
        }
      ]
    },
    "4": {
      "cumulative": [
        {
          "teamId": "milchreis",
          "values": {
            "pointsFor": 137.36,
            "pointsAgainst": 142.59,
            "qbPts": 22.95,
            "rbPts": 23.33,
            "wrPts": 63.04,
            "tePts": 15.3
          },
          "ranks": {
            "pointsFor": 6,
            "pointsAgainst": 12,
            "qbPts": 3,
            "rbPts": 10,
            "wrPts": 3,
            "tePts": 5
          },
          "gamesPlayed": 4
        },
        {
          "teamId": "bomba12",
          "values": {
            "pointsFor": 157.94,
            "pointsAgainst": 126.06,
            "qbPts": 15.86,
            "rbPts": 32.53,
            "wrPts": 85.53,
            "tePts": 9.03
          },
          "ranks": {
            "pointsFor": 2,
            "pointsAgainst": 7,
            "qbPts": 9,
            "rbPts": 6,
            "wrPts": 1,
            "tePts": 11
          },
          "gamesPlayed": 4
        },
        {
          "teamId": "svennyg",
          "values": {
            "pointsFor": 108.8,
            "pointsAgainst": 143.71,
            "qbPts": 20.55,
            "rbPts": 27.17,
            "wrPts": 35.65,
            "tePts": 7.68
          },
          "ranks": {
            "pointsFor": 12,
            "pointsAgainst": 13,
            "qbPts": 5,
            "rbPts": 8,
            "wrPts": 9,
            "tePts": 13
          },
          "gamesPlayed": 4
        },
        {
          "teamId": "jiggydee2312",
          "values": {
            "pointsFor": 96.76,
            "pointsAgainst": 141.09,
            "qbPts": 14.89,
            "rbPts": 19.75,
            "wrPts": 21.13,
            "tePts": 25
          },
          "ranks": {
            "pointsFor": 13,
            "pointsAgainst": 11,
            "qbPts": 13,
            "rbPts": 12,
            "wrPts": 14,
            "tePts": 2
          },
          "gamesPlayed": 4
        },
        {
          "teamId": "dickvanhurik",
          "values": {
            "pointsFor": 157.32,
            "pointsAgainst": 128.69,
            "qbPts": 20.02,
            "rbPts": 45.7,
            "wrPts": 62.65,
            "tePts": 10.95
          },
          "ranks": {
            "pointsFor": 3,
            "pointsAgainst": 8,
            "qbPts": 6,
            "rbPts": 4,
            "wrPts": 4,
            "tePts": 10
          },
          "gamesPlayed": 4
        },
        {
          "teamId": "teambeermode",
          "values": {
            "pointsFor": 153.33,
            "pointsAgainst": 100.24,
            "qbPts": 17.51,
            "rbPts": 42.28,
            "wrPts": 68.85,
            "tePts": 12.7
          },
          "ranks": {
            "pointsFor": 5,
            "pointsAgainst": 1,
            "qbPts": 7,
            "rbPts": 5,
            "wrPts": 2,
            "tePts": 8
          },
          "gamesPlayed": 4
        },
        {
          "teamId": "dseinn",
          "values": {
            "pointsFor": 162.67,
            "pointsAgainst": 145.9,
            "qbPts": 15.2,
            "rbPts": 76.05,
            "wrPts": 45.75,
            "tePts": 13.93
          },
          "ranks": {
            "pointsFor": 1,
            "pointsAgainst": 14,
            "qbPts": 11,
            "rbPts": 1,
            "wrPts": 7,
            "tePts": 7
          },
          "gamesPlayed": 4
        },
        {
          "teamId": "giantmarv",
          "values": {
            "pointsFor": 126.57,
            "pointsAgainst": 138.97,
            "qbPts": 15.54,
            "rbPts": 28.73,
            "wrPts": 32.65,
            "tePts": 33.65
          },
          "ranks": {
            "pointsFor": 9,
            "pointsAgainst": 10,
            "qbPts": 10,
            "rbPts": 7,
            "wrPts": 11,
            "tePts": 1
          },
          "gamesPlayed": 4
        },
        {
          "teamId": "r4xon",
          "values": {
            "pointsFor": 153.75,
            "pointsAgainst": 119.32,
            "qbPts": 25.37,
            "rbPts": 52.28,
            "wrPts": 50.55,
            "tePts": 15.05
          },
          "ranks": {
            "pointsFor": 4,
            "pointsAgainst": 3,
            "qbPts": 2,
            "rbPts": 3,
            "wrPts": 6,
            "tePts": 6
          },
          "gamesPlayed": 4
        },
        {
          "teamId": "danfre",
          "values": {
            "pointsFor": 132.72,
            "pointsAgainst": 114.35,
            "qbPts": 16.22,
            "rbPts": 54.55,
            "wrPts": 31.7,
            "tePts": 16.5
          },
          "ranks": {
            "pointsFor": 7,
            "pointsAgainst": 2,
            "qbPts": 8,
            "rbPts": 2,
            "wrPts": 12,
            "tePts": 4
          },
          "gamesPlayed": 4
        },
        {
          "teamId": "unicornsruegen",
          "values": {
            "pointsFor": 116.02,
            "pointsAgainst": 119.83,
            "qbPts": 22.65,
            "rbPts": 22.98,
            "wrPts": 33.35,
            "tePts": 21.05
          },
          "ranks": {
            "pointsFor": 10,
            "pointsAgainst": 5,
            "qbPts": 4,
            "rbPts": 11,
            "wrPts": 10,
            "tePts": 3
          },
          "gamesPlayed": 4
        },
        {
          "teamId": "lovethecheesehead",
          "values": {
            "pointsFor": 56.35,
            "pointsAgainst": 126,
            "qbPts": 0,
            "rbPts": 10.55,
            "wrPts": 30.63,
            "tePts": 6.17
          },
          "ranks": {
            "pointsFor": 14,
            "pointsAgainst": 6,
            "qbPts": 14,
            "rbPts": 14,
            "wrPts": 13,
            "tePts": 14
          },
          "gamesPlayed": 4
        },
        {
          "teamId": "americagrizlies",
          "values": {
            "pointsFor": 111.74,
            "pointsAgainst": 135.44,
            "qbPts": 28.87,
            "rbPts": 14.75,
            "wrPts": 40.25,
            "tePts": 8.63
          },
          "ranks": {
            "pointsFor": 11,
            "pointsAgainst": 9,
            "qbPts": 1,
            "rbPts": 13,
            "wrPts": 8,
            "tePts": 12
          },
          "gamesPlayed": 4
        },
        {
          "teamId": "angryducks",
          "values": {
            "pointsFor": 130.52,
            "pointsAgainst": 119.68,
            "qbPts": 15.07,
            "rbPts": 23.98,
            "wrPts": 59.35,
            "tePts": 12.13
          },
          "ranks": {
            "pointsFor": 8,
            "pointsAgainst": 4,
            "qbPts": 12,
            "rbPts": 9,
            "wrPts": 5,
            "tePts": 9
          },
          "gamesPlayed": 4
        }
      ],
      "weekly": [
        {
          "teamId": "milchreis",
          "values": {
            "pointsFor": 101.9,
            "pointsAgainst": 148.04,
            "qbPts": 23.6,
            "rbPts": 10.7,
            "wrPts": 27.3,
            "tePts": 32.3
          },
          "ranks": {
            "pointsFor": 11,
            "pointsAgainst": 9,
            "qbPts": 3,
            "rbPts": 13,
            "wrPts": 11,
            "tePts": 2
          }
        },
        {
          "teamId": "bomba12",
          "values": {
            "pointsFor": 206.9,
            "pointsAgainst": 180.38,
            "qbPts": 17,
            "rbPts": 52.9,
            "wrPts": 106.5,
            "tePts": 16.5
          },
          "ranks": {
            "pointsFor": 1,
            "pointsAgainst": 12,
            "qbPts": 10,
            "rbPts": 5,
            "wrPts": 1,
            "tePts": 5
          }
        },
        {
          "teamId": "svennyg",
          "values": {
            "pointsFor": 95.1,
            "pointsAgainst": 107.46,
            "qbPts": 18.1,
            "rbPts": 19.4,
            "wrPts": 36.9,
            "tePts": 7.7
          },
          "ranks": {
            "pointsFor": 13,
            "pointsAgainst": 5,
            "qbPts": 9,
            "rbPts": 11,
            "wrPts": 8,
            "tePts": 13
          }
        },
        {
          "teamId": "jiggydee2312",
          "values": {
            "pointsFor": 107.46,
            "pointsAgainst": 95.1,
            "qbPts": 27.16,
            "rbPts": 20.6,
            "wrPts": 24.6,
            "tePts": 10.1
          },
          "ranks": {
            "pointsFor": 10,
            "pointsAgainst": 2,
            "qbPts": 1,
            "rbPts": 10,
            "wrPts": 12,
            "tePts": 11
          }
        },
        {
          "teamId": "dickvanhurik",
          "values": {
            "pointsFor": 180.38,
            "pointsAgainst": 206.9,
            "qbPts": 18.88,
            "rbPts": 67.6,
            "wrPts": 54.5,
            "tePts": 13.4
          },
          "ranks": {
            "pointsFor": 3,
            "pointsAgainst": 14,
            "qbPts": 8,
            "rbPts": 2,
            "wrPts": 5,
            "tePts": 7
          }
        },
        {
          "teamId": "teambeermode",
          "values": {
            "pointsFor": 148.62,
            "pointsAgainst": 60,
            "qbPts": 13.52,
            "rbPts": 38.7,
            "wrPts": 62.4,
            "tePts": 13
          },
          "ranks": {
            "pointsFor": 5,
            "pointsAgainst": 1,
            "qbPts": 13,
            "rbPts": 6,
            "wrPts": 3,
            "tePts": 8
          }
        },
        {
          "teamId": "dseinn",
          "values": {
            "pointsFor": 186.16,
            "pointsAgainst": 136.72,
            "qbPts": 21.46,
            "rbPts": 72.1,
            "wrPts": 55,
            "tePts": 13.6
          },
          "ranks": {
            "pointsFor": 2,
            "pointsAgainst": 8,
            "qbPts": 5,
            "rbPts": 1,
            "wrPts": 4,
            "tePts": 6
          }
        },
        {
          "teamId": "giantmarv",
          "values": {
            "pointsFor": 129.58,
            "pointsAgainst": 152.52,
            "qbPts": 23.08,
            "rbPts": 34.7,
            "wrPts": 33.7,
            "tePts": 27.1
          },
          "ranks": {
            "pointsFor": 9,
            "pointsAgainst": 11,
            "qbPts": 4,
            "rbPts": 7,
            "wrPts": 9,
            "tePts": 4
          }
        },
        {
          "teamId": "r4xon",
          "values": {
            "pointsFor": 152.52,
            "pointsAgainst": 129.58,
            "qbPts": 19.62,
            "rbPts": 60.1,
            "wrPts": 51.9,
            "tePts": 11.9
          },
          "ranks": {
            "pointsFor": 4,
            "pointsAgainst": 6,
            "qbPts": 6,
            "rbPts": 3,
            "wrPts": 6,
            "tePts": 9
          }
        },
        {
          "teamId": "danfre",
          "values": {
            "pointsFor": 148.04,
            "pointsAgainst": 101.9,
            "qbPts": 15.94,
            "rbPts": 57.8,
            "wrPts": 24.2,
            "tePts": 30.1
          },
          "ranks": {
            "pointsFor": 6,
            "pointsAgainst": 4,
            "qbPts": 11,
            "rbPts": 4,
            "wrPts": 13,
            "tePts": 3
          }
        },
        {
          "teamId": "unicornsruegen",
          "values": {
            "pointsFor": 136.72,
            "pointsAgainst": 186.16,
            "qbPts": 25.72,
            "rbPts": 15.2,
            "wrPts": 31.4,
            "tePts": 41.4
          },
          "ranks": {
            "pointsFor": 7,
            "pointsAgainst": 13,
            "qbPts": 2,
            "rbPts": 12,
            "wrPts": 10,
            "tePts": 1
          }
        },
        {
          "teamId": "lovethecheesehead",
          "values": {
            "pointsFor": 60,
            "pointsAgainst": 148.62,
            "qbPts": 0,
            "rbPts": 27.2,
            "wrPts": 14.4,
            "tePts": 5.4
          },
          "ranks": {
            "pointsFor": 14,
            "pointsAgainst": 10,
            "qbPts": 14,
            "rbPts": 8,
            "wrPts": 14,
            "tePts": 14
          }
        },
        {
          "teamId": "americagrizlies",
          "values": {
            "pointsFor": 98.72,
            "pointsAgainst": 135.46,
            "qbPts": 19.52,
            "rbPts": 6.9,
            "wrPts": 49.1,
            "tePts": 11.2
          },
          "ranks": {
            "pointsFor": 12,
            "pointsAgainst": 7,
            "qbPts": 7,
            "rbPts": 14,
            "wrPts": 7,
            "tePts": 10
          }
        },
        {
          "teamId": "angryducks",
          "values": {
            "pointsFor": 135.46,
            "pointsAgainst": 98.72,
            "qbPts": 13.56,
            "rbPts": 21.1,
            "wrPts": 72.7,
            "tePts": 9.1
          },
          "ranks": {
            "pointsFor": 8,
            "pointsAgainst": 3,
            "qbPts": 12,
            "rbPts": 9,
            "wrPts": 2,
            "tePts": 12
          }
        }
      ]
    },
    "5": {
      "cumulative": [
        {
          "teamId": "milchreis",
          "values": {
            "pointsFor": 139.78,
            "pointsAgainst": 137.32,
            "qbPts": 24.81,
            "rbPts": 21.74,
            "wrPts": 61.21,
            "tePts": 17.62
          },
          "ranks": {
            "pointsFor": 6,
            "pointsAgainst": 10,
            "qbPts": 2,
            "rbPts": 11,
            "wrPts": 4,
            "tePts": 5
          },
          "gamesPlayed": 5
        },
        {
          "teamId": "bomba12",
          "values": {
            "pointsFor": 152.51,
            "pointsAgainst": 124.36,
            "qbPts": 14.75,
            "rbPts": 33.42,
            "wrPts": 78.6,
            "tePts": 9.54
          },
          "ranks": {
            "pointsFor": 3,
            "pointsAgainst": 5,
            "qbPts": 11,
            "rbPts": 6,
            "wrPts": 1,
            "tePts": 12
          },
          "gamesPlayed": 5
        },
        {
          "teamId": "svennyg",
          "values": {
            "pointsFor": 110.55,
            "pointsAgainst": 141.12,
            "qbPts": 19.37,
            "rbPts": 30.18,
            "wrPts": 34.56,
            "tePts": 7.24
          },
          "ranks": {
            "pointsFor": 12,
            "pointsAgainst": 13,
            "qbPts": 6,
            "rbPts": 8,
            "wrPts": 10,
            "tePts": 13
          },
          "gamesPlayed": 5
        },
        {
          "teamId": "jiggydee2312",
          "values": {
            "pointsFor": 100.66,
            "pointsAgainst": 142.76,
            "qbPts": 19.8,
            "rbPts": 18.54,
            "wrPts": 22.74,
            "tePts": 24.38
          },
          "ranks": {
            "pointsFor": 13,
            "pointsAgainst": 14,
            "qbPts": 5,
            "rbPts": 12,
            "wrPts": 14,
            "tePts": 2
          },
          "gamesPlayed": 5
        },
        {
          "teamId": "dickvanhurik",
          "values": {
            "pointsFor": 146.5,
            "pointsAgainst": 139.56,
            "qbPts": 18.9,
            "rbPts": 44.16,
            "wrPts": 55.86,
            "tePts": 9.78
          },
          "ranks": {
            "pointsFor": 4,
            "pointsAgainst": 11,
            "qbPts": 7,
            "rbPts": 4,
            "wrPts": 6,
            "tePts": 10
          },
          "gamesPlayed": 5
        },
        {
          "teamId": "teambeermode",
          "values": {
            "pointsFor": 145.5,
            "pointsAgainst": 112.68,
            "qbPts": 16.6,
            "rbPts": 38.54,
            "wrPts": 61.72,
            "tePts": 11.64
          },
          "ranks": {
            "pointsFor": 5,
            "pointsAgainst": 2,
            "qbPts": 9,
            "rbPts": 5,
            "wrPts": 2,
            "tePts": 9
          },
          "gamesPlayed": 5
        },
        {
          "teamId": "dseinn",
          "values": {
            "pointsFor": 162.63,
            "pointsAgainst": 139.56,
            "qbPts": 15.81,
            "rbPts": 75.14,
            "wrPts": 40.26,
            "tePts": 17.62
          },
          "ranks": {
            "pointsFor": 1,
            "pointsAgainst": 12,
            "qbPts": 10,
            "rbPts": 1,
            "wrPts": 8,
            "tePts": 6
          },
          "gamesPlayed": 5
        },
        {
          "teamId": "giantmarv",
          "values": {
            "pointsFor": 131.2,
            "pointsAgainst": 136.4,
            "qbPts": 16.62,
            "rbPts": 32.22,
            "wrPts": 36.18,
            "tePts": 29.38
          },
          "ranks": {
            "pointsFor": 7,
            "pointsAgainst": 9,
            "qbPts": 8,
            "rbPts": 7,
            "wrPts": 9,
            "tePts": 1
          },
          "gamesPlayed": 5
        },
        {
          "teamId": "r4xon",
          "values": {
            "pointsFor": 159.61,
            "pointsAgainst": 116.1,
            "qbPts": 23.73,
            "rbPts": 51.32,
            "wrPts": 59.8,
            "tePts": 13.16
          },
          "ranks": {
            "pointsFor": 2,
            "pointsAgainst": 3,
            "qbPts": 3,
            "rbPts": 2,
            "wrPts": 5,
            "tePts": 8
          },
          "gamesPlayed": 5
        },
        {
          "teamId": "danfre",
          "values": {
            "pointsFor": 128.2,
            "pointsAgainst": 119.94,
            "qbPts": 13.34,
            "rbPts": 50.74,
            "wrPts": 29.92,
            "tePts": 20.2
          },
          "ranks": {
            "pointsFor": 9,
            "pointsAgainst": 4,
            "qbPts": 13,
            "rbPts": 3,
            "wrPts": 12,
            "tePts": 3
          },
          "gamesPlayed": 5
        },
        {
          "teamId": "unicornsruegen",
          "values": {
            "pointsFor": 118.04,
            "pointsAgainst": 125.82,
            "qbPts": 23.04,
            "rbPts": 25.52,
            "wrPts": 30.14,
            "tePts": 19.94
          },
          "ranks": {
            "pointsFor": 10,
            "pointsAgainst": 7,
            "qbPts": 4,
            "rbPts": 9,
            "wrPts": 11,
            "tePts": 4
          },
          "gamesPlayed": 5
        },
        {
          "teamId": "lovethecheesehead",
          "values": {
            "pointsFor": 54.9,
            "pointsAgainst": 124.72,
            "qbPts": 0,
            "rbPts": 12.8,
            "wrPts": 28.96,
            "tePts": 4.94
          },
          "ranks": {
            "pointsFor": 14,
            "pointsAgainst": 6,
            "qbPts": 14,
            "rbPts": 14,
            "wrPts": 13,
            "tePts": 14
          },
          "gamesPlayed": 5
        },
        {
          "teamId": "americagrizlies",
          "values": {
            "pointsFor": 117.85,
            "pointsAgainst": 130.38,
            "qbPts": 29.39,
            "rbPts": 15.92,
            "wrPts": 43.56,
            "tePts": 9.58
          },
          "ranks": {
            "pointsFor": 11,
            "pointsAgainst": 8,
            "qbPts": 1,
            "rbPts": 13,
            "wrPts": 7,
            "tePts": 11
          },
          "gamesPlayed": 5
        },
        {
          "teamId": "angryducks",
          "values": {
            "pointsFor": 128.34,
            "pointsAgainst": 105.56,
            "qbPts": 13.64,
            "rbPts": 23.14,
            "wrPts": 61.38,
            "tePts": 13.98
          },
          "ranks": {
            "pointsFor": 8,
            "pointsAgainst": 1,
            "qbPts": 12,
            "rbPts": 10,
            "wrPts": 3,
            "tePts": 7
          },
          "gamesPlayed": 5
        }
      ],
      "weekly": [
        {
          "teamId": "milchreis",
          "values": {
            "pointsFor": 149.46,
            "pointsAgainst": 116.26,
            "qbPts": 32.26,
            "rbPts": 15.4,
            "wrPts": 53.9,
            "tePts": 26.9
          },
          "ranks": {
            "pointsFor": 4,
            "pointsAgainst": 5,
            "qbPts": 2,
            "rbPts": 13,
            "wrPts": 4,
            "tePts": 3
          }
        },
        {
          "teamId": "bomba12",
          "values": {
            "pointsFor": 130.8,
            "pointsAgainst": 117.54,
            "qbPts": 10.3,
            "rbPts": 37,
            "wrPts": 50.9,
            "tePts": 11.6
          },
          "ranks": {
            "pointsFor": 6,
            "pointsAgainst": 6,
            "qbPts": 11,
            "rbPts": 6,
            "wrPts": 5,
            "tePts": 9
          }
        },
        {
          "teamId": "svennyg",
          "values": {
            "pointsFor": 117.54,
            "pointsAgainst": 130.8,
            "qbPts": 14.64,
            "rbPts": 42.2,
            "wrPts": 30.2,
            "tePts": 5.5
          },
          "ranks": {
            "pointsFor": 9,
            "pointsAgainst": 9,
            "qbPts": 8,
            "rbPts": 4,
            "wrPts": 8,
            "tePts": 12
          }
        },
        {
          "teamId": "jiggydee2312",
          "values": {
            "pointsFor": 116.26,
            "pointsAgainst": 149.46,
            "qbPts": 39.46,
            "rbPts": 13.7,
            "wrPts": 29.2,
            "tePts": 21.9
          },
          "ranks": {
            "pointsFor": 10,
            "pointsAgainst": 11,
            "qbPts": 1,
            "rbPts": 14,
            "wrPts": 9,
            "tePts": 4
          }
        },
        {
          "teamId": "dickvanhurik",
          "values": {
            "pointsFor": 103.2,
            "pointsAgainst": 183.06,
            "qbPts": 14.4,
            "rbPts": 38,
            "wrPts": 28.7,
            "tePts": 5.1
          },
          "ranks": {
            "pointsFor": 13,
            "pointsAgainst": 14,
            "qbPts": 9,
            "rbPts": 5,
            "wrPts": 10,
            "tePts": 13
          }
        },
        {
          "teamId": "teambeermode",
          "values": {
            "pointsFor": 114.2,
            "pointsAgainst": 162.46,
            "qbPts": 13,
            "rbPts": 23.6,
            "wrPts": 33.2,
            "tePts": 7.4
          },
          "ranks": {
            "pointsFor": 11,
            "pointsAgainst": 13,
            "qbPts": 10,
            "rbPts": 9,
            "wrPts": 7,
            "tePts": 10
          }
        },
        {
          "teamId": "dseinn",
          "values": {
            "pointsFor": 162.46,
            "pointsAgainst": 114.2,
            "qbPts": 18.26,
            "rbPts": 71.5,
            "wrPts": 18.3,
            "tePts": 32.4
          },
          "ranks": {
            "pointsFor": 2,
            "pointsAgainst": 4,
            "qbPts": 6,
            "rbPts": 1,
            "wrPts": 13,
            "tePts": 2
          }
        },
        {
          "teamId": "giantmarv",
          "values": {
            "pointsFor": 149.74,
            "pointsAgainst": 126.1,
            "qbPts": 20.94,
            "rbPts": 46.2,
            "wrPts": 50.3,
            "tePts": 12.3
          },
          "ranks": {
            "pointsFor": 3,
            "pointsAgainst": 8,
            "qbPts": 5,
            "rbPts": 3,
            "wrPts": 6,
            "tePts": 8
          }
        },
        {
          "teamId": "r4xon",
          "values": {
            "pointsFor": 183.06,
            "pointsAgainst": 103.2,
            "qbPts": 17.16,
            "rbPts": 47.5,
            "wrPts": 96.8,
            "tePts": 5.6
          },
          "ranks": {
            "pointsFor": 1,
            "pointsAgainst": 2,
            "qbPts": 7,
            "rbPts": 2,
            "wrPts": 1,
            "tePts": 11
          }
        },
        {
          "teamId": "danfre",
          "values": {
            "pointsFor": 110.12,
            "pointsAgainst": 142.3,
            "qbPts": 1.84,
            "rbPts": 35.5,
            "wrPts": 22.78,
            "tePts": 35
          },
          "ranks": {
            "pointsFor": 12,
            "pointsAgainst": 10,
            "qbPts": 13,
            "rbPts": 8,
            "wrPts": 11,
            "tePts": 1
          }
        },
        {
          "teamId": "unicornsruegen",
          "values": {
            "pointsFor": 126.1,
            "pointsAgainst": 149.74,
            "qbPts": 24.6,
            "rbPts": 35.7,
            "wrPts": 17.3,
            "tePts": 15.5
          },
          "ranks": {
            "pointsFor": 7,
            "pointsAgainst": 12,
            "qbPts": 4,
            "rbPts": 7,
            "wrPts": 14,
            "tePts": 6
          }
        },
        {
          "teamId": "lovethecheesehead",
          "values": {
            "pointsFor": 49.1,
            "pointsAgainst": 119.62,
            "qbPts": 0,
            "rbPts": 21.8,
            "wrPts": 22.3,
            "tePts": 0
          },
          "ranks": {
            "pointsFor": 14,
            "pointsAgainst": 7,
            "qbPts": 14,
            "rbPts": 10,
            "wrPts": 12,
            "tePts": 14
          }
        },
        {
          "teamId": "americagrizlies",
          "values": {
            "pointsFor": 142.3,
            "pointsAgainst": 110.12,
            "qbPts": 31.5,
            "rbPts": 20.6,
            "wrPts": 56.8,
            "tePts": 13.4
          },
          "ranks": {
            "pointsFor": 5,
            "pointsAgainst": 3,
            "qbPts": 3,
            "rbPts": 11,
            "wrPts": 3,
            "tePts": 7
          }
        },
        {
          "teamId": "angryducks",
          "values": {
            "pointsFor": 119.62,
            "pointsAgainst": 49.1,
            "qbPts": 7.92,
            "rbPts": 19.8,
            "wrPts": 69.5,
            "tePts": 21.4
          },
          "ranks": {
            "pointsFor": 8,
            "pointsAgainst": 1,
            "qbPts": 12,
            "rbPts": 12,
            "wrPts": 2,
            "tePts": 5
          }
        }
      ]
    },
    "6": {
      "cumulative": [
        {
          "teamId": "milchreis",
          "values": {
            "pointsFor": 141.5,
            "pointsAgainst": 132.58,
            "qbPts": 24.18,
            "rbPts": 20.45,
            "wrPts": 62.28,
            "tePts": 19.6
          },
          "ranks": {
            "pointsFor": 5,
            "pointsAgainst": 9,
            "qbPts": 2,
            "rbPts": 11,
            "wrPts": 2,
            "tePts": 4
          },
          "gamesPlayed": 6
        },
        {
          "teamId": "bomba12",
          "values": {
            "pointsFor": 141.5,
            "pointsAgainst": 123.6,
            "qbPts": 14.2,
            "rbPts": 32.73,
            "wrPts": 70.82,
            "tePts": 9.92
          },
          "ranks": {
            "pointsFor": 6,
            "pointsAgainst": 5,
            "qbPts": 12,
            "rbPts": 6,
            "wrPts": 1,
            "tePts": 12
          },
          "gamesPlayed": 6
        },
        {
          "teamId": "svennyg",
          "values": {
            "pointsFor": 104.48,
            "pointsAgainst": 140.3,
            "qbPts": 18.31,
            "rbPts": 27.47,
            "wrPts": 35.1,
            "tePts": 6.27
          },
          "ranks": {
            "pointsFor": 12,
            "pointsAgainst": 13,
            "qbPts": 7,
            "rbPts": 8,
            "wrPts": 11,
            "tePts": 13
          },
          "gamesPlayed": 6
        },
        {
          "teamId": "jiggydee2312",
          "values": {
            "pointsFor": 103.85,
            "pointsAgainst": 133.38,
            "qbPts": 20.47,
            "rbPts": 22.07,
            "wrPts": 23.42,
            "tePts": 22.73
          },
          "ranks": {
            "pointsFor": 13,
            "pointsAgainst": 10,
            "qbPts": 5,
            "rbPts": 10,
            "wrPts": 14,
            "tePts": 2
          },
          "gamesPlayed": 6
        },
        {
          "teamId": "dickvanhurik",
          "values": {
            "pointsFor": 143.03,
            "pointsAgainst": 140.51,
            "qbPts": 19.6,
            "rbPts": 45.2,
            "wrPts": 51.28,
            "tePts": 9.95
          },
          "ranks": {
            "pointsFor": 3,
            "pointsAgainst": 14,
            "qbPts": 6,
            "rbPts": 4,
            "wrPts": 6,
            "tePts": 11
          },
          "gamesPlayed": 6
        },
        {
          "teamId": "teambeermode",
          "values": {
            "pointsFor": 141.76,
            "pointsAgainst": 120.31,
            "qbPts": 16.03,
            "rbPts": 35.43,
            "wrPts": 61.75,
            "tePts": 11.72
          },
          "ranks": {
            "pointsFor": 4,
            "pointsAgainst": 4,
            "qbPts": 10,
            "rbPts": 5,
            "wrPts": 4,
            "tePts": 9
          },
          "gamesPlayed": 6
        },
        {
          "teamId": "dseinn",
          "values": {
            "pointsFor": 160.25,
            "pointsAgainst": 131.08,
            "qbPts": 16.48,
            "rbPts": 70.1,
            "wrPts": 40.67,
            "tePts": 18.67
          },
          "ranks": {
            "pointsFor": 1,
            "pointsAgainst": 8,
            "qbPts": 9,
            "rbPts": 1,
            "wrPts": 8,
            "tePts": 5
          },
          "gamesPlayed": 6
        },
        {
          "teamId": "giantmarv",
          "values": {
            "pointsFor": 135.75,
            "pointsAgainst": 134.17,
            "qbPts": 17.85,
            "rbPts": 31.5,
            "wrPts": 38.88,
            "tePts": 29.02
          },
          "ranks": {
            "pointsFor": 7,
            "pointsAgainst": 12,
            "qbPts": 8,
            "rbPts": 7,
            "wrPts": 9,
            "tePts": 1
          },
          "gamesPlayed": 6
        },
        {
          "teamId": "r4xon",
          "values": {
            "pointsFor": 155.7,
            "pointsAgainst": 109.1,
            "qbPts": 22.67,
            "rbPts": 50.22,
            "wrPts": 58.68,
            "tePts": 10.97
          },
          "ranks": {
            "pointsFor": 2,
            "pointsAgainst": 1,
            "qbPts": 4,
            "rbPts": 3,
            "wrPts": 5,
            "tePts": 10
          },
          "gamesPlayed": 6
        },
        {
          "teamId": "danfre",
          "values": {
            "pointsFor": 133.43,
            "pointsAgainst": 109.45,
            "qbPts": 15.61,
            "rbPts": 53.53,
            "wrPts": 29.61,
            "tePts": 20.67
          },
          "ranks": {
            "pointsFor": 8,
            "pointsAgainst": 2,
            "qbPts": 11,
            "rbPts": 2,
            "wrPts": 12,
            "tePts": 3
          },
          "gamesPlayed": 6
        },
        {
          "teamId": "unicornsruegen",
          "values": {
            "pointsFor": 122.57,
            "pointsAgainst": 125.8,
            "qbPts": 23.92,
            "rbPts": 26.68,
            "wrPts": 35.12,
            "tePts": 18.18
          },
          "ranks": {
            "pointsFor": 9,
            "pointsAgainst": 6,
            "qbPts": 3,
            "rbPts": 9,
            "wrPts": 10,
            "tePts": 6
          },
          "gamesPlayed": 6
        },
        {
          "teamId": "lovethecheesehead",
          "values": {
            "pointsFor": 55.25,
            "pointsAgainst": 130.53,
            "qbPts": 0,
            "rbPts": 11.62,
            "wrPts": 28.83,
            "tePts": 4.47
          },
          "ranks": {
            "pointsFor": 14,
            "pointsAgainst": 7,
            "qbPts": 14,
            "rbPts": 14,
            "wrPts": 13,
            "tePts": 14
          },
          "gamesPlayed": 6
        },
        {
          "teamId": "americagrizlies",
          "values": {
            "pointsFor": 116.36,
            "pointsAgainst": 133.66,
            "qbPts": 27.54,
            "rbPts": 13.77,
            "wrPts": 44.18,
            "tePts": 12.53
          },
          "ranks": {
            "pointsFor": 11,
            "pointsAgainst": 11,
            "qbPts": 1,
            "rbPts": 13,
            "wrPts": 7,
            "tePts": 7
          },
          "gamesPlayed": 6
        },
        {
          "teamId": "angryducks",
          "values": {
            "pointsFor": 121.73,
            "pointsAgainst": 112.69,
            "qbPts": 12.11,
            "rbPts": 19.45,
            "wrPts": 61.78,
            "tePts": 11.88
          },
          "ranks": {
            "pointsFor": 10,
            "pointsAgainst": 3,
            "qbPts": 13,
            "rbPts": 12,
            "wrPts": 3,
            "tePts": 8
          },
          "gamesPlayed": 6
        }
      ],
      "weekly": [
        {
          "teamId": "milchreis",
          "values": {
            "pointsFor": 150.1,
            "pointsAgainst": 108.9,
            "qbPts": 21,
            "rbPts": 14,
            "wrPts": 67.6,
            "tePts": 29.5
          },
          "ranks": {
            "pointsFor": 3,
            "pointsAgainst": 5,
            "qbPts": 6,
            "rbPts": 10,
            "wrPts": 1,
            "tePts": 1
          }
        },
        {
          "teamId": "bomba12",
          "values": {
            "pointsFor": 86.48,
            "pointsAgainst": 119.8,
            "qbPts": 11.48,
            "rbPts": 29.3,
            "wrPts": 31.9,
            "tePts": 11.8
          },
          "ranks": {
            "pointsFor": 12,
            "pointsAgainst": 6,
            "qbPts": 12,
            "rbPts": 7,
            "wrPts": 10,
            "tePts": 8
          }
        },
        {
          "teamId": "svennyg",
          "values": {
            "pointsFor": 74.12,
            "pointsAgainst": 136.16,
            "qbPts": 13.02,
            "rbPts": 13.9,
            "wrPts": 37.8,
            "tePts": 1.4
          },
          "ranks": {
            "pointsFor": 13,
            "pointsAgainst": 9,
            "qbPts": 11,
            "rbPts": 11,
            "wrPts": 9,
            "tePts": 12
          }
        },
        {
          "teamId": "jiggydee2312",
          "values": {
            "pointsFor": 119.8,
            "pointsAgainst": 86.48,
            "qbPts": 23.8,
            "rbPts": 39.7,
            "wrPts": 26.8,
            "tePts": 14.5
          },
          "ranks": {
            "pointsFor": 9,
            "pointsAgainst": 3,
            "qbPts": 4,
            "rbPts": 5,
            "wrPts": 14,
            "tePts": 6
          }
        },
        {
          "teamId": "dickvanhurik",
          "values": {
            "pointsFor": 125.7,
            "pointsAgainst": 145.24,
            "qbPts": 23.1,
            "rbPts": 50.4,
            "wrPts": 28.4,
            "tePts": 10.8
          },
          "ranks": {
            "pointsFor": 7,
            "pointsAgainst": 10,
            "qbPts": 5,
            "rbPts": 2,
            "wrPts": 11,
            "tePts": 9
          }
        },
        {
          "teamId": "teambeermode",
          "values": {
            "pointsFor": 123.06,
            "pointsAgainst": 158.48,
            "qbPts": 13.16,
            "rbPts": 19.9,
            "wrPts": 61.9,
            "tePts": 12.1
          },
          "ranks": {
            "pointsFor": 8,
            "pointsAgainst": 13,
            "qbPts": 10,
            "rbPts": 9,
            "wrPts": 3,
            "tePts": 7
          }
        },
        {
          "teamId": "dseinn",
          "values": {
            "pointsFor": 148.34,
            "pointsAgainst": 88.68,
            "qbPts": 19.84,
            "rbPts": 44.9,
            "wrPts": 42.7,
            "tePts": 23.9
          },
          "ranks": {
            "pointsFor": 4,
            "pointsAgainst": 4,
            "qbPts": 7,
            "rbPts": 3,
            "wrPts": 8,
            "tePts": 4
          }
        },
        {
          "teamId": "giantmarv",
          "values": {
            "pointsFor": 158.48,
            "pointsAgainst": 123.06,
            "qbPts": 23.98,
            "rbPts": 27.9,
            "wrPts": 52.4,
            "tePts": 27.2
          },
          "ranks": {
            "pointsFor": 2,
            "pointsAgainst": 7,
            "qbPts": 3,
            "rbPts": 8,
            "wrPts": 6,
            "tePts": 3
          }
        },
        {
          "teamId": "r4xon",
          "values": {
            "pointsFor": 136.16,
            "pointsAgainst": 74.12,
            "qbPts": 17.36,
            "rbPts": 44.7,
            "wrPts": 53.1,
            "tePts": 0
          },
          "ranks": {
            "pointsFor": 6,
            "pointsAgainst": 2,
            "qbPts": 9,
            "rbPts": 4,
            "wrPts": 5,
            "tePts": 14
          }
        },
        {
          "teamId": "danfre",
          "values": {
            "pointsFor": 159.56,
            "pointsAgainst": 57,
            "qbPts": 26.96,
            "rbPts": 67.5,
            "wrPts": 28.1,
            "tePts": 23
          },
          "ranks": {
            "pointsFor": 1,
            "pointsAgainst": 1,
            "qbPts": 2,
            "rbPts": 1,
            "wrPts": 13,
            "tePts": 5
          }
        },
        {
          "teamId": "unicornsruegen",
          "values": {
            "pointsFor": 145.24,
            "pointsAgainst": 125.7,
            "qbPts": 28.34,
            "rbPts": 32.5,
            "wrPts": 60,
            "tePts": 9.4
          },
          "ranks": {
            "pointsFor": 5,
            "pointsAgainst": 8,
            "qbPts": 1,
            "rbPts": 6,
            "wrPts": 4,
            "tePts": 10
          }
        },
        {
          "teamId": "lovethecheesehead",
          "values": {
            "pointsFor": 57,
            "pointsAgainst": 159.56,
            "qbPts": 0,
            "rbPts": 5.7,
            "wrPts": 28.2,
            "tePts": 2.1
          },
          "ranks": {
            "pointsFor": 14,
            "pointsAgainst": 14,
            "qbPts": 14,
            "rbPts": 12,
            "wrPts": 12,
            "tePts": 11
          }
        },
        {
          "teamId": "americagrizlies",
          "values": {
            "pointsFor": 108.9,
            "pointsAgainst": 150.1,
            "qbPts": 18.3,
            "rbPts": 3,
            "wrPts": 47.3,
            "tePts": 27.3
          },
          "ranks": {
            "pointsFor": 10,
            "pointsAgainst": 12,
            "qbPts": 8,
            "rbPts": 13,
            "wrPts": 7,
            "tePts": 2
          }
        },
        {
          "teamId": "angryducks",
          "values": {
            "pointsFor": 88.68,
            "pointsAgainst": 148.34,
            "qbPts": 4.48,
            "rbPts": 1,
            "wrPts": 63.8,
            "tePts": 1.4
          },
          "ranks": {
            "pointsFor": 11,
            "pointsAgainst": 11,
            "qbPts": 13,
            "rbPts": 14,
            "wrPts": 2,
            "tePts": 13
          }
        }
      ]
    },
    "7": {
      "cumulative": [
        {
          "teamId": "milchreis",
          "values": {
            "pointsFor": 145.12,
            "pointsAgainst": 122.59,
            "qbPts": 23.88,
            "rbPts": 22.84,
            "wrPts": 62.79,
            "tePts": 22.03
          },
          "ranks": {
            "pointsFor": 5,
            "pointsAgainst": 5,
            "qbPts": 3,
            "rbPts": 10,
            "wrPts": 3,
            "tePts": 3
          },
          "gamesPlayed": 7
        },
        {
          "teamId": "bomba12",
          "values": {
            "pointsFor": 145.65,
            "pointsAgainst": 122.93,
            "qbPts": 13.17,
            "rbPts": 33.6,
            "wrPts": 73.97,
            "tePts": 10.61
          },
          "ranks": {
            "pointsFor": 4,
            "pointsAgainst": 6,
            "qbPts": 13,
            "rbPts": 5,
            "wrPts": 1,
            "tePts": 10
          },
          "gamesPlayed": 7
        },
        {
          "teamId": "svennyg",
          "values": {
            "pointsFor": 103.72,
            "pointsAgainst": 136.59,
            "qbPts": 19.02,
            "rbPts": 28.23,
            "wrPts": 34.96,
            "tePts": 5.37
          },
          "ranks": {
            "pointsFor": 13,
            "pointsAgainst": 14,
            "qbPts": 7,
            "rbPts": 8,
            "wrPts": 11,
            "tePts": 14
          },
          "gamesPlayed": 7
        },
        {
          "teamId": "jiggydee2312",
          "values": {
            "pointsFor": 106.71,
            "pointsAgainst": 124.98,
            "qbPts": 21.61,
            "rbPts": 21.93,
            "wrPts": 24.73,
            "tePts": 23.59
          },
          "ranks": {
            "pointsFor": 12,
            "pointsAgainst": 7,
            "qbPts": 4,
            "rbPts": 11,
            "wrPts": 14,
            "tePts": 2
          },
          "gamesPlayed": 7
        },
        {
          "teamId": "dickvanhurik",
          "values": {
            "pointsFor": 150.01,
            "pointsAgainst": 134.22,
            "qbPts": 19.71,
            "rbPts": 50.57,
            "wrPts": 51.47,
            "tePts": 10.4
          },
          "ranks": {
            "pointsFor": 3,
            "pointsAgainst": 12,
            "qbPts": 6,
            "rbPts": 4,
            "wrPts": 6,
            "tePts": 11
          },
          "gamesPlayed": 7
        },
        {
          "teamId": "teambeermode",
          "values": {
            "pointsFor": 135.3,
            "pointsAgainst": 130.54,
            "qbPts": 17.46,
            "rbPts": 33.1,
            "wrPts": 56.21,
            "tePts": 12.53
          },
          "ranks": {
            "pointsFor": 6,
            "pointsAgainst": 9,
            "qbPts": 9,
            "rbPts": 6,
            "wrPts": 4,
            "tePts": 8
          },
          "gamesPlayed": 7
        },
        {
          "teamId": "dseinn",
          "values": {
            "pointsFor": 152.27,
            "pointsAgainst": 129.97,
            "qbPts": 15.19,
            "rbPts": 69.73,
            "wrPts": 36.76,
            "tePts": 16.46
          },
          "ranks": {
            "pointsFor": 1,
            "pointsAgainst": 8,
            "qbPts": 11,
            "rbPts": 1,
            "wrPts": 9,
            "tePts": 6
          },
          "gamesPlayed": 7
        },
        {
          "teamId": "giantmarv",
          "values": {
            "pointsFor": 134.56,
            "pointsAgainst": 133.87,
            "qbPts": 17.66,
            "rbPts": 32.29,
            "wrPts": 38,
            "tePts": 28.19
          },
          "ranks": {
            "pointsFor": 7,
            "pointsAgainst": 11,
            "qbPts": 8,
            "rbPts": 7,
            "wrPts": 8,
            "tePts": 1
          },
          "gamesPlayed": 7
        },
        {
          "teamId": "r4xon",
          "values": {
            "pointsFor": 150.45,
            "pointsAgainst": 117.87,
            "qbPts": 21.43,
            "rbPts": 51.07,
            "wrPts": 55.16,
            "tePts": 9.64
          },
          "ranks": {
            "pointsFor": 2,
            "pointsAgainst": 3,
            "qbPts": 5,
            "rbPts": 3,
            "wrPts": 5,
            "tePts": 12
          },
          "gamesPlayed": 7
        },
        {
          "teamId": "danfre",
          "values": {
            "pointsFor": 131.98,
            "pointsAgainst": 108.73,
            "qbPts": 15.5,
            "rbPts": 53.14,
            "wrPts": 29.2,
            "tePts": 20
          },
          "ranks": {
            "pointsFor": 8,
            "pointsAgainst": 1,
            "qbPts": 10,
            "rbPts": 2,
            "wrPts": 13,
            "tePts": 4
          },
          "gamesPlayed": 7
        },
        {
          "teamId": "unicornsruegen",
          "values": {
            "pointsFor": 121.4,
            "pointsAgainst": 121.99,
            "qbPts": 24.63,
            "rbPts": 25.9,
            "wrPts": 36.07,
            "tePts": 17.51
          },
          "ranks": {
            "pointsFor": 10,
            "pointsAgainst": 4,
            "qbPts": 1,
            "rbPts": 9,
            "wrPts": 10,
            "tePts": 5
          },
          "gamesPlayed": 7
        },
        {
          "teamId": "lovethecheesehead",
          "values": {
            "pointsFor": 56.3,
            "pointsAgainst": 135.71,
            "qbPts": 0,
            "rbPts": 10.53,
            "wrPts": 29.29,
            "tePts": 5.91
          },
          "ranks": {
            "pointsFor": 14,
            "pointsAgainst": 13,
            "qbPts": 14,
            "rbPts": 14,
            "wrPts": 12,
            "tePts": 13
          },
          "gamesPlayed": 7
        },
        {
          "teamId": "americagrizlies",
          "values": {
            "pointsFor": 110.39,
            "pointsAgainst": 132.26,
            "qbPts": 24.56,
            "rbPts": 14.57,
            "wrPts": 40.61,
            "tePts": 13.64
          },
          "ranks": {
            "pointsFor": 11,
            "pointsAgainst": 10,
            "qbPts": 2,
            "rbPts": 13,
            "wrPts": 7,
            "tePts": 7
          },
          "gamesPlayed": 7
        },
        {
          "teamId": "angryducks",
          "values": {
            "pointsFor": 123.21,
            "pointsAgainst": 114.79,
            "qbPts": 14.12,
            "rbPts": 17.46,
            "wrPts": 63.26,
            "tePts": 10.94
          },
          "ranks": {
            "pointsFor": 9,
            "pointsAgainst": 2,
            "qbPts": 12,
            "rbPts": 12,
            "wrPts": 2,
            "tePts": 9
          },
          "gamesPlayed": 7
        }
      ],
      "weekly": [
        {
          "teamId": "milchreis",
          "values": {
            "pointsFor": 166.82,
            "pointsAgainst": 62.6,
            "qbPts": 22.12,
            "rbPts": 37.2,
            "wrPts": 65.9,
            "tePts": 36.6
          },
          "ranks": {
            "pointsFor": 3,
            "pointsAgainst": 1,
            "qbPts": 6,
            "rbPts": 6,
            "wrPts": 3,
            "tePts": 1
          }
        },
        {
          "teamId": "bomba12",
          "values": {
            "pointsFor": 170.5,
            "pointsAgainst": 118.92,
            "qbPts": 7,
            "rbPts": 38.8,
            "wrPts": 92.9,
            "tePts": 14.8
          },
          "ranks": {
            "pointsFor": 2,
            "pointsAgainst": 7,
            "qbPts": 12,
            "rbPts": 5,
            "wrPts": 1,
            "tePts": 7
          }
        },
        {
          "teamId": "svennyg",
          "values": {
            "pointsFor": 99.18,
            "pointsAgainst": 114.38,
            "qbPts": 23.28,
            "rbPts": 32.8,
            "wrPts": 34.1,
            "tePts": 0
          },
          "ranks": {
            "pointsFor": 11,
            "pointsAgainst": 6,
            "qbPts": 5,
            "rbPts": 8,
            "wrPts": 6,
            "tePts": 14
          }
        },
        {
          "teamId": "jiggydee2312",
          "values": {
            "pointsFor": 123.84,
            "pointsAgainst": 74.56,
            "qbPts": 28.44,
            "rbPts": 21.1,
            "wrPts": 32.6,
            "tePts": 28.7
          },
          "ranks": {
            "pointsFor": 6,
            "pointsAgainst": 2,
            "qbPts": 2,
            "rbPts": 10,
            "wrPts": 9,
            "tePts": 2
          }
        },
        {
          "teamId": "dickvanhurik",
          "values": {
            "pointsFor": 191.92,
            "pointsAgainst": 96.52,
            "qbPts": 20.42,
            "rbPts": 82.8,
            "wrPts": 52.6,
            "tePts": 13.1
          },
          "ranks": {
            "pointsFor": 1,
            "pointsAgainst": 3,
            "qbPts": 7,
            "rbPts": 1,
            "wrPts": 4,
            "tePts": 10
          }
        },
        {
          "teamId": "teambeermode",
          "values": {
            "pointsFor": 96.52,
            "pointsAgainst": 191.92,
            "qbPts": 26.02,
            "rbPts": 19.1,
            "wrPts": 23,
            "tePts": 17.4
          },
          "ranks": {
            "pointsFor": 12,
            "pointsAgainst": 14,
            "qbPts": 4,
            "rbPts": 12,
            "wrPts": 12,
            "tePts": 5
          }
        },
        {
          "teamId": "dseinn",
          "values": {
            "pointsFor": 104.42,
            "pointsAgainst": 123.32,
            "qbPts": 7.42,
            "rbPts": 67.5,
            "wrPts": 13.3,
            "tePts": 3.2
          },
          "ranks": {
            "pointsFor": 10,
            "pointsAgainst": 8,
            "qbPts": 11,
            "rbPts": 2,
            "wrPts": 14,
            "tePts": 12
          }
        },
        {
          "teamId": "giantmarv",
          "values": {
            "pointsFor": 127.42,
            "pointsAgainst": 132.08,
            "qbPts": 16.52,
            "rbPts": 37,
            "wrPts": 32.7,
            "tePts": 23.2
          },
          "ranks": {
            "pointsFor": 5,
            "pointsAgainst": 11,
            "qbPts": 8,
            "rbPts": 7,
            "wrPts": 8,
            "tePts": 3
          }
        },
        {
          "teamId": "r4xon",
          "values": {
            "pointsFor": 118.92,
            "pointsAgainst": 170.5,
            "qbPts": 14.02,
            "rbPts": 56.2,
            "wrPts": 34,
            "tePts": 1.7
          },
          "ranks": {
            "pointsFor": 8,
            "pointsAgainst": 13,
            "qbPts": 10,
            "rbPts": 3,
            "wrPts": 7,
            "tePts": 13
          }
        },
        {
          "teamId": "danfre",
          "values": {
            "pointsFor": 123.32,
            "pointsAgainst": 104.42,
            "qbPts": 14.82,
            "rbPts": 50.8,
            "wrPts": 26.7,
            "tePts": 16
          },
          "ranks": {
            "pointsFor": 7,
            "pointsAgainst": 5,
            "qbPts": 9,
            "rbPts": 4,
            "wrPts": 11,
            "tePts": 6
          }
        },
        {
          "teamId": "unicornsruegen",
          "values": {
            "pointsFor": 114.38,
            "pointsAgainst": 99.18,
            "qbPts": 28.88,
            "rbPts": 21.2,
            "wrPts": 41.8,
            "tePts": 13.5
          },
          "ranks": {
            "pointsFor": 9,
            "pointsAgainst": 4,
            "qbPts": 1,
            "rbPts": 9,
            "wrPts": 5,
            "tePts": 9
          }
        },
        {
          "teamId": "lovethecheesehead",
          "values": {
            "pointsFor": 62.6,
            "pointsAgainst": 166.82,
            "qbPts": 0,
            "rbPts": 4,
            "wrPts": 32,
            "tePts": 14.6
          },
          "ranks": {
            "pointsFor": 14,
            "pointsAgainst": 12,
            "qbPts": 14,
            "rbPts": 14,
            "wrPts": 10,
            "tePts": 8
          }
        },
        {
          "teamId": "americagrizlies",
          "values": {
            "pointsFor": 74.56,
            "pointsAgainst": 123.84,
            "qbPts": 6.66,
            "rbPts": 19.4,
            "wrPts": 19.2,
            "tePts": 20.3
          },
          "ranks": {
            "pointsFor": 13,
            "pointsAgainst": 9,
            "qbPts": 13,
            "rbPts": 11,
            "wrPts": 13,
            "tePts": 4
          }
        },
        {
          "teamId": "angryducks",
          "values": {
            "pointsFor": 132.08,
            "pointsAgainst": 127.42,
            "qbPts": 26.18,
            "rbPts": 5.5,
            "wrPts": 72.1,
            "tePts": 5.3
          },
          "ranks": {
            "pointsFor": 4,
            "pointsAgainst": 10,
            "qbPts": 3,
            "rbPts": 13,
            "wrPts": 2,
            "tePts": 11
          }
        }
      ]
    }
  }
};
