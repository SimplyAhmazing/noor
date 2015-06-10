{
    function convertToEnglishNum(str) { // I know this is misnomer...
        return Number( str.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function(d) {
            return d.charCodeAt(0) - 1632;
        }).replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function(d) {
            return d.charCodeAt(0) - 1776;
        }) );
    }

    function node(type, value) {
        return { type: type, value: value};
    }
}


start
  = exprs:Expressions* { return node("Program", exprs) }


Expression "Expression"
  = AssignmentExpression
  / atom:Atom { return atom}
// / "(" Whitespace* expr:Expression Whitespace* ")" { return expr }


ExpressionTerminator
  = [;\n]


Expressions "Expressions"
  = Whitespace* expr:Expression? Whitespace* ExpressionTerminator Whitespace* { return expr }


Whitespace "Whitespace"
  = [ \t]


Number "Number"
  = float:Float { return node("Number", float) }
  / int:Integer { return node("Integer", int) }

Digit "Digit"
 = [\u0660-\u0669]

Digits "Digits"
 = digits:Digit+ { return convertToEnglishNum(digits.join("")) };

Integer "Integer"
  = digits:(("+"/"-")?Digits) { return parseInt(digits.join(""), 10) }

Float "Float"
  = float:(("+"/"-")?Digits "." Digits) { return parseFloat(float.join("")) }

NewLine
  = [\n]

Alphabet
  = [\u0600-\u06FF]

Symbol "Symbol"
  = [!@#$%\^&*()\-_=\+\[\]\{\}\|;:'.,<>/?\\`~]

Char "Char"
  = (Digits / Alphabet / Symbol / Whitespace / NewLine)

String "String"
  = "\"" chars:Char* "\"" { return node("String", chars.join("")) }

Boolean "Boolean"
  = "true" { return node("Boolean", true) }
  / "false" { return node("Boolean", false) }


Identifier "Identifier"
  = first:("_" / Alphabet) rest:("_" / Alphabet / Digit)* { return node("Identifier", first + rest.join("")) }


RHS "RHS"
  // = block:Block { return block }
  // invExpr:InvocationExpression { return invExpr }
  = atom:Atom { return atom }

Identifiers "Identifiers"
  = Whitespace+ id:Identifier { return id }


AssignmentExpression "AssignmentExpression"
  = ids:Identifier Whitespace+ "=" Whitespace* rhs:RHS { return node("AssignmentExpression", [ids, rhs]) }






Atom "Atom"
  = Number
  / String
  /*/ Boolean*/
  /*/ Identifier*/



/*Digit "Digit"*/
/* = [0-9]*/
/**/
/*Digits "Digits"*/
/* = digits:Digit+ { return digits.join("") };*/
/**/
/*Integer "Integer"*/
/*  = digits:(("+"/"-")?Digits) { return parseInt(digits.join(""), 10) }*/
/**/
/*Float "Float"*/
/*  = float:(("+"/"-")?Digits "." Digits) { return parseFloat(float.join("")) }*/
/**/

/*NewLine*/
/*  = [\n]*/
/**/
/*Alphabet*/
/*  = [a-zA-z]*/
/**/
/*Symbol "Symbol"*/
/*  = [!@#$%\^&*()\-_=\+\[\]\{\}\|;:'.,<>/?\\`~]*/
/**/
/*Char "Char"*/
/*  = (Digits / Alphabet / Symbol / Whitespace / NewLine)*/
/**/
/*String "String"*/
/*  = "\"" string:Char* "\"" { return node("String", string) }*/
/**/
/*Boolean "Boolean"*/
/*  = "true" { return node("Boolean", true) }*/
/*  / "false" { return node("Boolean", false) }*/
/**/
/*Identifier "Identifier"*/
/*  = first:("_" / Alphabet) rest:("_" / Alphabet / Digit)* { return node("Identifier", first + rest.join("")) }*/
/**/
/*RHS "RHS"*/
/*  = block:Block { return block }*/
/*  / invExpr:InvocationExpression { return invExpr }*/
/*  / atom:Atom { return atom }*/
/**/
/*Identifiers "Identifiers"*/
/*  = Whitespace+ id:Identifier { return id }*/
/**/
/*AssignmentExpression "AssignmentExpression"*/
/*  = "let" ids:Identifiers+ Whitespace+ "=" Whitespace* rhs:RHS { return node("AssignmentExpression", [ids, rhs]) }*/
/**/
/**/



/**/
/*Expressions "Expressions"*/
/*  = Whitespace* expr:Expression? Whitespace* ExpressionTerminator Whitespace* { return expr }*/
