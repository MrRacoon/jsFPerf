const { blue, yellow, cyan, green } = require('chalk');
const { __, find, map, prop } = require('ramda');

const availTests = ['assocPath', 'find', 'path', 'assoc'];
const availsizes = ['empty', 'singleton', 'small', 'medium', 'large'];

const Getopt = require('node-getopt');
const getopt = new Getopt([
  ['e', 'empty', 'use empty samples'],
  ['t', 'singleton', 'use singleton samples'],
  ['s', 'small', 'use small samples'],
  ['m', 'medium', 'use medium samples'],
  ['l', 'large', 'use largs samples'],
  ['v', 'verbose', 'show samples on the screen'],
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

const tests   = argv.length ? argv : availTests;
const size    = find(prop(__, options), availsizes) || 'small';
const samples = require('./src/utils')(size);

if (options.verbose) {
  console.log('Running tests:', cyan(tests.toString()));
  console.log('Sample Size:', cyan(size));
  console.log('samples', cyan(JSON.stringify(samples, null, 1)));
}

map(test => {
  require(`./src/${test}`)(samples)
    .on('cycle', function(event) {
      console.log(green(String(event.target)));
    })
    .on('complete', function() {
      console.log(blue('Fastest is ') + yellow(this.filter('fastest').map('name')) + '\n');
    })
    .run({ async: false });
}, tests);
