var expect = require('chai').expect;
var interpreter = require('../../lib/interpreter');
var parse = require('../../lib/peg-parser');
var scope = require('../../lib/scope');
var utils = require('../../lib/utils');
var testUtils = require('../test_utils');


describe('interpeter', function() {
  var interpret = interpreter.interpret;

  describe('#interpret-functions()', function() {
    it('should evaluate a function declaration', function() {
      var input = 'امر عامل فب (ن) ليسوي\n' +
                  'د = ٠\n' +
                  'لو ن < ٢ سوي\n' +
                  'د = ن\n' +
                  'والا\n' +
                  'ش = ن - ١\n' +
                  'س = ن - ٢\n' +
                  'م = فب(ش)\n' +
                  'ك = فب(س)\n' +
                  'د = م + ك\n' +
                  'بس\n' +
                  'د\n' +
                  'بس\n' +
                  '\n' +
                  'اطبع (فب(١٠))\n';
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
  });
});
