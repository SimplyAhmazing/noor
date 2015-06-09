/* Parser goes here...
 */
var MATH_OPS = ['+', '-', '*', '/', '%'];

/* Object for AST nodes
 * @param {string} {array} The type of node to designate.
 */
function Node(type, val) {
    var self = this instanceof Node ? this : Object.create(Node.prototype);
    self.type = type
    self.val = val
}

Node.prototype.isValid = function() {
    if (this.type) {
        return true;
    }
    return false;
}

/* Wraps potentially processed nodes
 * @param {string} {array} The type of node to designate.
 */
function processPotentialNode(node) {
    if (node.type == 'AtomAssignment') {
        return new Node('AssignmentExpression', node);
    }
    if (node.type == 'OperatorExpression') {
        return new Node('BinaryOperatorExpression', node);
    }

    // BASE Case
    node.type = 'InvocationExpression';
    return node;
    // return new Node('InvocationExpression', node);
}


function parse(tokens, root) {
    // console.log(JSON.stringify(tokens));

    if (!root) {
        var root = new Node('Program', []);
    }

    // Use these to process potential next children
    var potentialNode = new Node();
    var potentialNodeType = null;
    var potentialNodeChildren = [];

    while (tokens.length > 0) {
        var token = tokens.shift();  // Get a token

        if (token[0] === "\n") {
            // Finish setting up the node being processed and push it into the AST
            potentialNode.val = potentialNodeChildren;
            potentialNode.type = potentialNodeType;

            if (potentialNode.isValid()) {
                var newNode = processPotentialNode(potentialNode);
                if (newNode) { root.val.push(newNode); }
            }

            // Reset vars to start processing next node
            potentialNodeType = null;
            potentialNodeChildren = [];
            potentialNode = new Node();
        }
        if (token[0] === ")") {
            potentialNode.val = potentialNodeChildren;
            potentialNode.type = potentialNodeType;
            if (potentialNode.isValid()) {
                var newNode = processPotentialNode(potentialNode);
                return newNode
            }
        }

        if (token[0] === "IDENTIFIER") {
            potentialNodeChildren.push(new Node("IDENTIFIER", token[1]));
        }
        if (token[0] === "STRING") {
            potentialNodeChildren.push(new Node("STRING", token[1]));
        }
        if (token[0] === "NUMBER") {
            potentialNodeChildren.push(new Node("NUMBER", token[1]));
        }
        if (MATH_OPS.indexOf(token[0]) > -1) {
            potentialNodeType = "OperatorExpression"
            potentialNodeChildren.push(new Node(token[0]+"Operator", token[1]));
        }


        if (token[0] === "(") {
            var exprNode = new Node("ToBeDetermined");
            var parsedExprNode = parse(tokens, exprNode);
            potentialNodeChildren.push(parsedExprNode);
            continue;
        }

        if (token[0] === "=" && potentialNodeChildren.length > 0) {
            potentialNodeType = "AtomAssignment"
        } else if (!potentialNodeType && potentialNodeChildren.length > 0) {
            potentialNodeType = "InvocationExpression"
        }

    }
    // console.log(JSON.stringify(root));
    return root;
}


module.exports.parse = parse;
