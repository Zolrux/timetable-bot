function calculateLab1Mk(message) {
  const t = 56;
  const splitArr = message.split(' ');
  const N = splitArr[splitArr.length - 1];

  const equations = {
    0: {
      equation: 200 + N * 5 + 10 - 10 * (N / 10),
      interval: '0 <= t <= 6',
    },
    6: {
      equation: 200 + N * 5 - 100 - 5 * (N / 10),
      interval: '6 <= t <= 10',
    },
    10: {
      equation: 200 + N * 5 + 50 - 10 * N,
      interval: '10 <= t <= 16',
    },
    16: {
      equation: 200 + N * 5 - 195 + N * 5,
      interval: '16 <= t <= 21',
    },
    21: {
      equation: 200 + N * 5 + 20,
      interval: '21 <= t <= 31',
    },
    31: {
      equation: 200 + N * 5 - 195,
      interval: '31 <= t <= 41',
    },
    41: {
      equation: 200 + N * 5 + 20 - 10 * N,
      interval: '41 <= t <= 46',
    },
    46: {
      equation: 200 + N * 5 + 50 - 50 * (N / 10),
      interval: '46 <= t <= 51',
    },
    51: {
      equation: 200 + N * 5 - 100,
      interval: '51 <= t <= 56',
    },
    56: {
      equation: 200 + N * 5 + 10 + 5 * (N / 10),
      interval: '56 <= t <= 60',
    },
  };

  let msg = '';
  for (let i = 0; i <= t; i++) {
    if (i in equations) {
      const { equation: result, interval } = equations[i];
      msg += `${result},       ${interval}\n`;
    }
  }
  return msg;
}

module.exports = calculateLab1Mk;
