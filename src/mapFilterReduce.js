const R    = require('ramda');
const I    = require('immutable');
const _    = require('lodash');
const fp   = require('lodash/fp');
const mu   = require('mudash');
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
    .add('lodash (chain)', () => {
      _.chain(value)
        .map(inc)
        .filter(even)
        .reduce(add)
        .value();
    })
    .add('lodash (flow)', () => {
      _.flowRight( // compose
        _.partial(_.reduce, _, add),
        _.partial(_.filter, _, even),
        _.partial(_.map, _, inc)
      )(value);
    })
    .add('lodash/fp', () => {
      fp.compose(
        fp.reduce(add, 0),
        fp.filter(even),
        fp.map(inc)
      )(value);
    })
    .add('mudash (chain)', () => {
      mu.chain(immVal)
        .map(inc)
        .filter(even)
        .reduce(add)
        .value();
    })
    .add('mudash (flow)', () => {
      mu.flowRight( // compose
        mu.partial(mu.reduce, mu, add),
        mu.partial(mu.filter, mu, even),
        mu.partial(mu.map, mu, inc)
      )(immVal);
    })
    .add('ramda', () => {
      R.compose(
        R.reduce(add, 0),
        R.filter(even),
        R.map(inc)
      )(value);
    });
}
