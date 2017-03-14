const { size } = require('./constants');
const range = n => Array.apply(null, Array(n)).map(function (_, i) {return i;});
module.exports = {
  empty: {
    value: [],
    index: 0,
  },
  singleton: {
    value: [1],
    index: 0,
  },
  small: {
    value: range(10),
    index: 5,
  },
  medium: {
    value: range(1000),
    index: 500,
  },
  large: {
    value: range(100000),
    index: 50000,
  },
}[size];
