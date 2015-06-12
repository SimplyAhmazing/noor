var parse = require('../lib/peg-parser');
var expect = require('chai').expect;
var d = require('../lib/utils').logger('parseTests');

// 
// var inputs    = [
//   '١٢\n',
//   '١٢٣٤٥٦٧٨٩٠\n',
//   '"ن"\n',
//   'ب = ١٠\n',
//   'ب = "مودت"\n',
//   'اطبع ١٠\n',
//   'اطبع ١٠ "كلم"\n',
//   'اطبع "كلم"\n',
//   'اطبع سوال\n',
//   'ب = ١٠\n',
//   '٩+٧\n',
//   '٧\n',
//   'ب = ٧+٩\n',
//   '١\n',
//   '٢١\n',
//   'ب = ١+٢+٣\n',
//   'ب + ي\n',
//   // '',
// ];
// 
// inputs.map(function(input) {
//   d(input);
//   d(JSON.stringify(parse(input), null, 4));
//   d('\n');
// });



describe('peg-parser', function() {
  describe('#parse()', function() {
    it('should parse an operator expression like "a + b"', function() {
      // var input = 'ب = "مرحبا الي الريكرس سنتر"';
      var input = 'ب + ي\n';
      var expectedString = {"type":"Program","val":[{"type":"OperatorExpression","val":[{"type":"Identifier","val":"ب"},{"type":"AdditionOperator","val":"+"},{"type":"InvocationExpression","val":[{"type":"Identifier","val":"ي"}]}]}]};
      var result = parse(input);
      expect(result).to.equal(expectedString);
    });
  });
});
