const I = require('immutable');
const R = require('ramda');
const _ = require('lodash/fp');

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite('assocPath');

module.exports = ({ object }) => {
  const { value, path, pathStr } = object;
  const immVal = I.fromJS(value);
  return suite
    .add('immutable', () => { immVal.setIn(path, 42); })
    .add('ramda', () => { R.assocPath(path, 42, value); })
    .add('lodash', () => { _.update(pathStr, 42,  value); })
    .add('vanilla', () => { Object.assign({}, value, {[pathStr]:42})});
}
