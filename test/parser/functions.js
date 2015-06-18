var parse = require('../../lib/peg-parser');
var expect = require('chai').expect;
var d = require('../../lib/utils').logger('parseTests');


describe('peg-parser-functions', function() {
  describe('#parse()', function() {
    it('should parse calling a ftn with an int arg', function() {
      var input = 'اطبع ١٠\n';
      var expected = {
        "type":"Program",
        "val":[
          {"type":"InvocationExpression",
            "val":[{"type":"Identifier","val":"اطبع"},{"type":"Integer","val":10}]}]};
      expect(parse(input)).to.deep.equal(expected);
    });

    it('should parse calling a ftn with a string argument', function() {
      var input = 'اطبع "كلم"\n';
      var expected = {
        "type":"Program",
        "val":[
          {"type":"InvocationExpression",
            "val":[{"type":"Identifier","val":"اطبع"},{"type":"String","val":"كلم"}]}]};
      expect(parse(input)).to.deep.equal(expected);
    });

    it('should not parse an expression w/no trailing line and should throw an Exception', function() {
      var input = 'اطبع "كلم"';
      var expected = 'Expected Expressions or end of input but "\\u0627" found.';
      expect(function (){parse(input)}).to.throw(expected);
    });

    it('should parse calling a ftn with an identifier (variable or 0-arg ftn)', function() {
      var input = 'اطبع سوال\n';
      var expected = {
        "type":"Program",
        "val":[
          {"type":"InvocationExpression",
            "val":[
              {"type":"Identifier","val":"اطبع"},
              {"type":"InvocationExpression",
               "val":[{"type":"Identifier","val":"سوال"}]}]}]};

      expect(parse(input)).to.deep.equal(expected);
    });

    it('should parse calling a ftn with multiple, comma separated arguments', function() {
      var input = 'اطبع (ب , "هايي" , ياي)\n'
      // 'ب = ١٠٠\n'

      var expected = {
        "type":"Program",
        "val":[
          {"type":"InvocationExpression",
            "val":[
              {"type":"Identifier","val":"اطبع"},
              {"type":"InvocationExpression",
               "val":[{"type":"Identifier","val":"سوال"}],
              },
              {"type":"String","val":"هايي"},
              {"type":"InvocationExpression",
               "val":[{"type":"Identifier","val":"ياي"}],
              }
            ]}]};

      expect(parse(input)).to.deep.equal(expected);
    });

    it('should parse calling a ftn with 2 arguments', function() {
      var input = 'اطبع ١٠ "كلم"\n';
      var expected = {
        "type":"Program",
        "val":[
          {"type":"InvocationExpression",
            "val":[
              {"type":"Identifier","val":"اطبع"},
              {"type":"Integer","val":10},
              {"type": "String", "val": "كلم"}
            ]}]};

      // console.log(JSON.stringify(parse(input)));
      expect(parse(input)).to.deep.equal(expected);
    });
    // d(console.log(JSON.stringify(parse(input))), null, 4);
    //
  });
});

