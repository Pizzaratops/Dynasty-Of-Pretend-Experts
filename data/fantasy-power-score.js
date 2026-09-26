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
    }
  }
};
