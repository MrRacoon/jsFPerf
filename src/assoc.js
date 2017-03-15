const R    = require('ramda');
const I    = require('immutable');
const _    = require('lodash');
const fp   = require('lodash/fp');
// const mori = require('mori');

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite('assoc');

module.exports = ({ object }) => {
  const { value, prop, path } = object;
  const immVal = I.fromJS(value);
  // I broke mori :(
  // const moriVal = mori.toClj(value);
  return suite
    .add('immutable.set'         , () => { immVal.set(prop, 42); })
    .add('lodash.set(w/ Array)'  , () => { _.set(value, [prop], 42); })
    .add('lodash.set(w/ String)' , () => { _.set(value, prop, 42); })
    .add('lodash/fp.set(String)' , () => { fp.set(prop, 42, value); })
    .add('lodash/fp.set(Array)'  , () => { fp.set(path, 42, value); })
    // .add('mori.assoc'            , () => { mori.assoc(moriVal, path, 42); })
    .add('ramda.assoc'           , () => { R.assoc(prop, 42, value); });
}
