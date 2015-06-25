[![Build Status](https://travis-ci.org/SimplyAhmazing/noor.svg)](https://travis-ci.org/SimplyAhmazing/noor)

# Noor-lang


Noor is a simple, yet aHmazing arabic programming language. It it is currently
in development mode and is being further defined and refined. It is implemented
in Javascript.

Noor comes with an IDE built to make it easy to write code in an
arabic environment.


![Imgur](http://i.imgur.com/oWQw0Xu.png)


TODO:
- [x] Variable bindings, strings and integers
- [x] Function invocation
- [x] Built in print statement
- [x] Conditionals
- [x] Function declaration
- [x] Iteration
- [ ] Standard library with trigonemtric key words
- [ ] Arrays and hashmaps


More to come soon...


FizzBuzz in Noor:

![Imgur](http://i.imgur.com/v1z1guF.png)


Fibonacci:
![Imgur](http://i.imgur.com/62TyjeP.png)


FizzBuzz source:
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


Fibonacci source:
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
