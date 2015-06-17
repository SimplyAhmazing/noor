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
  var value = node.val[1].val;
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
