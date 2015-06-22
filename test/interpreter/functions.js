var expect = require('chai').expect;
var interpreter = require('../../lib/interpreter');
var parse = require('../../lib/peg-parser');
var scope = require('../../lib/scope');
var utils = require('../../lib/utils');
var testUtils = require('../test_utils');


describe('interpeter', function() {
  var interpret = interpreter.interpret;

  describe('#interpret()', function() {
    // it('should evaluate a function declaration', function() {
    //   var input = '';
    //   var expected = 50;

    //   var result = null;
    //   // TODO: move this to test util module
    //   function stdout(text) {
    //     result = text;
    //   }
    //   var scopeObj = scope.createScope(null, stdout);
    //   interpret(parse(input), scopeObj);

    //   expect(result).to.equal(expected);
    // });
  });
});
