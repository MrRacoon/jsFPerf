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
      const ans = fp.compose(
        fp.reverse,
        fp.map(fp.inc)
      )(value);
    })
    .add('vanilla', () => {
      const inc = k => value[k]+=1;
      Object
        .keys(value) // no object.values yet - stage-4 till May?
        .map(inc)
        .reverse();
    })
    .add('ramda.compose(reverse, map(inc))', () => {
      // is this intentional? this yields nothing since value is an object and reverse only takes a list
      R.compose(
        R.reverse,
        R.map(R.inc)
      )(value);
    })

}
