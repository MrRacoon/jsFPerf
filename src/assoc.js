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
    .add('immutable'          , () => { immVal.set(prop, 42); })
    .add('lodash (Array)'     , () => { _.set(value, [prop], 42); })
    .add('lodash (String)'    , () => { _.set(value, prop, 42); })
    .add('lodash/fp (String)' , () => { fp.set(prop, 42, value); })
    .add('lodash/fp (Array)'  , () => { fp.set([prop], 42, value); })
    // .add('mori.assoc'            , () => { mori.assoc(moriVal, path, 42); })
    .add('ramda'              , () => { R.assoc(prop, 42, value); });
}
