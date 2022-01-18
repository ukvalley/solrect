const fs = require('fs');
const idl = require('./target/idl/basic_0.json');

fs.writeFileSync('./app/src/idl.json', JSON.stringify(idl));