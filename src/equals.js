const R = require('ramda');
const I = require('immutable');
const _  = require('lodash');

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite('equals');

module.exports = ({ object }) => {
  const secondObject = Object.assign({}, object);
  const firstMap = I.Map(object);
  const secondMap = I.Map(object);

  return suite
    .add('lodash.isEqual', () => { _.isEqual(object, secondObject); })
    .add('immutable.is', () => { I.is(firstMap, secondMap); })
    .add('ramda.equals', () => { R.equals(object, secondObject); });
}
