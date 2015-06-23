var expect = require('chai').expect;
var interpreter = require('../../lib/interpreter');
var parse = require('../../lib/peg-parser');
var scope = require('../../lib/scope');
var utils = require('../../lib/utils');
var testUtils = require('../test_utils');


describe('interpeter', function() {
  var interpret = interpreter.interpret;

  describe('#interpret()', function() {
    it('should interpret an if-statement and execute the false branch when predicate is false', function() {
      var input = 'ب = ٣ > ٥\n' +
                  'لو ب سوي\n' +
                  'اطبع "هااي"\n' +
                  'والا\n' +
                  'اطبع ٥٥\n' +
                  'بس\n';

      var expected = 55;

      var result = null;
      // TODO: move this to test util module
      function stdout(text) {
        result = text;
      }
      var scopeObj = scope.createScope(null, stdout);
      interpret(parse(input), scopeObj);

      expect(result).to.equal(expected);
    });

    it('should interpret an if-statement and execute the true branch when predicate is true', function() {
      var input = 'لو ٥ سوي\n' +
                  'اطبع "هااي"\n' +
                  'والا\n' +
                  'اطبع ٥٥\n' +
                  'بس\n';

      var expected = "هااي";

      var result = null;
      // TODO: move this to test util module
      function stdout(text) {
        result = text;
      }
      var scopeObj = scope.createScope(null, stdout);
      interpret(parse(input), scopeObj);

      expect(result).to.equal(expected);
    });
  });
});
