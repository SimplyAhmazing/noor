var createScope = require('./scope').createScope;
var setInScope = require('./scope').setInScope;
var getFromScope = require('./scope').getFromScope;


function assignmentExpressionHandler(node, scope) {
  /*{
      "type": "AssignmentExpression",
      "val": {
        "type": "AtomAssignment",
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
      }
    },
 */

  if(node.type !== "AtomAssignment") {
    throw new Error("Detected Malformed AssignmentExpression Node");
  }
  var key = node.val[0].val;
  var value = node.val[1].val;
  setInScope(scope, key, value);
}



function atomHandler(atom, scope) {
  // At this point our nodes are atoms, therefore refer to them as Atoms
  //  assert(atoms.indexOf(atom.type) > -1, 'Invalid atom received by atoms handler');
  switch (atom.type) {
    case 'NUMBER':
    case 'BOOLEAN':
    case 'STRING':
      return node.val;
    case 'IDENTIFIER':
      return getFromScope(scope, atom.);
  }
}


function binaryOperatorExpressionHandler(node, scope) {
  var arg1 = interpret(node.val[0], scope);
  var op = node.val[1];
  var arg2 = interpret(node.val[2], scope);

  switch (op) {
    case '*Operator':
      return arg1 * arg2;
    case '/Operator':
      return arg1 / arg2;
    case '+Operator':
      return arg1 + arg2;
    case '-Operator':
      return arg1 - arg2;
    case '%Operator':
      return arg1 % arg2;
    default:
      throw Error("Unknown operator encountered: '" + op + "'");
  }
}


function invocationExpressionHandler(node, scope) {
  /* {
      "type": "InvocationExpression",
      "val": [
        {
          "type": "IDENTIFIER",
          "val": "اطبع"
        },
        {
          "type": "BinaryOperatorExpression",
          "val": {
            "type": "OperatorExpression",
            "val": [
              {
                "type": "IDENTIFIER",
                "val": "س"
              },
              {
                "type": "*Operator",
                "val": "*"
              },
              {
                "type": "IDENTIFIER",
                "val": "ي"
              }
            ]
          }
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
    }
    args.push(interpret(node, scope));
  });
  return ftn.apply(null, args);
}


function interpret(root, scope) {
  if (Array.isArray(root.val)) {
    root.val.forEach(function(node) {
      result = interpret(node, scope);
    });
    return result;
  }

  switch (root.type) {
    case "AssignmentExpression":
      return assignmentExpressionHandler(root.val, scope);

    case "BinaryOperatorExpression":
      return binaryOperatorExpressionHandler(root.val, scope);

    case "InvocationExpression":
      return invocationExpressionHandler(root.val, scope);

    case isAtom(root):
      return atomHandler(root, scope);

    default:
      console.log('COULD NOT HANDLE THIS NODE: ', root.type);
      return;
  }

  return interpret(root.val, scope)
}


module.exports.interpret = interpret;
