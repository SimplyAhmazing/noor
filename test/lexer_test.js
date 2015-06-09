var expect = require('chai').expect;
var lexer = require('../lib/lexer');


describe('lexer', function() {
  var tokenize = lexer.tokenize;

  describe('#tokenize()', function() {
    it('should tokenize a variable assigned to a string', function() {
      var input = 'ب = "مرحبا الي الريكرس سنتر"';
      var expected = [
        ["IDENTIFIER","ب"],
        ["=","="],
        ["STRING","\"مرحبا الي الريكرس سنتر\""],
        ["\n","\n"]
      ]

      var result = tokenize(input);
      expect(result).to.deep.equal(expected);
    });
  });

  it('should tokenize a variable assigned to a number', function() {
    var input = 'ك = ١٠';
    var expected = [["IDENTIFIER","ك"],["=","="],["NUMBER",10],["\n","\n"]]
    var result = tokenize(input);
    expect(result).to.deep.equal(expected);
  });

  it('should tokenize calling print on a variable', function() {
    var input = 'ك = ٣٠\n' + 'اطبع ك';
    var expected = [
      ["IDENTIFIER","ك"],["=","="],["NUMBER",30],["\n","\n"],
      ["IDENTIFIER","اطبع"],["IDENTIFIER","ك"],["\n","\n"]
    ]
    var result = tokenize(input);
    expect(result).to.deep.equal(expected);
  });
});



