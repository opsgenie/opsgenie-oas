var fs = require('fs');

module.exports = {
    extractDomains: function (file, domains) {
        var outputFile = "./tempDomains.yaml";

        fs.readFileSync(file).toString().split('\n').forEach(function (line) {
            if (line.toString().includes("$ref:")) {
                if (lineContainsDomainsCheck(line, domains) || line.toString().includes("common")) {
                    fs.appendFileSync(outputFile, line.toString() + "\n");
                }
            } else {
                fs.appendFileSync(outputFile, line.toString() + "\n");
            }
        });

        return outputFile;
    }
};

function lineContainsDomainsCheck(line, domains) {
    for (var i = 0; i < domains.length; i++) {
        if (line.toString().includes(domains[i])) {
            return true;
        }
    }

    return false;
}