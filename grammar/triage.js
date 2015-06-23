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


var input = 'امر عامل فبنوتشي (ح) ليسوي\n' +
            'ب = ١\n' +
            'اطبع ب\n' +
            'بس\n';

var input = 'امر عامل فبنوتشي (ح, ك) ليسوي\n' +
            'ب = ١\n' +
            'اطبع ب\n' +
            'بس\n';

// var input = 'امر عامل فبنوتشي () ليسوي\n' +
//             'ب = ١\n' +
//             'اطبع ب\n' +
//             'بس\n';
// 




var inputs = [input];
// var inputs = [fs.readFileSync(__dirname + '/../test/if-statement.txt', 'utf-8')];
console.log(inputs);

inputs.map(function(input) {
  d(input);
  d(JSON.stringify(parse(input), null, 4));
  d('\n');
});


