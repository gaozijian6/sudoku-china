const board = [
  [
    {
      value: 8,
      isGiven: false,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [1, 2, 4, 6],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 4, 5, 6, 9],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 3, 4, 7],
    },
    {
      value: null,
      isGiven: false,
      draft: [1, 2, 3, 5, 7],
    },
    {
      value: null,
      isGiven: false,
      draft: [1, 2, 3, 4],
    },
    {
      value: null,
      isGiven: false,
      draft: [1, 3, 5, 6, 9],
    },
    {
      value: null,
      isGiven: false,
      draft: [4, 5, 7, 9],
    },
    {
      value: null,
      isGiven: false,
      draft: [1, 3, 4, 5, 6, 7, 9],
    },
  ],
  [
    {
      value: null,
      isGiven: false,
      draft: [1, 2, 4, 5, 9],
    },
    {
      value: null,
      isGiven: false,
      draft: [1, 2, 4],
    },
    {
      value: 3,
      isGiven: false,
      draft: [],
    },
    {
      value: 6,
      isGiven: false,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [1, 2, 5, 7, 8],
    },
    {
      value: null,
      isGiven: false,
      draft: [1, 2, 4, 8],
    },
    {
      value: null,
      isGiven: false,
      draft: [1, 5, 8, 9],
    },
    {
      value: null,
      isGiven: false,
      draft: [4, 5, 7, 8, 9],
    },
    {
      value: null,
      isGiven: false,
      draft: [1, 4, 5, 7, 9],
    },
  ],
  [
    {
      value: null,
      isGiven: false,
      draft: [1, 4, 5, 6],
    },
    {
      value: 7,
      isGiven: false,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [4, 5, 6],
    },
    {
      value: null,
      isGiven: false,
      draft: [3, 4, 8],
    },
    {
      value: 9,
      isGiven: false,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [1, 3, 4, 8],
    },
    {
      value: 2,
      isGiven: false,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [4, 5, 8],
    },
    {
      value: null,
      isGiven: false,
      draft: [1, 3, 4, 5, 6],
    },
  ],
  [
    {
      value: null,
      isGiven: false,
      draft: [1, 2, 3, 4, 6, 9],
    },
    {
      value: 5,
      isGiven: false,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 4, 6, 9],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 3, 8, 9],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 3, 6, 8],
    },
    {
      value: 7,
      isGiven: false,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [1, 6, 8, 9],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 4, 8, 9],
    },
    {
      value: null,
      isGiven: false,
      draft: [1, 2, 4, 6, 9],
    },
  ],
  [
    {
      value: null,
      isGiven: false,
      draft: [1, 2, 3, 6, 9],
    },
    {
      value: null,
      isGiven: false,
      draft: [1, 2, 3, 6, 8],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 6, 9],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 3, 8, 9],
    },
    {
      value: 4,
      isGiven: false,
      draft: [],
    },
    {
      value: 5,
      isGiven: false,
      draft: [],
    },
    {
      value: 7,
      isGiven: false,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 8, 9],
    },
    {
      value: null,
      isGiven: false,
      draft: [1, 2, 6, 9],
    },
  ],
  [
    {
      value: null,
      isGiven: false,
      draft: [2, 4, 6, 7, 9],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 4, 6, 8],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 4, 6, 7, 9],
    },
    {
      value: 1,
      isGiven: false,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 6, 8],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 6, 8, 9],
    },
    {
      value: null,
      isGiven: false,
      draft: [5, 6, 8, 9],
    },
    {
      value: 3,
      isGiven: false,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 4, 5, 6, 9],
    },
  ],
  [
    {
      value: null,
      isGiven: false,
      draft: [2, 3, 4, 5, 7],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 3, 4],
    },
    {
      value: 1,
      isGiven: false,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 3, 4, 7, 9],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 3, 7],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 3, 4, 9],
    },
    {
      value: null,
      isGiven: false,
      draft: [3, 5, 9],
    },
    {
      value: 6,
      isGiven: false,
      draft: [],
    },
    {
      value: 8,
      isGiven: false,
      draft: [],
    },
  ],
  [
    {
      value: null,
      isGiven: false,
      draft: [2, 3, 4, 6, 7],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 3, 4, 6],
    },
    {
      value: 8,
      isGiven: false,
      draft: [],
    },
    {
      value: 5,
      isGiven: false,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 3, 6, 7],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 3, 4, 6, 9],
    },
    {
      value: null,
      isGiven: false,
      draft: [3, 9],
    },
    {
      value: 1,
      isGiven: false,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 3, 7, 9],
    },
  ],
  [
    {
      value: null,
      isGiven: false,
      draft: [2, 3, 5, 6, 7],
    },
    {
      value: 9,
      isGiven: false,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 5, 6, 7],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 3, 7, 8],
    },
    {
      value: null,
      isGiven: false,
      draft: [1, 2, 3, 6, 7, 8],
    },
    {
      value: null,
      isGiven: false,
      draft: [1, 2, 3, 6, 8],
    },
    {
      value: 4,
      isGiven: false,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 5, 7],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 3, 5, 7],
    },
  ],
];
export default board;
