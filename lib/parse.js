/* Parser goes here...
 */


function Node(type, val) {
    var self = this instanceof Node ? this : Object.create(Node.prototype);
    self.type = type
    self.val = val
    // return {'type': type, 'val': val};
}


Node.prototype.isValid = function() {
    if (this.type) {
        return true;
    }
    return false;
}


function processPotentialNode(node) {
    if (node.type == 'AtomAssignment') {
        return new Node('AssignmentExpression', node.val);
    }
    return null;
}


function parse(tokens, root) {
    // console.log(JSON.stringify(tokens));

    if (!root) {
        var root = new Node('Program', []);
    }

    // Use these to process potential next children
    var potentialNode = new Node()
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

        if (token[0] === "IDENTIFIER") {
            potentialNodeChildren.push(new Node("IDENTIFIER", token[1]));
        }
        if (token[0] === "STRING") {
            potentialNodeChildren.push(new Node("STRING", token[1]));
        }
        if (token[0] === "NUMBER") {
            potentialNodeChildren.push(new Node("NUMBER", token[1]));
        }
        if (token[0] === "=") {
            potentialNodeType = "AtomAssignment"
        }

    // debugger;
    }
    console.log(JSON.stringify(root));
    return root;
}


module.exports.parse = parse;


/*
{
  type: 'Program',
  val: [{
    type: 'AssignmentExpression',
    val: {
      type: 'AtomAssignment',
      val: [{
        type: 'Identifier',
        val: 'a'
      }, {
        type: 'Number',
        val: 10
      }]
    }
  }, {
    type: 'AssignmentExpression',
    val: {
      type: 'OperatorAssignment',
      val: [{
        type: 'Identifier',
        val: 'b'
      }, {
        type: 'BinaryOperatorExpression',
        val: [{
          type: 'Number',
          val: 1
        }, {
          type: 'AdditionOperator',
          val: '+'
        }, {
          type: 'Number',
          val: 2
        }]
      }]
    }
  }]
} 
*/
