var fs = require('fs');
var parse = require('../lib/peg-parser');
var expect = require('chai').expect;
var d = require('../lib/utils').logger('parseTests');

// var inputs    = [
//   'ب = ٩+٧×٧ - ٤÷٢ + ن\n'
//   // '',
// ];
//
//
//
// var input = 'لو ٤ < ٥ سوي\n' +
// var input = 'اطبع (ب ,١+٢ , "هايي" )\n';


var input = 'لكل شي في [١٠٠] سوي\n' +
            'اطبع شي\n' +
            'بس';

var input = 'لكل شي في [١..٩] سوي\n' +
            'اطبع شي\n' +
            'بس';


var inputs = [input];
// var inputs = [fs.readFileSync(__dirname + '/../test/if-statement.txt', 'utf-8')];
console.log(inputs);

inputs.map(function(input) {
  d(input);
  d(JSON.stringify(parse(input), null, 4));
  d('\n');
});


