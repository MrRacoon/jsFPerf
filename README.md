jsFPerf
=======

[![Build Status](https://travis-ci.org/MrRacoon/jsFPerf.svg?branch=master)](https://travis-ci.org/MrRacoon/jsFPerf)

**To see the latest results, check the [travis build](https://travis-ci.org/MrRacoon/jsFPerf).**

Lots of talk about which immutable solution is faster and for what.

I made this repository because I was curious what the stats would be.


Installation
------------

```shell
npm i -g jsfperf
```

Usage
-----

By default, `jsfperf` will run all of the available tests with small sample
sizes.

if You want to alter the size of the samples, you can choose between `empty`, `singleton`, `small`, `medium`, `large`.

If you only want to run a subset of the tests, you can append their names to the command.

```shell
# run all tests with small samples
jsfperf

# run the find benchmark with medium samples
jsfperf -m find

# run the find and assocPath benchmarks with empty samples
jsfperf --empty find assocPath

# run all tests with large samples
jsfperf --large
```
