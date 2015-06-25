{
    function convertToEnglishNum(str) { // I know this is misnomer...
        return Number( str.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function(d) {
            return d.charCodeAt(0) - 1632;
        }).replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function(d) {
            return d.charCodeAt(0) - 1776;
        }) );
    }

    function node(type, value) {
        return { type: type, val: value};
    }
}


start
  = exprs:Expressions* { return node("Program", exprs) }

Atom "Atom"
  = Number
  / String
  /*/ Boolean*/
  / Identifier


AlphabetArabic "AlphabetArabic"
  = [\u0600-\u065F\u066A-\u06FF]

AlphabetEnglish "AlphabetEnglish"
  = [a-zA-Z]

Argument "Argument"
  //= InvocationExpression
  = Atom
  / "(" Whitespace* !AssignmentExpression expr:Expression Whitespace* ")" { return expr }

Arguments "Arguments"
  = Whitespace* "(" args:( Whitespace* (InvocationExpression / OperatorExpression / Atom) Whitespace* ","? Whitespace* )* ")" Whitespace*
    {
        var myArguments = [];
        args.forEach(function(elem){
            try {
              var potentialNode = elem[1];
            } catch (e) {
              return;
            }
            if (typeof potentialNode === "object" && potentialNode !== null && !(potentialNode instanceof Array)) {
                myArguments.push(potentialNode);
            }
        });
        return myArguments;
    }
  / Whitespace+ invoExpr:InvocationExpression { return invoExpr }
  / Whitespace+ atom:Atom { return atom }


AssignmentExpression "AssignmentExpression"
  = id:Identifier Whitespace* "=" Whitespace* rhs:RHS { return node("AssignmentExpression", [id, rhs]) }


ArithmeticOperator "ArithmeticOperator"
  = [\/÷] { return node("DivisionOperator", "/") }
  / [*×] { return node("MultiplicationOperator", "*") }
  / "+" { return node("AdditionOperator", "+") }
  / "-" { return node("SubtractionOperator", "-") }
  / [%٪] { return node("%Operator", "%") }


BinaryOperator "BinaryOperator"
  = ArithmeticOperator
  / LogicalOperator


Block "Block"
  = WhitespaceOrNewLine* exprs:Expressions WhitespaceOrNewLine* { return exprs }

Boolean "Boolean"
  = "true" { return node("Boolean", true) }
  / "false" { return node("Boolean", false) }


Char "Char"
  = (Digits / AlphabetArabic / AlphabetEnglish / Symbol / Whitespace / NewLine)


Digit "Digit"
 = [\u0660-\u0669]

Digits "Digits"
 = digits:Digit+ { return convertToEnglishNum(digits.join("")) };


Expression "Expression"
  = AssignmentExpression
  / opExpr:OperatorExpression { return opExpr }
  / InvocationExpression
  / "(" Whitespace* expr:Expression Whitespace* ")" { return expr }
  / Atom


ExpressionTerminator
  = [;\n]


Expressions "Expressions"
  = IfElseExpression
  / ForloopStatement
  / FunctionDefinition
  / expr:Expression? Whitespace* ExpressionTerminator+ Whitespace* { return expr }


ForloopStatement "ForloopStatement"
  = FOREACH Whitespace+ loopVar:Identifier Whitespace+ IN Whitespace+ "[" range:ForloopStatementRange "]" Whitespace+ DO WhitespaceOrNewLine+
    body:Block* WhitespaceOrNewLine*
    END
    { return node("ForloopStatement", [loopVar, range, body]) }


ForloopStatementRange "ForloopStatementRange"
  = Whitespace* start:(Integer / Identifier) Whitespace* ".." Whitespace* end:(Integer / Identifier) Whitespace*
    { return node("ForloopStatementRange", [start, end]); }
  / Whitespace* end:(Integer / Identifier) Whitespace*
    { return node("ForloopStatementRange", [1, end]); }


Identifier "Identifier"
  = !Keyword first:("_" / AlphabetArabic) rest:("_" / AlphabetArabic / Digit)* { return node("Identifier", first + rest.join("")) }


IfElseExpression
  = IF Whitespace+ predicate:(OperatorExpression / Atom) Whitespace+ DO WhitespaceOrNewLine*
    trueBranch:Block* WhitespaceOrNewLine*
    ELSE
    falseBranch:Block* WhitespaceOrNewLine*
    END
    { return node("IfElseExpression", [predicate, trueBranch, falseBranch]); }

  / IF Whitespace+ predicate:(OperatorExpression / Atom) Whitespace+ DO WhitespaceOrNewLine*
    trueBranch:Block* WhitespaceOrNewLine*
    END
    { return node("IfElseExpression", [predicate, trueBranch, null]); }


Integer "Integer"
  = digits:(("+"/"-")?Digits) { return parseInt(digits.join(""), 10) }


Float "Float"
  = float:(("+"/"-")?Digits "," Digits) { return parseFloat(float.join("")) }

FunctionDefinitionArguments "FunctionDefinitionArguments"
  = Whitespace* "(" args:( Whitespace* Atom Whitespace* ","? Whitespace* )* ")" Whitespace*
    {
        var myArguments = [];
        args.forEach(function(elem){
            try {
              var potentialNode = elem[1];
            } catch (e) {
              return;
            }
            if (typeof potentialNode === "object" && potentialNode !== null && !(potentialNode instanceof Array)) {
                myArguments.push(potentialNode);
            }
        });
        return node("FunctionDefinitionArguments", myArguments);
    }

FunctionDefinition "FunctionDefinition"
  = INSTRUCT Whitespace+ WORKER Whitespace+ fnName:Identifier args:FunctionDefinitionArguments TODO WhitespaceOrNewLine*
    body:Block* WhitespaceOrNewLine*
    END
    { return node("FunctionDefinition", [fnName, args, body]); }


NewLine
  = [\n\r]


Number "Number"
  = float:Float { return node("Number", float) }
  / int:Integer { return node("Integer", int) }

/*operatorAssignment "operatorAssignment"*/
/*  = Whitespace* id:Identifier */

Identifiers "Identifiers"
  = Whitespace+ id:Identifier { return id }


InvocationExpression "InvocationExpression"
  = !Keyword ftn:Identifier args:Arguments*
    {
        if (Array.isArray(args) && (args.length > 0)) {
            return node('InvocationExpression', [ftn].concat(args[0]));
        }
        return node('InvocationExpression', [ftn].concat(args));
    }


Keyword "Keyword"
  = IF
  / DO
  / ELSE
  / END


LogicalOperator "LogicalOperator"
  = "&&" { return node("AndOperator", "&&") }
  / "||" { return node("OrOperator", "||") }
  / "==" { return node("EqualityOperator", "==") }
  / "!=" { return node("InequalityOperator", "!=") }
  / "<=" { return node("LTEOperator", "<=") }
  / ">=" { return node("GTEOperator", ">=") }
  / "<"  { return node("LTOperator", "<") }
  / ">"  { return node("GTOperator", ">") }



OperatorExpression "OperatorExpression"
  = arg1:Argument Whitespace* restOpExpr:RestOfBinaryOperatorExpression+ {
        return node("OperatorExpression", [arg1].concat(restOpExpr[0]))
    }
  / unaryLogicalOp:UnaryLogicalOp expr:Argument Whitespace* rest:RestOfBinaryOperatorExpression* {
        return node("UnaryLogicalOperation", [unaryLogicalOp, expr].concat(rest))
    }


RestOfBinaryOperatorExpression "RestOfBinaryOperatorExpression"
  = binaryOp:BinaryOperator Whitespace* arg2:Expression {
    if (Array.isArray(arg2.val) && (arg2.type !== "InvocationExpression")) {
        return [binaryOp].concat(arg2.val);
    }
    return [binaryOp, arg2];
  }


RHS "RHS"
  = block:Block WhitespaceOrNewLine+ { return block }
  / opExpr:OperatorExpression { return opExpr }
  / invExpr:InvocationExpression { return invExpr }
  / atom:Atom { return atom }


Symbol "Symbol"
  = [!@#$%\^&*()\-_=\+\[\]\{\}\|;:'.,<>/?\\`~]


String "String"
  = "\"" chars:Char* "\"" { return node("String", chars.join("")) }


UnaryLogicalOp "UnaryLogicalOp"
  = "!"


Whitespace "Whitespace"
  = [ \t]


WhitespaceOrNewLine "WhitespaceOrNewLine"
  = Whitespace
  / NewLine



/* ----- KEYWORDS ----- */

IF "IF"
  = "لو"

IN "IN"
  = "في"

INSTRUCT "INSTRUCT"
  = "امر"

DO "DO"
  = "سوي"

ELSE  "ELSE"
  = "والا"

END  "END"
  = "بس"

FOREACH "FOREACH"
  = "لكل"

TODO "TODO"
  = "ليسوي"

WORKER "WORKER"
  = "عامل"
