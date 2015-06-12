var parse = require('../lib/peg-parser');
var expect = require('chai').expect;
var d = require('../lib/utils').logger('parseTests');


describe('peg-parser', function() {
  describe('#parse()', function() {
    it('should parse an operator expression like "a + b"', function() {
      // var input = 'ب = "مرحبا الي الريكرس سنتر"';
      var input = 'ب + ي\n';
      var expectedString = {
        "type":"Program",
        "val":[
          {"type":"OperatorExpression",
            "val":[
              {"type":"Identifier","val":"ب"},
              {"type":"AdditionOperator","val":"+"},
              {
                "type":"InvocationExpression",
                "val":[
                  {"type":"Identifier","val":"ي"}
                ]
              }
            ]
        }]
      };
      var result = parse(input);
      expect(result).to.deep.equal(expectedString);
    });

    it('should parse standalone integers and strings', function() {
      var inputToOutputResultMap = [
        ['١٢\n', {"type":"Program","val":[{"type": "Integer", "val": 12}]}],
        ['١٢٣٤٥٦٧٨٩٠\n', {"type":"Program","val":[{"type":"Integer","val":1234567890}]}],
        ['"ن"\n', {"type":"Program","val":[{"type":"String","val":"ن"}]}],
      ];
      inputToOutputResultMap.forEach(function(item) {
        expect(parse(item[0])).to.deep.equal(item[1]);
      });
    });

    it('should parse assigning a variable to a string or a number', function() {
      var inputToOutputResultMap = [
        ['ب = ١٠\n', {"type":"Program","val":[{"type":"AssignmentExpression","val":[{"type":"Identifier","val":"ب"},{"type":"Integer","val":10}]}]}],
        ['ب = "مودت"\n', {"type":"Program","val":[{"type":"AssignmentExpression","val":[{"type":"Identifier","val":"ب"},{"type":"String","val":"مودت"}]}]}],
      ];
      inputToOutputResultMap.forEach(function(item) {
        expect(parse(item[0])).to.deep.equal(item[1]);
      });
    });

    it('should parse calling a ftn with an int arg', function() {
      var input = 'اطبع ١٠\n';
      var expected = {
        "type":"Program",
        "val":[
          {"type":"InvocationExpression",
            "val":[{"type":"Identifier","val":"اطبع"},{"type":"Integer","val":10}]}]};
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

    it('should parse calling a ftn with an string argument', function() {
      var input = 'اطبع "كلم"\n';
      var expected = {
        "type":"Program",
        "val":[
          {"type":"InvocationExpression",
            "val":[{"type":"Identifier","val":"اطبع"},{"type":"String","val":"كلم"}]}]};
      expect(parse(input)).to.deep.equal(expected);
    });

    it('should parse calling a ftn with an int arg', function() {
      var input = 'اطبع "كلم"\n';
      var expected = {
        "type":"Program",
        "val":[
          {"type":"InvocationExpression",
            "val":[{"type":"Identifier","val":"اطبع"},{"type":"String","val":"كلم"}]}]};
      expect(parse(input)).to.deep.equal(expected);
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

    it('should parse calling a ftn with an identifier (variable or 0-arg ftn)', function() {
      var input = 'اطبع سوال\n';
      var expected ={
        "type":"Program",
        "val":[
          {"type":"InvocationExpression",
           "val":[
            {"type":"Identifier",
             "val":"اطبع"
            },
            {"type":"InvocationExpression",
              "val":[
                {"type":"Identifier",
                "val":"سوال"
              }]}
          ]
        }]
      };
      expect(parse(input)).to.deep.equal(expected);
    });

    it('should parse an arithmetic operation between 2 integers', function() {
      var input = '٩+٧\n';
      var expected = {
        "type":"Program",
        "val":[
          {"type":"OperatorExpression",
           "val":[
            {"type":"Integer",
             "val":9
            },
            {"type":"AdditionOperator",
              "val":"+"
            },
            {"type":"Integer",
              "val":7
            }]
        }]
      };
      expect(parse(input)).to.deep.equal(expected);
    });

    it('should parse an arithmetic operation between variables (identifiers)', function() {
      var input = 'ي+ن\n';
      var expected = {
        "type":"Program",
        "val":[
          {"type":"OperatorExpression",
           "val":[
            {"type":"Identifier",
             "val":"ي"
            },
            {"type":"AdditionOperator",
              "val":"+"
            },
            // The second identifier is a function because how can the parser know if this
            // variable is a function or an instance variable?
            {"type":"InvocationExpression",
              "val":[
                {"type":"Identifier","val":"ن"}
              ]
            }
          ]
        }]
      };
      expect(parse(input)).to.deep.equal(expected);
    });

    it('should parse a variable assigned to a simple arithmetic operation', function() {
      var input = 'ب = ٩+٧\n';
      var expected = {
        "type":"Program",
        "val":[
          {"type":"AssignmentExpression",
           "val":[
            {"type":"Identifier",
             "val":"ب"
            },
            {"type":"OperatorExpression",
              "val":[
                {
                "type":"Integer",
                "val":9
              },
              {
                "type":"AdditionOperator",
                "val":"+"
              },
              {
                "type":"Integer",
                "val":7
              }]
            }
          ]
        }]
      };
      expect(parse(input)).to.deep.equal(expected);
    });

    it('should parse a variable assigned to a simple complex arithmetic operation', function() {
      var input = 'ب = ٩+٧×٧ - ٤÷٢ + ن\n';
      var expected = {"type":"Program","val":[{"type":"AssignmentExpression","val":[{"type":"Identifier","val":"ب"},{"type":"OperatorExpression","val":[{"type":"Integer","val":9},{"type":"AdditionOperator","val":"+"},{"type":"Integer","val":7},{"type":"MultiplicationOperator","val":"*"},{"type":"Integer","val":7},{"type":"SubtractionOperator","val":"-"},{"type":"Integer","val":4},{"type":"DivisionOperator","val":"/"},{"type":"Integer","val":2},{"type":"AdditionOperator","val":"+"},{"type":"InvocationExpression","val":[{"type":"Identifier","val":"ن"}]}]}]}]};
      d(console.log(JSON.stringify(parse(input))), null, 4);
      expect(parse(input)).to.deep.equal(expected);
    });
  });
});

// 'ب = ٧+٩\n',
// 'ب = ١+٢+٣\n',
