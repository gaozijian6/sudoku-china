const board = [
  [
    {
      value: 8,
      isGiven: true,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [4, 7],
    },
    {
      value: 1,
      isGiven: false,
      draft: [],
    },
    {
      value: 6,
      isGiven: false,
      draft: [],
    },
    {
      value: 5,
      isGiven: true,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [3, 4, 7],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 3, 4],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 3, 4],
    },
    {
      value: 9,
      isGiven: true,
      draft: [],
    },
  ],
  [
    {
      value: 2,
      isGiven: false,
      draft: [],
    },
    {
      value: 6,
      isGiven: true,
      draft: [],
    },
    {
      value: 9,
      isGiven: false,
      draft: [],
    },
    {
      value: 1,
      isGiven: true,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [3, 4],
    },
    {
      value: 8,
      isGiven: true,
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
      draft: [3, 4],
    },
    {
      value: 7,
      isGiven: true,
      draft: [],
    },
  ],
  [
    {
      value: null,
      isGiven: false,
      draft: [4, 7],
    },
    {
      value: 5,
      isGiven: false,
      draft: [],
    },
    {
      value: 3,
      isGiven: true,
      draft: [],
    },
    {
      value: 2,
      isGiven: true,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [4, 7, 9],
    },
    {
      value: null,
      isGiven: false,
      draft: [4, 7, 9],
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
    {
      value: 1,
      isGiven: true,
      draft: [],
    },
  ],
  [
    {
      value: 5,
      isGiven: true,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 4, 7, 9],
    },
    {
      value: 8,
      isGiven: true,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [3, 9],
    },
    {
      value: 6,
      isGiven: true,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 3, 7, 9],
    },
    {
      value: null,
      isGiven: false,
      draft: [1, 3, 4, 7],
    },
    {
      value: null,
      isGiven: false,
      draft: [1, 3, 4, 7],
    },
    {
      value: null,
      isGiven: false,
      draft: [3, 4],
    },
  ],
  [
    {
      value: null,
      isGiven: false,
      draft: [4, 7],
    },
    {
      value: null,
      isGiven: false,
      draft: [4, 7, 9],
    },
    {
      value: 6,
      isGiven: false,
      draft: [],
    },
    {
      value: 8,
      isGiven: true,
      draft: [],
    },
    {
      value: 1,
      isGiven: false,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [3, 9],
    },
    {
      value: null,
      isGiven: false,
      draft: [3, 4, 7],
    },
    {
      value: 5,
      isGiven: true,
      draft: [],
    },
    {
      value: 2,
      isGiven: true,
      draft: [],
    },
  ],
  [
    {
      value: 3,
      isGiven: true,
      draft: [],
    },
    {
      value: 1,
      isGiven: true,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 7],
    },
    {
      value: 4,
      isGiven: false,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 7],
    },
    {
      value: 5,
      isGiven: true,
      draft: [],
    },
    {
      value: 9,
      isGiven: true,
      draft: [],
    },
    {
      value: 6,
      isGiven: false,
      draft: [],
    },
    {
      value: 8,
      isGiven: true,
      draft: [],
    },
  ],
  [
    {
      value: 6,
      isGiven: true,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 3, 7],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 4, 5, 7],
    },
    {
      value: null,
      isGiven: false,
      draft: [3, 5, 9],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 4, 9],
    },
    {
      value: 1,
      isGiven: true,
      draft: [],
    },
    {
      value: 8,
      isGiven: true,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 4, 7],
    },
    {
      value: null,
      isGiven: false,
      draft: [3, 4],
    },
  ],
  [
    {
      value: 9,
      isGiven: true,
      draft: [],
    },
    {
      value: 8,
      isGiven: false,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 4],
    },
    {
      value: 7,
      isGiven: true,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 3, 4],
    },
    {
      value: 6,
      isGiven: false,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [1, 2, 3, 4],
    },
    {
      value: null,
      isGiven: false,
      draft: [1, 2, 3, 4],
    },
    {
      value: 5,
      isGiven: true,
      draft: [],
    },
  ],
  [
    {
      value: 1,
      isGiven: true,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 3, 7],
    },
    {
      value: null,
      isGiven: false,
      draft: [4, 5, 7],
    },
    {
      value: null,
      isGiven: false,
      draft: [3, 5],
    },
    {
      value: 8,
      isGiven: true,
      draft: [],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 3, 4],
    },
    {
      value: null,
      isGiven: false,
      draft: [2, 3, 4, 7],
    },
    {
      value: 9,
      isGiven: true,
      draft: [],
    },
    {
      value: 6,
      isGiven: false,
      draft: [],
    },
  ],
];
export default board;
