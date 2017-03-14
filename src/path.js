const I = require('immutable');
const R = require('ramda');
const _ = require('lodash/fp');

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

module.exports = ({ object }) => {
  const { value, path, pathStr } = object;
  const immVal = I.fromJS(value);
  return suite
    .add('immutable.getIn', () => { immVal.getIn(path); })
    .add('ramda.path'     , () => { R.path(path, value); })
    .add('lodash.get'     , () => { _.get(pathStr, value); });

}
