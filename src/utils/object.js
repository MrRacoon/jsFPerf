const { assoc, compose, map, mergeAll, range } = require('ramda');
module.exports = {
  empty: {
    value: {},
    prop: '',
    path: [],
    pathStr: '',
  },
  singleton: {
    value: {a:1},
    prop: 'a',
    path: ['a'],
    pathStr: 'a',
  },
  deep: {
    value: {a:{b:{c:{d:{e:{f:{g:{h:{i:{j:10}}}}}}}}}},
    prop: 'a',
    path: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
    pathStr: 'a.b.c.d.e.f.g.h.i.j',
  },
  wide: {
    value: compose(mergeAll, map(p=>assoc(p,p,{})), range(0))(1000),
    prop: '500',
    path: ['500'],
    pathStr: '500',
  },
};
