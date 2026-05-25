/**
 * Visio Studio 拼豆工坊 - 拼豆色卡数据库与配色算法
 * 萌小怪星芒黄豆豆 MARD同款 221色套装 标准色号数据库
 */

// MARD 221色 2.6mm 软豆 核心色卡数据库
const ARTKAL_C_COLORS = [
  {
    "code": "A1",
    "name": "A1",
    "enName": "A1",
    "hex": "#FAF4C8",
    "rgb": [
      250,
      244,
      200
    ],
    "category": "yellow"
  },
  {
    "code": "A2",
    "name": "A2",
    "enName": "A2",
    "hex": "#FFFFD5",
    "rgb": [
      255,
      255,
      213
    ],
    "category": "yellow"
  },
  {
    "code": "A3",
    "name": "A3",
    "enName": "A3",
    "hex": "#FEFF8B",
    "rgb": [
      254,
      255,
      139
    ],
    "category": "yellow"
  },
  {
    "code": "A4",
    "name": "A4",
    "enName": "A4",
    "hex": "#FBED56",
    "rgb": [
      251,
      237,
      86
    ],
    "category": "yellow"
  },
  {
    "code": "A5",
    "name": "A5",
    "enName": "A5",
    "hex": "#F4D738",
    "rgb": [
      244,
      215,
      56
    ],
    "category": "yellow"
  },
  {
    "code": "A6",
    "name": "A6",
    "enName": "A6",
    "hex": "#FEAC4C",
    "rgb": [
      254,
      172,
      76
    ],
    "category": "orange"
  },
  {
    "code": "A7",
    "name": "A7",
    "enName": "A7",
    "hex": "#FE8B4C",
    "rgb": [
      254,
      139,
      76
    ],
    "category": "orange"
  },
  {
    "code": "A8",
    "name": "A8",
    "enName": "A8",
    "hex": "#FFDA45",
    "rgb": [
      255,
      218,
      69
    ],
    "category": "yellow"
  },
  {
    "code": "A9",
    "name": "A9",
    "enName": "A9",
    "hex": "#FF995B",
    "rgb": [
      255,
      153,
      91
    ],
    "category": "orange"
  },
  {
    "code": "A10",
    "name": "A10",
    "enName": "A10",
    "hex": "#F77C31",
    "rgb": [
      247,
      124,
      49
    ],
    "category": "orange"
  },
  {
    "code": "A11",
    "name": "A11 (淡黄)",
    "enName": "A11 (Cream Yellow)",
    "hex": "#FFDD99",
    "rgb": [
      255,
      221,
      153
    ],
    "category": "orange"
  },
  {
    "code": "A12",
    "name": "A12",
    "enName": "A12",
    "hex": "#FE9F72",
    "rgb": [
      254,
      159,
      114
    ],
    "category": "orange"
  },
  {
    "code": "A13",
    "name": "A13",
    "enName": "A13",
    "hex": "#FFC365",
    "rgb": [
      255,
      195,
      101
    ],
    "category": "orange"
  },
  {
    "code": "A14",
    "name": "A14",
    "enName": "A14",
    "hex": "#FD543D",
    "rgb": [
      253,
      84,
      61
    ],
    "category": "red"
  },
  {
    "code": "A15",
    "name": "A15",
    "enName": "A15",
    "hex": "#FFF365",
    "rgb": [
      255,
      243,
      101
    ],
    "category": "yellow"
  },
  {
    "code": "A16",
    "name": "A16",
    "enName": "A16",
    "hex": "#FFFF9F",
    "rgb": [
      255,
      255,
      159
    ],
    "category": "yellow"
  },
  {
    "code": "A17",
    "name": "A17 (柠檬黄)",
    "enName": "A17 (Lemon Yellow)",
    "hex": "#FFE36E",
    "rgb": [
      255,
      227,
      110
    ],
    "category": "yellow"
  },
  {
    "code": "A18",
    "name": "A18",
    "enName": "A18",
    "hex": "#FEBE7D",
    "rgb": [
      254,
      190,
      125
    ],
    "category": "orange"
  },
  {
    "code": "A19",
    "name": "A19",
    "enName": "A19",
    "hex": "#FD7C72",
    "rgb": [
      253,
      124,
      114
    ],
    "category": "pink"
  },
  {
    "code": "A20",
    "name": "A20 (柠檬黄)",
    "enName": "A20 (Lemon Yellow)",
    "hex": "#FFD568",
    "rgb": [
      255,
      213,
      104
    ],
    "category": "orange"
  },
  {
    "code": "A21",
    "name": "A21 (淡黄)",
    "enName": "A21 (Cream Yellow)",
    "hex": "#FFE395",
    "rgb": [
      255,
      227,
      149
    ],
    "category": "orange"
  },
  {
    "code": "A22",
    "name": "A22",
    "enName": "A22",
    "hex": "#F4F57D",
    "rgb": [
      244,
      245,
      125
    ],
    "category": "yellow"
  },
  {
    "code": "A23",
    "name": "A23 (奶茶色)",
    "enName": "A23 (Beige)",
    "hex": "#E6C9B7",
    "rgb": [
      230,
      201,
      183
    ],
    "category": "brown"
  },
  {
    "code": "A24",
    "name": "A24",
    "enName": "A24",
    "hex": "#F7F8A2",
    "rgb": [
      247,
      248,
      162
    ],
    "category": "yellow"
  },
  {
    "code": "A25",
    "name": "A25 (柠檬黄)",
    "enName": "A25 (Lemon Yellow)",
    "hex": "#FFD67D",
    "rgb": [
      255,
      214,
      125
    ],
    "category": "orange"
  },
  {
    "code": "A26",
    "name": "A26",
    "enName": "A26",
    "hex": "#FFC830",
    "rgb": [
      255,
      200,
      48
    ],
    "category": "orange"
  },
  {
    "code": "B1",
    "name": "B1",
    "enName": "B1",
    "hex": "#E6EE31",
    "rgb": [
      230,
      238,
      49
    ],
    "category": "yellow"
  },
  {
    "code": "B2",
    "name": "B2",
    "enName": "B2",
    "hex": "#63F347",
    "rgb": [
      99,
      243,
      71
    ],
    "category": "green"
  },
  {
    "code": "B3",
    "name": "B3",
    "enName": "B3",
    "hex": "#9EF780",
    "rgb": [
      158,
      247,
      128
    ],
    "category": "green"
  },
  {
    "code": "B4",
    "name": "B4",
    "enName": "B4",
    "hex": "#5DE035",
    "rgb": [
      93,
      224,
      53
    ],
    "category": "green"
  },
  {
    "code": "B5",
    "name": "B5",
    "enName": "B5",
    "hex": "#35E352",
    "rgb": [
      53,
      227,
      82
    ],
    "category": "green"
  },
  {
    "code": "B6",
    "name": "B6",
    "enName": "B6",
    "hex": "#65E2A6",
    "rgb": [
      101,
      226,
      166
    ],
    "category": "green"
  },
  {
    "code": "B7",
    "name": "B7",
    "enName": "B7",
    "hex": "#3DAF80",
    "rgb": [
      61,
      175,
      128
    ],
    "category": "green"
  },
  {
    "code": "B8",
    "name": "B8",
    "enName": "B8",
    "hex": "#1C9C4F",
    "rgb": [
      28,
      156,
      79
    ],
    "category": "green"
  },
  {
    "code": "B9",
    "name": "B9",
    "enName": "B9",
    "hex": "#27523A",
    "rgb": [
      39,
      82,
      58
    ],
    "category": "green"
  },
  {
    "code": "B10",
    "name": "B10",
    "enName": "B10",
    "hex": "#95D3C2",
    "rgb": [
      149,
      211,
      194
    ],
    "category": "green"
  },
  {
    "code": "B11",
    "name": "B11 (军绿)",
    "enName": "B11 (Olive Green)",
    "hex": "#5D722A",
    "rgb": [
      93,
      114,
      42
    ],
    "category": "green"
  },
  {
    "code": "B12",
    "name": "B12",
    "enName": "B12",
    "hex": "#166F41",
    "rgb": [
      22,
      111,
      65
    ],
    "category": "green"
  },
  {
    "code": "B13",
    "name": "B13",
    "enName": "B13",
    "hex": "#CAEB7B",
    "rgb": [
      202,
      235,
      123
    ],
    "category": "green"
  },
  {
    "code": "B14",
    "name": "B14",
    "enName": "B14",
    "hex": "#ADE946",
    "rgb": [
      173,
      233,
      70
    ],
    "category": "green"
  },
  {
    "code": "B15",
    "name": "B15",
    "enName": "B15",
    "hex": "#2E5132",
    "rgb": [
      46,
      81,
      50
    ],
    "category": "green"
  },
  {
    "code": "B16",
    "name": "B16",
    "enName": "B16",
    "hex": "#C5ED9C",
    "rgb": [
      197,
      237,
      156
    ],
    "category": "green"
  },
  {
    "code": "B17",
    "name": "B17",
    "enName": "B17",
    "hex": "#9BB13A",
    "rgb": [
      155,
      177,
      58
    ],
    "category": "green"
  },
  {
    "code": "B18",
    "name": "B18",
    "enName": "B18",
    "hex": "#E6EE49",
    "rgb": [
      230,
      238,
      73
    ],
    "category": "yellow"
  },
  {
    "code": "B19",
    "name": "B19",
    "enName": "B19",
    "hex": "#24B88C",
    "rgb": [
      36,
      184,
      140
    ],
    "category": "green"
  },
  {
    "code": "B20",
    "name": "B20",
    "enName": "B20",
    "hex": "#C2F0CC",
    "rgb": [
      194,
      240,
      204
    ],
    "category": "green"
  },
  {
    "code": "B21",
    "name": "B21",
    "enName": "B21",
    "hex": "#156A6B",
    "rgb": [
      21,
      106,
      107
    ],
    "category": "teal"
  },
  {
    "code": "B22",
    "name": "B22",
    "enName": "B22",
    "hex": "#0B3C43",
    "rgb": [
      11,
      60,
      67
    ],
    "category": "teal"
  },
  {
    "code": "B23",
    "name": "B23",
    "enName": "B23",
    "hex": "#303A21",
    "rgb": [
      48,
      58,
      33
    ],
    "category": "green"
  },
  {
    "code": "B24",
    "name": "B24",
    "enName": "B24",
    "hex": "#EEFCA5",
    "rgb": [
      238,
      252,
      165
    ],
    "category": "yellow"
  },
  {
    "code": "B25",
    "name": "B25",
    "enName": "B25",
    "hex": "#4E846D",
    "rgb": [
      78,
      132,
      109
    ],
    "category": "green"
  },
  {
    "code": "B26",
    "name": "B26",
    "enName": "B26",
    "hex": "#8D7A35",
    "rgb": [
      141,
      122,
      53
    ],
    "category": "brown"
  },
  {
    "code": "B27",
    "name": "B27",
    "enName": "B27",
    "hex": "#CCE1AF",
    "rgb": [
      204,
      225,
      175
    ],
    "category": "green"
  },
  {
    "code": "B28",
    "name": "B28 (薄荷绿)",
    "enName": "B28 (Mint Green)",
    "hex": "#9EE5B9",
    "rgb": [
      158,
      229,
      185
    ],
    "category": "green"
  },
  {
    "code": "B29",
    "name": "B29",
    "enName": "B29",
    "hex": "#C5E254",
    "rgb": [
      197,
      226,
      84
    ],
    "category": "green"
  },
  {
    "code": "B30",
    "name": "B30",
    "enName": "B30",
    "hex": "#E2FCB1",
    "rgb": [
      226,
      252,
      177
    ],
    "category": "green"
  },
  {
    "code": "B31",
    "name": "B31",
    "enName": "B31",
    "hex": "#B0E792",
    "rgb": [
      176,
      231,
      146
    ],
    "category": "green"
  },
  {
    "code": "B32",
    "name": "B32",
    "enName": "B32",
    "hex": "#9CAB5A",
    "rgb": [
      156,
      171,
      90
    ],
    "category": "green"
  },
  {
    "code": "C1",
    "name": "C1",
    "enName": "C1",
    "hex": "#E8FFE7",
    "rgb": [
      232,
      255,
      231
    ],
    "category": "monochrome"
  },
  {
    "code": "C2",
    "name": "C2",
    "enName": "C2",
    "hex": "#A9F9FC",
    "rgb": [
      169,
      249,
      252
    ],
    "category": "teal"
  },
  {
    "code": "C3",
    "name": "C3",
    "enName": "C3",
    "hex": "#A0E2FB",
    "rgb": [
      160,
      226,
      251
    ],
    "category": "blue"
  },
  {
    "code": "C4",
    "name": "C4",
    "enName": "C4",
    "hex": "#41CCFF",
    "rgb": [
      65,
      204,
      255
    ],
    "category": "blue"
  },
  {
    "code": "C5",
    "name": "C5",
    "enName": "C5",
    "hex": "#01ACEB",
    "rgb": [
      1,
      172,
      235
    ],
    "category": "blue"
  },
  {
    "code": "C6",
    "name": "C6",
    "enName": "C6",
    "hex": "#50AAF0",
    "rgb": [
      80,
      170,
      240
    ],
    "category": "blue"
  },
  {
    "code": "C7",
    "name": "C7",
    "enName": "C7",
    "hex": "#3677D2",
    "rgb": [
      54,
      119,
      210
    ],
    "category": "blue"
  },
  {
    "code": "C8",
    "name": "C8",
    "enName": "C8",
    "hex": "#0F54C0",
    "rgb": [
      15,
      84,
      192
    ],
    "category": "blue"
  },
  {
    "code": "C9",
    "name": "C9",
    "enName": "C9",
    "hex": "#324BCA",
    "rgb": [
      50,
      75,
      202
    ],
    "category": "blue"
  },
  {
    "code": "C10",
    "name": "C10",
    "enName": "C10",
    "hex": "#3EBCE2",
    "rgb": [
      62,
      188,
      226
    ],
    "category": "teal"
  },
  {
    "code": "C11",
    "name": "C11",
    "enName": "C11",
    "hex": "#28DDDE",
    "rgb": [
      40,
      221,
      222
    ],
    "category": "teal"
  },
  {
    "code": "C12",
    "name": "C12",
    "enName": "C12",
    "hex": "#1C334D",
    "rgb": [
      28,
      51,
      77
    ],
    "category": "blue"
  },
  {
    "code": "C13",
    "name": "C13",
    "enName": "C13",
    "hex": "#CDE8FF",
    "rgb": [
      205,
      232,
      255
    ],
    "category": "blue"
  },
  {
    "code": "C14",
    "name": "C14",
    "enName": "C14",
    "hex": "#D5FDFF",
    "rgb": [
      213,
      253,
      255
    ],
    "category": "teal"
  },
  {
    "code": "C15",
    "name": "C15",
    "enName": "C15",
    "hex": "#22C4C6",
    "rgb": [
      34,
      196,
      198
    ],
    "category": "teal"
  },
  {
    "code": "C16",
    "name": "C16",
    "enName": "C16",
    "hex": "#1557A8",
    "rgb": [
      21,
      87,
      168
    ],
    "category": "blue"
  },
  {
    "code": "C17",
    "name": "C17",
    "enName": "C17",
    "hex": "#04D1F6",
    "rgb": [
      4,
      209,
      246
    ],
    "category": "teal"
  },
  {
    "code": "C18",
    "name": "C18",
    "enName": "C18",
    "hex": "#1D3344",
    "rgb": [
      29,
      51,
      68
    ],
    "category": "blue"
  },
  {
    "code": "C19",
    "name": "C19",
    "enName": "C19",
    "hex": "#1887A2",
    "rgb": [
      24,
      135,
      162
    ],
    "category": "teal"
  },
  {
    "code": "C20",
    "name": "C20",
    "enName": "C20",
    "hex": "#176DAF",
    "rgb": [
      23,
      109,
      175
    ],
    "category": "blue"
  },
  {
    "code": "C21",
    "name": "C21",
    "enName": "C21",
    "hex": "#BEDDFF",
    "rgb": [
      190,
      221,
      255
    ],
    "category": "blue"
  },
  {
    "code": "C22",
    "name": "C22",
    "enName": "C22",
    "hex": "#67B4BE",
    "rgb": [
      103,
      180,
      190
    ],
    "category": "teal"
  },
  {
    "code": "C23",
    "name": "C23",
    "enName": "C23",
    "hex": "#C8E2FF",
    "rgb": [
      200,
      226,
      255
    ],
    "category": "blue"
  },
  {
    "code": "C24",
    "name": "C24",
    "enName": "C24",
    "hex": "#7CC4FF",
    "rgb": [
      124,
      196,
      255
    ],
    "category": "blue"
  },
  {
    "code": "C25",
    "name": "C25",
    "enName": "C25",
    "hex": "#A9E5E5",
    "rgb": [
      169,
      229,
      229
    ],
    "category": "teal"
  },
  {
    "code": "C26",
    "name": "C26",
    "enName": "C26",
    "hex": "#3CAED8",
    "rgb": [
      60,
      174,
      216
    ],
    "category": "blue"
  },
  {
    "code": "C27",
    "name": "C27",
    "enName": "C27",
    "hex": "#D3DFFA",
    "rgb": [
      211,
      223,
      250
    ],
    "category": "blue"
  },
  {
    "code": "C28",
    "name": "C28",
    "enName": "C28",
    "hex": "#BBCFED",
    "rgb": [
      187,
      207,
      237
    ],
    "category": "blue"
  },
  {
    "code": "C29",
    "name": "C29",
    "enName": "C29",
    "hex": "#34488E",
    "rgb": [
      52,
      72,
      142
    ],
    "category": "blue"
  },
  {
    "code": "D1",
    "name": "D1",
    "enName": "D1",
    "hex": "#AEB4F2",
    "rgb": [
      174,
      180,
      242
    ],
    "category": "blue"
  },
  {
    "code": "D2",
    "name": "D2",
    "enName": "D2",
    "hex": "#858EDD",
    "rgb": [
      133,
      142,
      221
    ],
    "category": "blue"
  },
  {
    "code": "D3",
    "name": "D3",
    "enName": "D3",
    "hex": "#2F54AF",
    "rgb": [
      47,
      84,
      175
    ],
    "category": "blue"
  },
  {
    "code": "D4",
    "name": "D4 (藏青)",
    "enName": "D4 (Navy Blue)",
    "hex": "#182A84",
    "rgb": [
      24,
      42,
      132
    ],
    "category": "blue"
  },
  {
    "code": "D5",
    "name": "D5",
    "enName": "D5",
    "hex": "#B843C5",
    "rgb": [
      184,
      67,
      197
    ],
    "category": "purple"
  },
  {
    "code": "D6",
    "name": "D6",
    "enName": "D6",
    "hex": "#AC7BDE",
    "rgb": [
      172,
      123,
      222
    ],
    "category": "purple"
  },
  {
    "code": "D7",
    "name": "D7",
    "enName": "D7",
    "hex": "#8854B3",
    "rgb": [
      136,
      84,
      179
    ],
    "category": "purple"
  },
  {
    "code": "D8",
    "name": "D8",
    "enName": "D8",
    "hex": "#E2D3FF",
    "rgb": [
      226,
      211,
      255
    ],
    "category": "purple"
  },
  {
    "code": "D9",
    "name": "D9",
    "enName": "D9",
    "hex": "#D5B9F8",
    "rgb": [
      213,
      185,
      248
    ],
    "category": "purple"
  },
  {
    "code": "D10",
    "name": "D10",
    "enName": "D10",
    "hex": "#361851",
    "rgb": [
      54,
      24,
      81
    ],
    "category": "purple"
  },
  {
    "code": "D11",
    "name": "D11",
    "enName": "D11",
    "hex": "#B9BAE1",
    "rgb": [
      185,
      186,
      225
    ],
    "category": "blue"
  },
  {
    "code": "D12",
    "name": "D12",
    "enName": "D12",
    "hex": "#DE9AD4",
    "rgb": [
      222,
      154,
      212
    ],
    "category": "purple"
  },
  {
    "code": "D13",
    "name": "D13",
    "enName": "D13",
    "hex": "#B90095",
    "rgb": [
      185,
      0,
      149
    ],
    "category": "purple"
  },
  {
    "code": "D14",
    "name": "D14",
    "enName": "D14",
    "hex": "#8B279B",
    "rgb": [
      139,
      39,
      155
    ],
    "category": "purple"
  },
  {
    "code": "D15",
    "name": "D15 (暗紫)",
    "enName": "D15 (Grape Purple)",
    "hex": "#2F1F90",
    "rgb": [
      47,
      31,
      144
    ],
    "category": "blue"
  },
  {
    "code": "D16",
    "name": "D16",
    "enName": "D16",
    "hex": "#E3E1EE",
    "rgb": [
      227,
      225,
      238
    ],
    "category": "blue"
  },
  {
    "code": "D17",
    "name": "D17",
    "enName": "D17",
    "hex": "#C4D4F6",
    "rgb": [
      196,
      212,
      246
    ],
    "category": "blue"
  },
  {
    "code": "D18",
    "name": "D18",
    "enName": "D18",
    "hex": "#A45EC7",
    "rgb": [
      164,
      94,
      199
    ],
    "category": "purple"
  },
  {
    "code": "D19",
    "name": "D19 (沙滩黄)",
    "enName": "D19 (Sand)",
    "hex": "#D8C3D7",
    "rgb": [
      216,
      195,
      215
    ],
    "category": "purple"
  },
  {
    "code": "D20",
    "name": "D20 (丁香紫)",
    "enName": "D20 (Lavender)",
    "hex": "#9C32B2",
    "rgb": [
      156,
      50,
      178
    ],
    "category": "purple"
  },
  {
    "code": "D21",
    "name": "D21",
    "enName": "D21",
    "hex": "#9A009B",
    "rgb": [
      154,
      0,
      155
    ],
    "category": "purple"
  },
  {
    "code": "D22",
    "name": "D22",
    "enName": "D22",
    "hex": "#333A95",
    "rgb": [
      51,
      58,
      149
    ],
    "category": "blue"
  },
  {
    "code": "D23",
    "name": "D23",
    "enName": "D23",
    "hex": "#EBDAFC",
    "rgb": [
      235,
      218,
      252
    ],
    "category": "purple"
  },
  {
    "code": "D24",
    "name": "D24",
    "enName": "D24",
    "hex": "#7786E5",
    "rgb": [
      119,
      134,
      229
    ],
    "category": "blue"
  },
  {
    "code": "D25",
    "name": "D25",
    "enName": "D25",
    "hex": "#494FC7",
    "rgb": [
      73,
      79,
      199
    ],
    "category": "blue"
  },
  {
    "code": "D26",
    "name": "D26 (浅紫)",
    "enName": "D26 (Pastel Violet)",
    "hex": "#DFC2F8",
    "rgb": [
      223,
      194,
      248
    ],
    "category": "purple"
  },
  {
    "code": "E1",
    "name": "E1",
    "enName": "E1",
    "hex": "#FDD3CC",
    "rgb": [
      253,
      211,
      204
    ],
    "category": "pink"
  },
  {
    "code": "E2",
    "name": "E2",
    "enName": "E2",
    "hex": "#FEC0DF",
    "rgb": [
      254,
      192,
      223
    ],
    "category": "pink"
  },
  {
    "code": "E3",
    "name": "E3",
    "enName": "E3",
    "hex": "#FFB7E7",
    "rgb": [
      255,
      183,
      231
    ],
    "category": "pink"
  },
  {
    "code": "E4",
    "name": "E4",
    "enName": "E4",
    "hex": "#E8649E",
    "rgb": [
      232,
      100,
      158
    ],
    "category": "pink"
  },
  {
    "code": "E5",
    "name": "E5",
    "enName": "E5",
    "hex": "#F551A2",
    "rgb": [
      245,
      81,
      162
    ],
    "category": "pink"
  },
  {
    "code": "E6",
    "name": "E6",
    "enName": "E6",
    "hex": "#F13D74",
    "rgb": [
      241,
      61,
      116
    ],
    "category": "pink"
  },
  {
    "code": "E7",
    "name": "E7",
    "enName": "E7",
    "hex": "#C63478",
    "rgb": [
      198,
      52,
      120
    ],
    "category": "pink"
  },
  {
    "code": "E8",
    "name": "E8",
    "enName": "E8",
    "hex": "#FFDBE9",
    "rgb": [
      255,
      219,
      233
    ],
    "category": "monochrome"
  },
  {
    "code": "E9",
    "name": "E9",
    "enName": "E9",
    "hex": "#E970CC",
    "rgb": [
      233,
      112,
      204
    ],
    "category": "purple"
  },
  {
    "code": "E10",
    "name": "E10",
    "enName": "E10",
    "hex": "#D33793",
    "rgb": [
      211,
      55,
      147
    ],
    "category": "pink"
  },
  {
    "code": "E11",
    "name": "E11",
    "enName": "E11",
    "hex": "#FCDDD2",
    "rgb": [
      252,
      221,
      210
    ],
    "category": "orange"
  },
  {
    "code": "E12",
    "name": "E12 (艳粉)",
    "enName": "E12 (Hot Pink)",
    "hex": "#F78FC3",
    "rgb": [
      247,
      143,
      195
    ],
    "category": "pink"
  },
  {
    "code": "E13",
    "name": "E13",
    "enName": "E13",
    "hex": "#B5006D",
    "rgb": [
      181,
      0,
      109
    ],
    "category": "pink"
  },
  {
    "code": "E14",
    "name": "E14 (亮肉色)",
    "enName": "E14 (Peach Cream)",
    "hex": "#FFD1BA",
    "rgb": [
      255,
      209,
      186
    ],
    "category": "orange"
  },
  {
    "code": "E15",
    "name": "E15",
    "enName": "E15",
    "hex": "#F8C7C9",
    "rgb": [
      248,
      199,
      201
    ],
    "category": "pink"
  },
  {
    "code": "E16",
    "name": "E16 (樱花粉)",
    "enName": "E16 (Sakura Pink)",
    "hex": "#FFF3EB",
    "rgb": [
      255,
      243,
      235
    ],
    "category": "monochrome"
  },
  {
    "code": "E17",
    "name": "E17 (樱花粉)",
    "enName": "E17 (Sakura Pink)",
    "hex": "#FFE2EA",
    "rgb": [
      255,
      226,
      234
    ],
    "category": "monochrome"
  },
  {
    "code": "E18",
    "name": "E18",
    "enName": "E18",
    "hex": "#FFC7DB",
    "rgb": [
      255,
      199,
      219
    ],
    "category": "pink"
  },
  {
    "code": "E19",
    "name": "E19",
    "enName": "E19",
    "hex": "#FEBAD5",
    "rgb": [
      254,
      186,
      213
    ],
    "category": "pink"
  },
  {
    "code": "E20",
    "name": "E20 (沙滩黄)",
    "enName": "E20 (Sand)",
    "hex": "#D8C7D1",
    "rgb": [
      216,
      199,
      209
    ],
    "category": "pink"
  },
  {
    "code": "E21",
    "name": "E21 (土黄)",
    "enName": "E21 (Ochre)",
    "hex": "#BD9DA1",
    "rgb": [
      189,
      157,
      161
    ],
    "category": "pink"
  },
  {
    "code": "E22",
    "name": "E22",
    "enName": "E22",
    "hex": "#B785A1",
    "rgb": [
      183,
      133,
      161
    ],
    "category": "pink"
  },
  {
    "code": "E23",
    "name": "E23",
    "enName": "E23",
    "hex": "#937A8D",
    "rgb": [
      147,
      122,
      141
    ],
    "category": "purple"
  },
  {
    "code": "E24",
    "name": "E24 (浅紫)",
    "enName": "E24 (Pastel Violet)",
    "hex": "#E1BCE8",
    "rgb": [
      225,
      188,
      232
    ],
    "category": "purple"
  },
  {
    "code": "F1",
    "name": "F1",
    "enName": "F1",
    "hex": "#FD957B",
    "rgb": [
      253,
      149,
      123
    ],
    "category": "pink"
  },
  {
    "code": "F2",
    "name": "F2",
    "enName": "F2",
    "hex": "#FC3D46",
    "rgb": [
      252,
      61,
      70
    ],
    "category": "red"
  },
  {
    "code": "F3",
    "name": "F3 (西瓜红)",
    "enName": "F3 (Watermelon Red)",
    "hex": "#F74941",
    "rgb": [
      247,
      73,
      65
    ],
    "category": "red"
  },
  {
    "code": "F4",
    "name": "F4",
    "enName": "F4",
    "hex": "#FC283C",
    "rgb": [
      252,
      40,
      60
    ],
    "category": "red"
  },
  {
    "code": "F5",
    "name": "F5",
    "enName": "F5",
    "hex": "#E7002F",
    "rgb": [
      231,
      0,
      47
    ],
    "category": "red"
  },
  {
    "code": "F6",
    "name": "F6",
    "enName": "F6",
    "hex": "#943630",
    "rgb": [
      148,
      54,
      48
    ],
    "category": "red"
  },
  {
    "code": "F7",
    "name": "F7",
    "enName": "F7",
    "hex": "#971937",
    "rgb": [
      151,
      25,
      55
    ],
    "category": "red"
  },
  {
    "code": "F8",
    "name": "F8",
    "enName": "F8",
    "hex": "#BC0028",
    "rgb": [
      188,
      0,
      40
    ],
    "category": "red"
  },
  {
    "code": "F9",
    "name": "F9",
    "enName": "F9",
    "hex": "#E2677A",
    "rgb": [
      226,
      103,
      122
    ],
    "category": "red"
  },
  {
    "code": "F10",
    "name": "F10",
    "enName": "F10",
    "hex": "#8A4526",
    "rgb": [
      138,
      69,
      38
    ],
    "category": "brown"
  },
  {
    "code": "F11",
    "name": "F11",
    "enName": "F11",
    "hex": "#5A2121",
    "rgb": [
      90,
      33,
      33
    ],
    "category": "red"
  },
  {
    "code": "F12",
    "name": "F12",
    "enName": "F12",
    "hex": "#FD4E6A",
    "rgb": [
      253,
      78,
      106
    ],
    "category": "red"
  },
  {
    "code": "F13",
    "name": "F13",
    "enName": "F13",
    "hex": "#F35744",
    "rgb": [
      243,
      87,
      68
    ],
    "category": "red"
  },
  {
    "code": "F14",
    "name": "F14",
    "enName": "F14",
    "hex": "#FFA9AD",
    "rgb": [
      255,
      169,
      173
    ],
    "category": "pink"
  },
  {
    "code": "F15",
    "name": "F15",
    "enName": "F15",
    "hex": "#D30022",
    "rgb": [
      211,
      0,
      34
    ],
    "category": "red"
  },
  {
    "code": "F16",
    "name": "F16",
    "enName": "F16",
    "hex": "#FEC2A6",
    "rgb": [
      254,
      194,
      166
    ],
    "category": "orange"
  },
  {
    "code": "F17",
    "name": "F17",
    "enName": "F17",
    "hex": "#E69C79",
    "rgb": [
      230,
      156,
      121
    ],
    "category": "orange"
  },
  {
    "code": "F18",
    "name": "F18",
    "enName": "F18",
    "hex": "#D37C46",
    "rgb": [
      211,
      124,
      70
    ],
    "category": "orange"
  },
  {
    "code": "F19",
    "name": "F19",
    "enName": "F19",
    "hex": "#C1444A",
    "rgb": [
      193,
      68,
      74
    ],
    "category": "red"
  },
  {
    "code": "F20",
    "name": "F20",
    "enName": "F20",
    "hex": "#CD9391",
    "rgb": [
      205,
      147,
      145
    ],
    "category": "pink"
  },
  {
    "code": "F21",
    "name": "F21",
    "enName": "F21",
    "hex": "#F7B4C6",
    "rgb": [
      247,
      180,
      198
    ],
    "category": "pink"
  },
  {
    "code": "F22",
    "name": "F22",
    "enName": "F22",
    "hex": "#FDC0D0",
    "rgb": [
      253,
      192,
      208
    ],
    "category": "pink"
  },
  {
    "code": "F23",
    "name": "F23",
    "enName": "F23",
    "hex": "#F67E66",
    "rgb": [
      246,
      126,
      102
    ],
    "category": "pink"
  },
  {
    "code": "F24",
    "name": "F24",
    "enName": "F24",
    "hex": "#E698AA",
    "rgb": [
      230,
      152,
      170
    ],
    "category": "pink"
  },
  {
    "code": "F25",
    "name": "F25 (西瓜红)",
    "enName": "F25 (Watermelon Red)",
    "hex": "#E54B4F",
    "rgb": [
      229,
      75,
      79
    ],
    "category": "red"
  },
  {
    "code": "G1",
    "name": "G1",
    "enName": "G1",
    "hex": "#FFE2CE",
    "rgb": [
      255,
      226,
      206
    ],
    "category": "orange"
  },
  {
    "code": "G2",
    "name": "G2 (亮肉色)",
    "enName": "G2 (Peach Cream)",
    "hex": "#FFC4AA",
    "rgb": [
      255,
      196,
      170
    ],
    "category": "orange"
  },
  {
    "code": "G3",
    "name": "G3 (柔粉)",
    "enName": "G3 (Pastel Pink)",
    "hex": "#F4C3A5",
    "rgb": [
      244,
      195,
      165
    ],
    "category": "orange"
  },
  {
    "code": "G4",
    "name": "G4",
    "enName": "G4",
    "hex": "#E1B383",
    "rgb": [
      225,
      179,
      131
    ],
    "category": "orange"
  },
  {
    "code": "G5",
    "name": "G5",
    "enName": "G5",
    "hex": "#EDB045",
    "rgb": [
      237,
      176,
      69
    ],
    "category": "orange"
  },
  {
    "code": "G6",
    "name": "G6",
    "enName": "G6",
    "hex": "#E99C17",
    "rgb": [
      233,
      156,
      23
    ],
    "category": "orange"
  },
  {
    "code": "G7",
    "name": "G7",
    "enName": "G7",
    "hex": "#9D5B3E",
    "rgb": [
      157,
      91,
      62
    ],
    "category": "brown"
  },
  {
    "code": "G8",
    "name": "G8",
    "enName": "G8",
    "hex": "#753832",
    "rgb": [
      117,
      56,
      50
    ],
    "category": "red"
  },
  {
    "code": "G9",
    "name": "G9",
    "enName": "G9",
    "hex": "#E6B483",
    "rgb": [
      230,
      180,
      131
    ],
    "category": "orange"
  },
  {
    "code": "G10",
    "name": "G10",
    "enName": "G10",
    "hex": "#D98C39",
    "rgb": [
      217,
      140,
      57
    ],
    "category": "orange"
  },
  {
    "code": "G11",
    "name": "G11",
    "enName": "G11",
    "hex": "#E0C593",
    "rgb": [
      224,
      197,
      147
    ],
    "category": "brown"
  },
  {
    "code": "G12",
    "name": "G12",
    "enName": "G12",
    "hex": "#FFC890",
    "rgb": [
      255,
      200,
      144
    ],
    "category": "orange"
  },
  {
    "code": "G13",
    "name": "G13",
    "enName": "G13",
    "hex": "#B7714A",
    "rgb": [
      183,
      113,
      74
    ],
    "category": "brown"
  },
  {
    "code": "G14",
    "name": "G14",
    "enName": "G14",
    "hex": "#8D614C",
    "rgb": [
      141,
      97,
      76
    ],
    "category": "brown"
  },
  {
    "code": "G15",
    "name": "G15 (樱花粉)",
    "enName": "G15 (Sakura Pink)",
    "hex": "#FCF9E0",
    "rgb": [
      252,
      249,
      224
    ],
    "category": "monochrome"
  },
  {
    "code": "G16",
    "name": "G16 (奶茶色)",
    "enName": "G16 (Beige)",
    "hex": "#F2D9BA",
    "rgb": [
      242,
      217,
      186
    ],
    "category": "orange"
  },
  {
    "code": "G17",
    "name": "G17",
    "enName": "G17",
    "hex": "#78524B",
    "rgb": [
      120,
      82,
      75
    ],
    "category": "red"
  },
  {
    "code": "G18",
    "name": "G18",
    "enName": "G18",
    "hex": "#FFE4CC",
    "rgb": [
      255,
      228,
      204
    ],
    "category": "orange"
  },
  {
    "code": "G19",
    "name": "G19",
    "enName": "G19",
    "hex": "#E07935",
    "rgb": [
      224,
      121,
      53
    ],
    "category": "orange"
  },
  {
    "code": "G20",
    "name": "G20",
    "enName": "G20",
    "hex": "#A94023",
    "rgb": [
      169,
      64,
      35
    ],
    "category": "red"
  },
  {
    "code": "G21",
    "name": "G21",
    "enName": "G21",
    "hex": "#B88558",
    "rgb": [
      184,
      133,
      88
    ],
    "category": "brown"
  },
  {
    "code": "H1",
    "name": "H1 (白色)",
    "enName": "H1 (White)",
    "hex": "#FDFBFF",
    "rgb": [
      253,
      251,
      255
    ],
    "category": "monochrome"
  },
  {
    "code": "H2",
    "name": "白色",
    "enName": "White",
    "hex": "#FEFFFF",
    "rgb": [
      254,
      255,
      255
    ],
    "category": "monochrome"
  },
  {
    "code": "H3",
    "name": "H3 (浅灰)",
    "enName": "H3 (Light Grey)",
    "hex": "#B6B1BA",
    "rgb": [
      182,
      177,
      186
    ],
    "category": "monochrome"
  },
  {
    "code": "H4",
    "name": "H4 (中灰)",
    "enName": "H4 (Grey)",
    "hex": "#89858C",
    "rgb": [
      137,
      133,
      140
    ],
    "category": "monochrome"
  },
  {
    "code": "H5",
    "name": "H5 (深灰)",
    "enName": "H5 (Dark Grey)",
    "hex": "#48464E",
    "rgb": [
      72,
      70,
      78
    ],
    "category": "monochrome"
  },
  {
    "code": "H6",
    "name": "H6",
    "enName": "H6",
    "hex": "#2F2B2F",
    "rgb": [
      47,
      43,
      47
    ],
    "category": "monochrome"
  },
  {
    "code": "H7",
    "name": "黑色",
    "enName": "Black",
    "hex": "#000000",
    "rgb": [
      0,
      0,
      0
    ],
    "category": "monochrome"
  },
  {
    "code": "H8",
    "name": "H8",
    "enName": "H8",
    "hex": "#E7D6DB",
    "rgb": [
      231,
      214,
      219
    ],
    "category": "pink"
  },
  {
    "code": "H9",
    "name": "H9 (樱花粉)",
    "enName": "H9 (Sakura Pink)",
    "hex": "#EDEDED",
    "rgb": [
      237,
      237,
      237
    ],
    "category": "monochrome"
  },
  {
    "code": "H10",
    "name": "H10 (樱花粉)",
    "enName": "H10 (Sakura Pink)",
    "hex": "#EEE9EA",
    "rgb": [
      238,
      233,
      234
    ],
    "category": "pink"
  },
  {
    "code": "H11",
    "name": "H11 (沙滩黄)",
    "enName": "H11 (Sand)",
    "hex": "#CECDD5",
    "rgb": [
      206,
      205,
      213
    ],
    "category": "monochrome"
  },
  {
    "code": "H12",
    "name": "H12 (樱花粉)",
    "enName": "H12 (Sakura Pink)",
    "hex": "#FFF5ED",
    "rgb": [
      255,
      245,
      237
    ],
    "category": "monochrome"
  },
  {
    "code": "H13",
    "name": "H13",
    "enName": "H13",
    "hex": "#F5ECD2",
    "rgb": [
      245,
      236,
      210
    ],
    "category": "orange"
  },
  {
    "code": "H14",
    "name": "H14",
    "enName": "H14",
    "hex": "#CFD7D3",
    "rgb": [
      207,
      215,
      211
    ],
    "category": "monochrome"
  },
  {
    "code": "H15",
    "name": "H15",
    "enName": "H15",
    "hex": "#98A6A8",
    "rgb": [
      152,
      166,
      168
    ],
    "category": "monochrome"
  },
  {
    "code": "H16",
    "name": "H16 (黑色)",
    "enName": "H16 (Black)",
    "hex": "#1D1414",
    "rgb": [
      29,
      20,
      20
    ],
    "category": "monochrome"
  },
  {
    "code": "H17",
    "name": "H17 (樱花粉)",
    "enName": "H17 (Sakura Pink)",
    "hex": "#F1EDED",
    "rgb": [
      241,
      237,
      237
    ],
    "category": "monochrome"
  },
  {
    "code": "H18",
    "name": "H18 (白色)",
    "enName": "H18 (White)",
    "hex": "#FFFDF0",
    "rgb": [
      255,
      253,
      240
    ],
    "category": "monochrome"
  },
  {
    "code": "H19",
    "name": "H19 (樱花粉)",
    "enName": "H19 (Sakura Pink)",
    "hex": "#F6EFE2",
    "rgb": [
      246,
      239,
      226
    ],
    "category": "monochrome"
  },
  {
    "code": "H20",
    "name": "H20",
    "enName": "H20",
    "hex": "#949FA3",
    "rgb": [
      148,
      159,
      163
    ],
    "category": "monochrome"
  },
  {
    "code": "H21",
    "name": "H21",
    "enName": "H21",
    "hex": "#FFFBE1",
    "rgb": [
      255,
      251,
      225
    ],
    "category": "monochrome"
  },
  {
    "code": "H22",
    "name": "H22 (沙滩黄)",
    "enName": "H22 (Sand)",
    "hex": "#CACAD4",
    "rgb": [
      202,
      202,
      212
    ],
    "category": "blue"
  },
  {
    "code": "H23",
    "name": "H23",
    "enName": "H23",
    "hex": "#9A9D94",
    "rgb": [
      154,
      157,
      148
    ],
    "category": "monochrome"
  },
  {
    "code": "M1",
    "name": "M1 (浅灰)",
    "enName": "M1 (Light Grey)",
    "hex": "#BCC6B8",
    "rgb": [
      188,
      198,
      184
    ],
    "category": "green"
  },
  {
    "code": "M2",
    "name": "M2",
    "enName": "M2",
    "hex": "#8AA386",
    "rgb": [
      138,
      163,
      134
    ],
    "category": "green"
  },
  {
    "code": "M3",
    "name": "M3",
    "enName": "M3",
    "hex": "#697D80",
    "rgb": [
      105,
      125,
      128
    ],
    "category": "teal"
  },
  {
    "code": "M4",
    "name": "M4 (奶茶色)",
    "enName": "M4 (Beige)",
    "hex": "#E3D2BC",
    "rgb": [
      227,
      210,
      188
    ],
    "category": "brown"
  },
  {
    "code": "M5",
    "name": "M5",
    "enName": "M5",
    "hex": "#D0CCAA",
    "rgb": [
      208,
      204,
      170
    ],
    "category": "brown"
  },
  {
    "code": "M6",
    "name": "M6",
    "enName": "M6",
    "hex": "#B0A782",
    "rgb": [
      176,
      167,
      130
    ],
    "category": "brown"
  },
  {
    "code": "M7",
    "name": "M7 (土黄)",
    "enName": "M7 (Ochre)",
    "hex": "#B4A497",
    "rgb": [
      180,
      164,
      151
    ],
    "category": "brown"
  },
  {
    "code": "M8",
    "name": "M8",
    "enName": "M8",
    "hex": "#B38281",
    "rgb": [
      179,
      130,
      129
    ],
    "category": "red"
  },
  {
    "code": "M9",
    "name": "M9",
    "enName": "M9",
    "hex": "#A58767",
    "rgb": [
      165,
      135,
      103
    ],
    "category": "brown"
  },
  {
    "code": "M10",
    "name": "M10",
    "enName": "M10",
    "hex": "#C5B2BC",
    "rgb": [
      197,
      178,
      188
    ],
    "category": "pink"
  },
  {
    "code": "M11",
    "name": "M11",
    "enName": "M11",
    "hex": "#9F7594",
    "rgb": [
      159,
      117,
      148
    ],
    "category": "pink"
  },
  {
    "code": "M12",
    "name": "M12",
    "enName": "M12",
    "hex": "#644749",
    "rgb": [
      100,
      71,
      73
    ],
    "category": "red"
  },
  {
    "code": "M13",
    "name": "M13",
    "enName": "M13",
    "hex": "#D19066",
    "rgb": [
      209,
      144,
      102
    ],
    "category": "brown"
  },
  {
    "code": "M14",
    "name": "M14",
    "enName": "M14",
    "hex": "#C77362",
    "rgb": [
      199,
      115,
      98
    ],
    "category": "red"
  },
  {
    "code": "M15",
    "name": "M15",
    "enName": "M15",
    "hex": "#757D78",
    "rgb": [
      117,
      125,
      120
    ],
    "category": "monochrome"
  }
];

// 分类名称映射表 (用于在色卡百科页面呈现漂亮的选项卡)
const CATEGORY_MAP = {
  'all': '全部',
  'monochrome': '黑白灰',
  'red': '红色',
  'pink': '粉色',
  'orange': '橙色',
  'yellow': '黄色',
  'green': '绿色',
  'blue': '蓝色',
  'purple': '紫色',
  'brown': '棕褐/毛色',
  'teal': '青/荧光'
};

/**
 * 欧氏距离 (RGB Euclidean Distance) - 基础匹配
 */
function getEuclideanDistance(rgb1, rgb2) {
  return Math.sqrt(
    Math.pow(rgb1[0] - rgb2[0], 2) +
    Math.pow(rgb1[1] - rgb2[1], 2) +
    Math.pow(rgb1[2] - rgb2[2], 2)
  );
}

/**
 * redmean 算法 - 一种极高精度且快速的感知色彩距离算法
 * 相比纯 RGB 欧氏距离，它更能体现人类肉眼对红绿蓝三色明度变化的敏感度
 */
function getPerceptualDistance(rgb1, rgb2) {
  const r1 = rgb1[0], g1 = rgb1[1], b1 = rgb1[2];
  const r2 = rgb2[0], g2 = rgb2[1], b2 = rgb2[2];
  
  const rMean = (r1 + r2) / 2;
  const deltaR = r1 - r2;
  const deltaG = g1 - g2;
  const deltaB = b1 - b2;
  
  // redmean 权重加成公式
  const weightR = 2 + rMean / 256;
  const weightG = 4;
  const weightB = 2 + (255 - rMean) / 256;
  
  return Math.sqrt(
    weightR * deltaR * deltaR +
    weightG * deltaG * deltaG +
    weightB * deltaB * deltaB
  );
}

/**
 * 将给定的 RGB 颜色匹配到 Artkal 色卡数据库中最接近的颜色
 * @param {Array} rgb - 目标 RGB 颜色 [R, G, B]
 * @returns {Object} 匹配到的色卡数据对象
 */
function matchBeadColor(rgb) {
  let minDistance = Infinity;
  let bestMatch = ARTKAL_C_COLORS[0];
  
  for (let i = 0; i < ARTKAL_C_COLORS.length; i++) {
    const bead = ARTKAL_C_COLORS[i];
    const dist = getPerceptualDistance(rgb, bead.rgb);
    if (dist < minDistance) {
      minDistance = dist;
      bestMatch = bead;
    }
  }
  
  return bestMatch;
}

/**
 * 辅助函数：十六进制 Hex 转 RGB
 */
function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : [0, 0, 0];
}

/**
 * 辅助函数：RGB 转 十六进制 Hex
 */
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

module.exports = {
  ARTKAL_C_COLORS,
  CATEGORY_MAP,
  matchBeadColor,
  hexToRgb,
  rgbToHex,
  getPerceptualDistance
};
