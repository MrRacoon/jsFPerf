const I = require('immutable');
const R = require('ramda');
const _ = require('lodash/fp');

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

module.exports = ({ object }) => {
  const { value, index } = object;
  const immVal = I.fromJS(value);
  const pred = R.equals(500);
  return suite
    .add('immutable.find', function () {
      immVal.find(pred);
    })
    .add('ramda.find', function () {
      R.find(pred, value);
    })
    .add('lodash.find', function () {
      _.find(pred, value);
    });
};
