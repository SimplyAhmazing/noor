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
var input = 'لو ٥ سوي\n' +
            'ك = ١٠٠\n' +
            'والا\n' +
            'م = ٠\n' +
            'بس \n'
// 
// var input = '' +
//             'ك = ١٠٠\n' +
//             'م = ٠\n';



var inputs = [input];
// var inputs = [fs.readFileSync(__dirname + '/../test/if-statement.txt', 'utf-8')];
console.log(inputs);

inputs.map(function(input) {
  d(input);
  d(JSON.stringify(parse(input), null, 4));
  d('\n');
});


