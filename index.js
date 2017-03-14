const { __, find, map, prop } = require('ramda');

const availTests = ['assocPath', 'find', 'path'];
const availsizes = ['empty', 'singleton', 'small', 'medium', 'large'];

const Getopt = require('node-getopt');
const getopt = new Getopt([
  ['e', 'empty', 'use empty samples'],
  ['t', 'singleton', 'use singleton samples'],
  ['s', 'small', 'use small samples'],
  ['m', 'medium', 'use medium samples'],
  ['l', 'large', 'use largs samples'],
  ['h', 'help', 'display this help'],
]).setHelp(
  "Usage: jsfperf [OPTIONS] <list of modules>\n" +
  "\n" +
  "Benchmark funcitonal javascript libraries including\n" +
  "\n" +
  `${availTests.toString()}\n` +
  "\n" +
  "[[OPTIONS]]\n" +
  "\n" +
  "Respository: https://github.com/MrRacoon/jsFPerf.git\n" +
  "Installation: git clone $REPO; cd jsperf; npm i -g\n"
);

const { argv, options } = getopt.bindHelp().parseSystem();

const size = find(prop(__, options), availsizes) || 'small';
const tests = argv.length ? argv : availTests;

console.log('Running tests:', tests.toString());
console.log('Sample Size:', size, '\n');


map(test => {
  require(`./src/${test}`)(size)
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    .on('complete', function() {
      console.log('Fastest is ' + this.filter('fastest').map('name') + '\n');
    })
    .run({ async: false });
}, tests);
