const R = { always, range } = require('ramda');
module.exports = {
  empty: {
    value: [],
    index: 0,
  },
  singleton: {
    value: [1],
    index: 0,
  },
  wide: {
    value: range(0, 1000),
    index: 500,
  },
  deep: {
    value: range(0, 1000).reduce(R.of, 42),
    index: 0,
    path: range(0, 1000).map(always(0)),
    pathStr: range(0, 1000).map(always(0)).join('.'),
  },
};
