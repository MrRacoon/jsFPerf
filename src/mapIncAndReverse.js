const R    = require('ramda');
const I    = require('immutable');
const _    = require('lodash');
const fp   = require('lodash/fp');

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite('mapIncAndReverse');

module.exports = ({ object }) => {
  const { value } = object;
  const immVal = I.fromJS(value);
  return suite
    .add('lodash.chain().map(inc).reverse()', () => {
      _.chain(value)
        .map(_.inc)
        .reverse()
        .value();
    })
    .add('lodash.flowRight(reverse, map(inc))', () => {
      _.flowRight(
        _.reverse,
        _.partial(_.map, _, _.inc)
      )(value);
    })
    .add('lodash/fp.compose(reverse, map(inc))', () => {
      fp.compose(
        fp.reverse,
        fp.map(fp.inc)
      )(value);
    })
    .add('ramda.compose(reverse, map(inc))', () => {
      R.compose(
        R.reverse,
        R.map(R.inc)
      )(value);
    });
}
