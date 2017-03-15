const I    = require('immutable');
const R    = require('ramda');
const _    = require('lodash/fp');
const mori = require('mori');

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

module.exports = ({ object }) => {
  const { value, path, pathStr } = object;
  const immVal  = I.fromJS(value);
  const moriVal = mori.toClj(value);
  return suite
    .add('immutable.getIn',          () => { immVal.getIn(path); })
    .add('mori.getIn',               () => { mori.getIn(moriVal, path); })
    .add('ramda.path',               () => { R.path(path, value); })
    .add('lodash.get (string path)', () => { _.get(pathStr, value); })
    .add('lodash.get (array path)',  () => { _.get(path, value); });
}
