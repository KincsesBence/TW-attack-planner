const fs = require('fs');
const pathDist="./dist/bundle.js";

fs.readFile(pathDist, 'utf8', (err, data) => {
    data = data.replaceAll(/^\s+|\s+$|\s+(?=\s)/g,'');
    data = data.replaceAll('\n','');
    fs.writeFile(pathDist, data, err => {});
});

