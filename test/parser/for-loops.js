var parse = require('../../lib/peg-parser');
var expect = require('chai').expect;
var d = require('../../lib/utils').logger('parseTests');


describe('peg-parser-if-statements', function() {
  describe('#parse()', function() {
    it('should parse a forloop statement with a single int as the range', function() {
      var input = 'لكل شي في [١٠٠] سوي\n' +
                  'اطبع شي\n' +
                  'بس';
      var expected = {"type":"Program","val":[{"type":"ForloopStatement","val":[{"type":"Identifier","val":"شي"},{"type":"ForloopStatementRange","val":[1,100]},[{"type":"InvocationExpression","val":[{"type":"Identifier","val":"اطبع"},{"type":"InvocationExpression","val":[{"type":"Identifier","val":"شي"}]}]}]]}]};
      expect(parse(input)).to.deep.equal(expected);
    });

    it('should a forloop statement with a start and end int in the range', function() {
      var input = 'لكل شي في [١..٩] سوي\n' +
                  'اطبع شي\n' +
                  'بس';
      var expected = {"type":"Program","val":[{"type":"ForloopStatement","val":[{"type":"Identifier","val":"شي"},{"type":"ForloopStatementRange","val":[1,9]},[{"type":"InvocationExpression","val":[{"type":"Identifier","val":"اطبع"},{"type":"InvocationExpression","val":[{"type":"Identifier","val":"شي"}]}]}]]}]};
      expect(parse(input)).to.deep.equal(expected);
    });
    // d(console.log(JSON.stringify(parse(input))), null, 4);
  });
});

