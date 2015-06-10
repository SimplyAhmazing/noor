var parse = require('../lib/peg-parser');
var d = require('../lib/utils').logger('parseTests');


var inputs    = [
  '١٢\n',
  '"ن"\n',
  'ب = ١٠\n',
  'ب = "مودت"\n',
  '',
];

inputs.map(function(input) {
  d(input);
  d(JSON.stringify(parse(input), null, 4));
  d('\n');
});
