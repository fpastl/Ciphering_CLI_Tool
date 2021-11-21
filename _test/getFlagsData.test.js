const { notSetArgValue, repetitionsArg, notFoundArgCError } = require("../src/errors");
const { getFlagsData } = require("../src/getFlagsData");
const fucnProcess = './src/getFlagsData'

const correctValuestArray = [
  {
    title: 'correct input values',
    received: ['-c', 'a-c1', '-i', 'a.txt', '-o', 'b.txt'],
    expected: {
      cipherTypes: ['a', 'c1'],
      inputFile: 'a.txt',
      outputFile: 'b.txt',
    },
  },
  {
    title: 'correct input values without -o',
    received: ['-c', 'a-c1', '-i', 'a.txt'],
    expected: {
      cipherTypes: ['a', 'c1'],
      inputFile: 'a.txt',
      outputFile: false,
    },
  },
]
for (let i = 0; i < correctValuestArray.length; i++) {
  test(`input: "${correctValuestArray[i]['received']}" - ${correctValuestArray[i]['title']}; expected: object with data`, () => {
    const t = getFlagsData(correctValuestArray[i]['received']);
    expect(t).toEqual(correctValuestArray[i]['expected']);
  });
}

const errorsArray = [
  {
    title: 'empty -i',
    received: ['-c', 'a', '-i', '',],
    expected: notSetArgValue,
  },
  {
    title: 'empty -o',
    received: ['-c', 'a', '-o', '',],
    expected: notSetArgValue,
  },
  {
    title: 'empty -c',
    received: ['-c', '',],
    expected: notSetArgValue,
  },
  {
    title: 'twice arg -c',
    received: ['-c', 'a', '-c', 'a'],
    expected: repetitionsArg,
  },
  {
    title: 'twice arg -i',
    received: ['-c', 'a', '-i', 'i.txt','--input','i.txt'],
    expected: repetitionsArg,
  },
  {
    title: 'twice arg -o',
    received: ['-c', 'a', '-o', 'o.txt','--output','o.txt'],
    expected: repetitionsArg,
  },
  {
    title: 'not set -c',
    received: ['-i', 'a.txt', '-o', 'b.txt',],
    expected: notFoundArgCError,
  },
];
for (let i = 0; i < errorsArray.length; i++) {
  test(`input: ${errorsArray[i]['received']}; expected: error ${errorsArray[i]['title']}`, () => {

    const t = () => {
      getFlagsData(errorsArray[i]['received']);
    };
    expect(t).toThrow(errorsArray[i]['expected']);
  });
}
