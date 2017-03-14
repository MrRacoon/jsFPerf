const R = require('ramda');
const I = require('immutable');
const _  = require('lodash');
const mori = require('mori');
const NUM_PROPS = 1;
const value = R.range(0, NUM_PROPS).reduce((acc, p) => R.assoc(p, p, acc), {});
const prop = 'prop';

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite('assoc');

module.exports = () => {
  const immVal = I.fromJS(value);
  const moriVal = mori.toClj(value);

  return suite
    .add('lodash.set (array path)', () => { _.set(prop, 42,  value); })
    .add('lodash.set (string path)', () => { _.set([prop], 42,  value); })
    .add('immutable.set', () => { immVal.set(prop, 42); })
    .add('mori.assoc', () => { mori.assoc(moriVal, prop, 42); })
    .add('ramda.assoc', () => { R.assoc(prop, 42, value); });
}
