var parse = require('../lib/peg-parser');
var expect = require('chai').expect;
var d = require('../lib/utils').logger('parseTests');


describe('peg-parser', function() {
  describe('#parse()', function() {
    it('should an if-statement w/o else clause (with an Atom as the predicate)', function() {
      var input = 'لو ٥ سوي \nك = ١٠٠\nت=٥\nبس';
      var expected ={"type":"Program","val":[{"type":"IfElseExpression","val":[{"type":"Integer","val":5},[{"type":"AssignmentExpression","val":[{"type":"Identifier","val":"ك"},{"type":"Integer","val":100}]},{"type":"AssignmentExpression","val":[{"type":"Identifier","val":"ت"},{"type":"Integer","val":5}]}],null]}]};
      expect(parse(input)).to.deep.equal(expected);
    });

    it('should an if-statement with an else clause (with an Atom as the predicate)', function() {
      var input = 'لو ٥ سوي \nك = ١٠٠\nت=٥\nوالا\n\nي=٧٧٧\n\nبس';
      var expected ={"type":"Program","val":[{"type":"IfElseExpression","val":[{"type":"Integer","val":5},[{"type":"AssignmentExpression","val":[{"type":"Identifier","val":"ك"},{"type":"Integer","val":100}]},{"type":"AssignmentExpression","val":[{"type":"Identifier","val":"ت"},{"type":"Integer","val":5}]}],[{"type":"AssignmentExpression","val":[{"type":"Identifier","val":"ي"},{"type":"Integer","val":777}]}]]}]};
      expect(parse(input)).to.deep.equal(expected);
    });
    // d(console.log(JSON.stringify(parse(input))), null, 4);
    //
  });
});

