var createScope = require('./scope').createScope;
var setInScope = require('./scope').setInScope;
var getFromScope = require('./scope').getFromScope;

var ATOMS = ['Number', 'Integer', 'Float', 'String', 'Identifier', 'Boolean'];


function assignmentExpressionHandler(node, scope) {
  /*{
      "type": "AssignmentExpression",
      "val": [
        {
          "type": "IDENTIFIER",
          "val": "ب"
        },
        {
          "type": "STRING",
          "val": "\"كيف الكلام ده\""
        }
      ]
 */

  var key = node.val[0].val;
  var value = interpret(node.val[1], scope);
  setInScope(scope, key, value);
}



function atomHandler(atom, scope) {
  // At this point our nodes are atoms, therefore refer to them as Atoms
  //  assert(atoms.indexOf(atom.type) > -1, 'Invalid atom received by atoms handler');
  switch (atom.type) {
    case 'Boolean':
    case 'Integer':
    case 'Float':
    case 'String':
      return atom.val;
    case 'Identifier':
      return getFromScope(scope, atom.val);
  }
}


function binaryOperatorExpressionHandler(node, scope) {
  var firstChildNode = node.val[0];
  var arg1 = interpret(firstChildNode, scope);

  function applyOperation(op, arg1, arg2) {
    switch (op) {
      case 'MultiplicationOperator':
        return arg1 * arg2;
      case 'DivisionOperator':
        return arg1 / arg2;
      case 'AdditionOperator':
        return arg1 + arg2;
      case 'SubtractionOperator':
        return arg1 - arg2;
      case '%Operator':
        return arg1 % arg2;
      case 'AndOperator':
        return arg1 && arg2;
      case 'AndOperator':
        return arg1 || arg2;
      case 'EqualityOperator':
        return arg1 === arg2;
      case 'InequalityOperator':
        return arg1 !== arg2;
      case 'LTEOperator':
        return arg1 <= arg2;
      case 'LTOperator':
        return arg1 < arg2;
      case 'GTOperator':
        return arg1 >= arg2;
      case 'GTEOperator':
        return arg1 > arg2;
      default:
        throw Error("Unknown operator encountered: '" + op + "'");
    }
  }

  var res = arg1;
  for (var i = 2; i < node.val.length; i+=2) {
    var op = node.val[i-1].type;
    var arg2 = interpret(node.val[i], scope);
    res = applyOperation(op, res, arg2);
  }
  return res
}


function invocationExpressionHandler(node, scope) {
  /* {
      "type": "InvocationExpression",
      "val": [
        {
          "type": "Identifier",
          "val": "اطبع"
        },
        {
          "type": "OperatorExpression",
          "val": [
            {
              "type": "Identifier",
              "val": "س"
            },
            {
              "type": "*Operator",
              "val": "*"
            },
            {
              "type": "Identifier",
              "val": "ي"
            }
          ]
        }
      ]
    }
 */


  // The first node in the val array is the function to be invoked
  var ftn = null;  // getFromScope(node.val[0].val);
  var args = [];

  node.val.forEach(function(node, index) {
    if (index === 0) {
      ftn = interpret(node, scope);
    } else {
      args.push(interpret(node, scope));
    }
  });

  if (typeof ftn === "function") {
    return ftn.apply(null, args);
  } else {
    return ftn; // ftn is determined to be a variable, not an actual function
  }
}


function ifElseExpressionHandler(node, scope) {
  /*
   *
   */
  var predicate = interpret(node.val[0], scope);
  if (predicate) {
    if (!Array.isArray(node.val[1])) { return; }
    node.val[1].forEach(function(statement) {
      interpret(statement, scope);
    })
  } else {
    if (!Array.isArray(node.val[2])) { return; }
    node.val[2].forEach(function(statement) {
    debugger;
      interpret(statement, scope);
    });
  }
}


function interpret(rootNode, scope) {
  console.log(JSON.stringify(rootNode));
  if (rootNode === null) { return; }

  if (isAtom(rootNode)) return atomHandler(rootNode, scope);

  switch (rootNode.type) {
    case "AssignmentExpression":
      return assignmentExpressionHandler(rootNode, scope);

    case "OperatorExpression":
      return binaryOperatorExpressionHandler(rootNode, scope);

    case "InvocationExpression":
      return invocationExpressionHandler(rootNode, scope);

    case "IfElseExpression":
      return ifElseExpressionHandler(rootNode, scope);

    default:
      if (Array.isArray(rootNode.val)) {
        rootNode.val.forEach(function(node) {
          result = interpret(node, scope);
        });
        return result;
      } else {
        console.log('COULD NOT HANDLE THIS NODE: ', rootNode.type);
        return;
      }
  }

  return interpret(rootNode.val, scope)
}


/* Determines if a node is an atom
 * @param {Node} AST Node
 * @return {boolean} true if Node is an atom (i.e. its terminal)
 */
function isAtom(node) {
  return ATOMS.indexOf(node.type) > -1;
}


module.exports.interpret = interpret;
