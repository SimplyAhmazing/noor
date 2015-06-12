var parse = require('../lib/peg-parser');
var expect = require('chai').expect;
var d = require('../lib/utils').logger('parseTests');

var inputs    = [
  'ب = ٩+٧×٧ - ٤÷٢\n'
  // '',
];

inputs.map(function(input) {
  d(input);
  d(JSON.stringify(parse(input), null, 4));
  d('\n');
});


