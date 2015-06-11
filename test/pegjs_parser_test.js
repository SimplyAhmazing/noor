var parse = require('../lib/peg-parser');
var d = require('../lib/utils').logger('parseTests');


var inputs    = [
  '١٢\n',
  '"ن"\n',
  'ب = ١٠\n',
  'ب = "مودت"\n',
  'اطبع ١٠\n',
  'اطبع ١٠ "كلم"\n',
  'اطبع "كلم"\n',
  'اطبع سوال\n',
  'ب = ١٠\n',
  'ب = ١+٢*٣\n',
  'ب + ي\n',
  // '',
];

inputs.map(function(input) {
  d(input);
  d(JSON.stringify(parse(input), null, 4));
  d('\n');
});
