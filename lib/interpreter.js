var createScope = require('./scope').createScope;
var setInScope = require('./scope').setInScope;
var getFromScope = require('./scope').getFromScope;

var ATOMS = ['NUMBER', 'STRING', 'IDENTIFIER', 'BOOLEAN'];


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

  // if(node.type !== "AtomAssignment") {
  //   throw new Error("Detected Malformed AssignmentExpression Node");
  // }
  console.log(node);
  var key = node.val[0].val;
  var value = node.val[1].val;
  setInScope(scope, key, value);
}



function atomHandler(atom, scope) {
  // At this point our nodes are atoms, therefore refer to them as Atoms
  //  assert(atoms.indexOf(atom.type) > -1, 'Invalid atom received by atoms handler');
  switch (atom.type) {
    case 'Number':
    case 'Boolean':
    case 'String':
      return atom.val;
    case 'Identifier':
      return getFromScope(scope, atom.val);
  }
}


function binaryOperatorExpressionHandler(node, scope) {
  var arg1 = interpret(node.val[0], scope);
  var op = node.val[1].type;
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

  // if (typeof scope(node.val[0].val) !== "function") {
  //   return scope(node.val[0].val);
  // }
  console.log('this is ', JSON.stringify(node));

  // The first node in the val array is the function to be invoked
  var ftn = null;  // getFromScope(node.val[0].val);
  var args = [];

  node.val.forEach(function(node, index) {
    if (index === 0) {
      ftn = interpret(node, scope);
    }
    args.push(interpret(node, scope));
  });

  // debugger;
  return ftn.apply(null, args);
}


function interpret(rootNode, scope) {
  console.log(JSON.stringify(rootNode));
  if (isAtom(rootNode)) return atomHandler(rootNode, scope);

  switch (rootNode.type) {
    case "AssignmentExpression":
      return assignmentExpressionHandler(rootNode, scope);

    case "OperatorExpression":
      return binaryOperatorExpressionHandler(rootNode, scope);

    case "InvocationExpression":
      return invocationExpressionHandler(rootNode, scope);

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
