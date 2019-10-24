#!/usr/bin/env node

'use strict';

var fs = require('fs');
var program = require('commander');
var processYamlFile = require('./custom-resolve');
var domainSelector = require('./selective-domain-gen');

program
    .version('0.0.1')
    .usage('[options] <yaml file ...>')
    .parse(process.argv);


var inputYamlFile = program.args[0];

if (!fs.existsSync(inputYamlFile)) {
    console.error('YAML file doesn\'t exist. (' + inputYamlFile + ')');
    process.exit(1);
}


var selectedDomains = program.args.slice(1);

if (selectedDomains && selectedDomains.length) {
    console.warn("Combining YAML configurations for following %d domain(s) into a single JSON file: %s", selectedDomains.length, selectedDomains);
    var temporaryFileForSelectedDomains = domainSelector.extractDomains(inputYamlFile, selectedDomains);
    processYamlFile(temporaryFileForSelectedDomains);
    fs.unlink(temporaryFileForSelectedDomains, function (err) {
        if (err) {
            console.error(err);
        }
    });
} else {
    console.warn("Combining YAML configurations for all domains into a single JSON file.");
    processYamlFile(inputYamlFile);
}
console.warn("Completed.");
