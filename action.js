const core = require("@actions/core");

const clarinet = require("clarinet");
const parser = clarinet.parser();

const fs = require("fs");
const path = require("path");

const files = process.env.JSON_FILES.split(",");
const workspace = process.env.GITHUB_WORKSPACE;

var duplicates = {};

var numDupes = 0;

var currentKeys = [];

parser.onkey = parser.onopenobject = k => {
    currentKeys.push(k);
};

for (let i in files) {
    let currentPath = path.join(workspace, files[i]);
    let currentContents = fs.readFileSync(currentPath, "utf8");
    currentKeys = [];
    parser.write(currentContents).close();
    duplicates[files[i]] = currentKeys.filter((e, index, arr) => arr.indexOf(e) !== index);
    if (duplicates[files[i]].length > 0) {
        numDupes++;
    }
}

if (numDupes > 0) {
    core.setOutput("duplicates", JSON.stringify(duplicates));
    core.setFailed(`${numDupes} duplicate keys found in JSON files. Keys duplicated by file: ${JSON.stringify(duplicates)}`);
} else {
    core.info("All files passed validation!");
}