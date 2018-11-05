[![Build Status](https://travis-ci.org/SimplyAhmazing/noor.svg)](https://travis-ci.org/SimplyAhmazing/noor)

# Noor-lang


Noor is a simple, yet aHmazing arabic programming language. It it is currently
in development mode and is being further defined and refined. It is implemented
in Javascript.

Noor comes with an IDE built to make it easy to write code in an
arabic environment.


![Imgur](http://i.imgur.com/oWQw0Xu.png)


## TODO
- [x] Variable bindings, strings and integers
- [x] Function invocation
- [x] Built in print statement
- [x] Conditionals
- [x] Function declaration
- [x] Iteration
- [ ] Booleans
- [ ] Arrays and hashmaps
- [ ] Standard library with trigonemtric key words


## Status

Noor is still in development. The purpose of this project is to demonstrate
a beginner friendly programming language that uses a non-latin alphabet based
language, hence Arabic. Noor is implemented in JS so that it can run natively in
the browser.

In prior commits, Noor used a hand written lexer and parser but now uses PEGJS,
a [Parser Expression Grammar][peg-paper] that combiles the lexing and parsing phases
into one step. There are some grievances I have with PEGJS, one is you cannot
get the line number or information which caused a syntax error when building the
abstract syntax tree for a program. Returning to a hand-written lexer and parser
is still a possibility in my mind.

## Goals

- Complete test coverage
- Enough language features and concepts to solve basic programming exercies
- More to come soon...


[peg-paper]: http://pdos.csail.mit.edu/~baford/packrat/popl04/peg-popl04.pdf



FizzBuzz in Noor:

![Imgur](http://i.imgur.com/v1z1guF.png)


Fibonacci:
![Imgur](http://i.imgur.com/62TyjeP.png)


FizzBuzz source:

<div dir="rtl">

```
امر عامل قاسمــمع٣ (ن) ليسوي
   د = ن ٪ ٣
   د
بس

امر عامل قاسمــمع٥ (ن) ليسوي
   د = ن ٪ ٥
   د
بس

لكل شي في [١..١٠٠] سوي
  د = قاسمــمع٣ (شي)
  ن = قاسمــمع٥(شي)

  اطبع شي

  لو  د == ٠ سوي
     اطبع "Fizz"
  بس

  لو ن == ٠ سوي
     اطبع "Buzz"
  بس

بس
```

</div>

Fibonacci source:

<div dir="rtl">
   
```
امر عامل فب (ن) ليسوي
    د = ٠
    لو ن < ٢ سوي
      د = ن
    والا
      ش = ن - ١
      س = ن - ٢
      م = فب(ش)
      ك = فب(س)
      د = م + ك
    بس
    د
بس

اطبع (فب(٥))

اطبع (فب(١٠))

اطبع (فب(١٥))
```

</div>
