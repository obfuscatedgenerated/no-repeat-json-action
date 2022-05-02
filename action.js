const core = require("@actions/core");
const gh = require("@actions/github");

const fs = require("fs");
const path = require("path");

const files = process.env.JSON_FILES.split(",");
const workspace = process.env.GITHUB_WORKSPACE;

var duplicates = [];

var numDupes = 0;

for (let i in files) {
    let currentPath = path.join(workspace, files[i]);
    let currentContents = fs.readFileSync(currentPath, "utf8");
    let currentJSON = JSON.parse(currentContents);
    let currentKeys = Object.keys(currentJSON);
    duplicates[files[i]].push(
        currentKeys.filter(item => {
            if (set.has(item)) {
                set.delete(item);
            } else {
                return item;
            }
        })
    );
    if (duplicates[files[i]].length > 0) {
        numDupes++;
    }
}

if (numDupes > 0) {
    core.setOutput("duplicates", JSON.stringify(duplicates));
    core.setFailed(`${numDupes} duplicate keys found in JSON files. Keys duplicated by file: ${duplicates}`);
}