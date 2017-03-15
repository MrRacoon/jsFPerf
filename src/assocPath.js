const I    = require('immutable');
const R    = require('ramda');
const _    = require('lodash/fp');
const mori = require('mori');

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite('assocPath');

module.exports = ({ object }) => {
  const { value, path, pathStr } = object;
  const immVal  = I.fromJS(value);
  const moriVal = mori.toClj(value);
  return suite
    .add('immutable.setIn', () => { immVal.setIn(path, 42); })
    .add('mori.assocIn', () => { mori.assocIn(moriVal, path, 42); })
    .add('ramda.assocPath', () => { R.assocPath(path, 42, value); })
    .add('lodash.set (string path)', () => { _.set(pathStr, 42,  value); })
    .add('lodash.set (array path)', () => { _.set(path, 42,  value); });
}
