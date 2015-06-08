var expect = require('chai').expect;
var tokenize = require('../lib/lexer').tokenize;
var parser = require('../lib/parser');


describe('parser', function() {
  console.log(parser);
  var parse = parser.parse;

  describe('#parse()', function() {
    it('should parse a variable assigned to a string', function() {
      var input = 'ب = "مرحبا الي الريكرس سنتر"';
      var expectedTree = JSON.parse('{"type":"Program","val":[{"type":"AssignmentExpression","val":{"type":"AtomAssignment","val":[{"type":"IDENTIFIER","val":"ب"},{"type":"STRING","val":"\'مرحبا الي الريكرس سنتر\'"}]}}]}');
      var result = parse(tokenize(input));
      console.log(result);
      expect(result).to.deep.equal(expectedTree);
    });
  });
});

// expected = [
//     ["IDENTIFIER","ب"],
//     ["=","="],
//     ["STRING","\"مرحبا الي الريكرس سنتر\""],
//     ["\n","\n"],["\n","\n"]
//   ]
