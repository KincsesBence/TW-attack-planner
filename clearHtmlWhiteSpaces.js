const fs = require('fs');
const pathDist="./dist/bundle.js";

fs.readFile(pathDist, 'utf8', (err, data) => {
    data = data.replaceAll(/\\n\s+/g,'');
    fs.writeFile(pathDist, data, err => {});
});

