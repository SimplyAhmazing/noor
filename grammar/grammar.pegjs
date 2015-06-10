{
    function node(type, value) {
        return { type: type, value: value};
    }
}


start
  = exprs:Expressions* { return node("Program", exprs) }

Whitespace "Whitespace"
  = [ \t]

Atom "Atom"
  = Number
  / String
  / Boolean
  / Identifier

Digit "Digit"
 = [0-9]

Digits "Digits"
 = digits:Digit+ { return digits.join("") };

Integer "Integer"
  = digits:(("+"/"-")?Digits) { return parseInt(digits.join(""), 10) }

Float "Float"
  = float:(("+"/"-")?Digits "." Digits) { return parseFloat(float.join("")) }

Number "Number"
  = float:Float { return node("Number", float) }
  / int:Integer { return node("Integer", int) }

NewLine
  = [\n]

Alphabet
  = [a-zA-z]

Symbol "Symbol"
  = [!@#$%\^&*()\-_=\+\[\]\{\}\|;:'.,<>/?\\`~]

Char "Char"
  = (Digits / Alphabet / Symbol / Whitespace / NewLine)

String "String"
  = "\"" string:Char* "\"" { return node("String", string) }

Boolean "Boolean"
  = "true" { return node("Boolean", true) }
  / "false" { return node("Boolean", false) }

Identifier "Identifier"
  = first:("_" / Alphabet) rest:("_" / Alphabet / Digit)* { return node("Identifier", first + rest.join("")) }

RHS "RHS"
  = block:Block { return block }
  / invExpr:InvocationExpression { return invExpr }
  / atom:Atom { return atom }

Identifiers "Identifiers"
  = Whitespace+ id:Identifier { return id }

AssignmentExpression "AssignmentExpression"
  = "let" ids:Identifiers+ Whitespace+ "=" Whitespace* rhs:RHS { return node("AssignmentExpression", [ids, rhs]) }


Expression "Expression"
  = atom:Atom { return atom}
  / "(" Whitespace* expr:Expression Whitespace* ")" { return expr }

ExpressionTerminator
  = [;\n]

Expressions "Expressions"
  = Whitespace* expr:Expression? Whitespace* ExpressionTerminator Whitespace* { return expr }
