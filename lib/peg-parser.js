fs   = require('fs');
path = require('path');
peg  = require('pegjs');


module.exports = peg.buildParser(
    fs.readFileSync(path.join(__dirname, '../grammar/grammar.pegjs'), 'utf8')
).parse;
