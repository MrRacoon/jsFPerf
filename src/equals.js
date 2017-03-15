const R = require('ramda');
const I = require('immutable');
const _  = require('lodash');

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite('equals');

module.exports = ({ object }) => {
  const { value } = object;
  const secondObject = Object.assign({}, value);
  const firstMap = I.Map(value);
  const secondMap = I.Map(secondObject);

  return suite
    .add('lodash.isEqual', () => { _.isEqual(value, secondObject); })
    .add('immutable.is', () => { I.is(firstMap, secondMap); })
    .add('ramda.equals', () => { R.equals(value, secondObject); })
    // http://stackoverflow.com/questions/1068834/object-comparison-in-javascript
    .add('vanilla with JSON', () => { JSON.stringify(value) === JSON.stringify(secondObject); });
}
