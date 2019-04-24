var fs = require('fs');

module.exports = {
    extractDomain: function (file, domain) {
        var outputFile = "./tempSingleDomain.yaml";

        fs.readFileSync(file).toString().split('\n').forEach(function (line) {
            if (line.toString().includes("$ref:")) {
                if (line.toString().includes(domain) || line.toString().includes("common")) {
                    fs.appendFileSync(outputFile, line.toString() + "\n");
                }
            } else {
                fs.appendFileSync(outputFile, line.toString() + "\n");
            }
        });

        return outputFile;
    }
};