const { size } = require('./constants');
module.exports = {
  empty: {
    value: {},
    path: [],
    pathStr: '',
  },
  singleton: {
    value: {a:1},
    path: ['a'],
    pathStr: 'a',
  },
  small: {
    value: {a:{b:{c:5}}},
    path: ['a', 'b', 'c'],
    pathStr: 'a.b.c',
  },
  medium: {
    value: {a:{b:{c:{d:{e:5}}}}},
    path: ['a', 'b', 'c', 'd', 'e'],
    pathStr: 'a.b.c.d.e',
  },
  large: {
    value: {a:{b:{c:{d:{e:{f:{g:{h:{i:{j:10}}}}}}}}}},
    path: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
    pathStr: 'a.b.c.d.e.f.g.h.i.j',
  },
}[size];
