const R    = require('ramda');
const I    = require('immutable');
const _    = require('lodash');
const fp   = require('lodash/fp');
// const mori = require('mori');

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite('mapFilterReduce');

const inc  = x => x + 1;
const even = x => x % 2;
const add  = (a, b) => a + b;

module.exports = ({ list }) => {
  const { value, index } = list;
  const immVal = I.fromJS(value);

  return suite
    .add('immutable', () => {
      immVal
        .map(inc)
        .filter(even)
        .reduce(add);
    })
    .add('lodash', () => {
      _.chain(value)
        .map(inc)
        .filter(even)
        .reduce(add)
        .value();
    })
    .add('lodash/fp', () => {
      fp.compose(
        fp.reduce(add, 0),
        fp.filter(even),
        fp.map(inc)
      )(value);
    })
    .add('ramda', () => {
      R.compose(
        R.reduce(add, 0),
        R.filter(even),
        R.map(inc)
      )(value);
    });
}
