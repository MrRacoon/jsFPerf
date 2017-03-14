const I = require('immutable');
const R = require('ramda');
const _ = require('lodash/fp');

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

const size = 'large';
console.log(`testing assocPath with ${size} objects`);

const { value, path, pathStr } = require('./utils/object');

const immVal = I.fromJS(value);

module.exports = suite
  .add('immutable.setIn', () => { immVal.setIn(path, 42); })
  .add('ramda.assocPath', () => { R.assocPath(path, 42, value); })
  .add('lodash.update'  , () => { _.update(pathStr, 42,  value); });
