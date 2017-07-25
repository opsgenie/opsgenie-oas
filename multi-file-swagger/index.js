#!/usr/bin/env node

'use strict';

var fs = require('fs');
var program = require('commander');
var resolve = require('./custom-resolve');

program
  .version('0.0.1')
  .usage('[options] <yaml file ...>')
  .parse(process.argv);

var file = program.args[0];

if (!fs.existsSync(file)) {
  console.error('File does not exist. ('+file+')');
  process.exit(1);
}

resolve(file);
