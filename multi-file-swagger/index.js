#!/usr/bin/env node

'use strict';

var fs = require('fs');
var program = require('commander');
var resolve = require('./custom-resolve');
var selectiveDomainGen = require('./selective-domain-gen');

program
    .version('0.0.1')
    .usage('[options] <yaml file ...>')
    .parse(process.argv);

var file = program.args[0];

if (!fs.existsSync(file)) {
    console.error('File does not exist. (' + file + ')');
    process.exit(1);
}

var domain = program.args[2];

if (domain) {
    var singleDomain = selectiveDomainGen.extractDomain(file, domain);

    resolve(singleDomain);

    fs.unlink(singleDomain, function (err) {
        if (err) return console.log(err);
    });
} else {
    resolve(file);
}
