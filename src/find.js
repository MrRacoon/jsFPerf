const I    = require('immutable');
const R    = require('ramda');
const _    = require('lodash/fp');
const mori = require('mori');

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

module.exports = ({ list }) => {
  const { value, index } = list;
  const immVal = I.fromJS(value);
  const pred = R.equals(index);
  return suite
    .add('immutable.find', function () {
      immVal.find(pred);
    })
    .add('mori.some', function () {
      mori.some(pred, moriVal);
    })
    .add('ramda.find', function () {
      R.find(pred, value);
    })
    .add('lodash.find', function () {
      _.find(pred, value);
    });
};
