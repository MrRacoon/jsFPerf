const R = require('ramda');
const I = require('immutable');
const _  = require('lodash');

const first =  { 'a': 1 };
const second = { 'a': 1 };

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite('equals');

module.exports = () => {
  const firstMap = I.Map(first);
  const secondMap = I.Map(second);

  return suite
    .add('lodash.isEqual', () => { _.isEqual(first, second); })
    .add('immutable.is', () => { I.is(firstMap, secondMap); })
    .add('ramda.equals', () => { R.equals(first, second); });
}
