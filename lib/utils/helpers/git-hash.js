const fs = require("fs");
const commitHash = () => {
    const fs = require('fs');
    const rev = fs.readFileSync('.git/HEAD').toString().trim();

    if (!rev.includes(':')) {
        return rev;
    }
    return fs
        .readFileSync('.git/' + rev.slice(5))
        .toString()
        .trim();
};

module.exports = commitHash;
