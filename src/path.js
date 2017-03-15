const I = require('immutable');
const R = require('ramda');
const _ = require('lodash/fp');

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

module.exports = ({ object }) => {
  const { value, path, pathStr } = object;
  const immVal = I.fromJS(value);
  return suite
    .add('immutable', () => { immVal.getIn(path); })
    .add('ramda'    , () => { R.path(path, value); })
    .add('lodash'   , () => { _.get(pathStr, value); });

}
