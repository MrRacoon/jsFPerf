const I = require('immutable');
const R = require('ramda');
const _ = require('lodash/fp');

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

module.exports = ({ list }) => {
  const { value, index } = list;
  const immVal = I.fromJS(value);
  const pred = R.equals(index);
  return suite
    .add('immutable', function () {
      immVal.find(pred);
    })
    .add('ramda', function () {
      R.find(pred, value);
    })
    .add('lodash', function () {
      _.find(pred, value);
    })
    .add('vanilla', function() {
      value.find(pred);
    });
};
