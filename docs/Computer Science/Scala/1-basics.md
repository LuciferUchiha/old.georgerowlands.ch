---
title: Basics
description: Basics
tags: [scala]
---

Why scala?

Scala stands for scalable language.

Variables:

vals are immutable
types of vals can be inferred from right hand
list of types

Expressions:

semi colon not needed and only used when multiple expressions on one line. prob not important

Instructions = DO something
Expressions = has a value everything in scala becomes a value

for example an if expression

val aCondition = true
val aConditrionValue = if(aConditon) 5 else 3

so the if returns a value so can also print it println(if(.....)

There are loops in scala but are very discouraged.
var i = 0
while(i < 10){
    println(i++)
}

in scala you do iteration a different way this is imperative programming which is very discouraged. Everything in Scala is an expression. To prove this

val aWeirdValue = (aVariable = 3) // Unit is the same as void which when printed is () which is the only value that can be hold.
Expressions that return unit are side effects so while return a unit for example. Can do fu things like

val aCodeBlock = {
    val y = 2
    val z=y+1
    if (z>2)"hello" else "goodbye"
}

the value of a code block is the last expression.

Functions:

def name(paramater: type): returnType = single expression or code code block
    a + " " + b

calling a function is just an expression which has the value of the calculation

parameterless functions can be called without brackets, it isn't the function itself...

// recursion instead of loops
def repeat(str: String, n: Int): String = {
    if (n==1) str
    else str + repeat(str, n-1)
}

return types can be infered but not with recursive becauase compilers cant figure it out  and should anyway be done for documentaiton.

can define auxilliary functions/ nested functions in functions.

Recursion:

In pure functional programming like haskell you dont use loops like while or for instead you use recursion. Scala also fully supports this witht the tailrec annotation.
stack till recursion.

factorial function has call stack so additional work becomes a Stackoverflow when stack runs out of space. To avoid this you write

def factorial(n: Int): Int = {
    def factHelper(x: Int, accumulator: BigInt) BigInt =
        if (x <= 1) accumulator
        else factHelper(x-1, x* accumulator)

    factHelper(n, 1)

    // factorial(10) = factHElper(10, 1)
    // becomes at the end factHelper(1, 1*2*3....*10)
}

this does not cause a stackoverflow compared to normal factorial. This is called tail recursion = use recursive call as the last expression. Can add @tailrec for compiler to check it for u.

def factoirial(n: Int): Int = {
    if (n <= 1) 1
    else n * factorial(n-1)
}

concatenate string example

scala has defualt and named arguments
scala has additonal string functions like easier conversion to int or pre and suffix operators???
s interpolators
In scala you can also do string interpolation by writing s"$name and also ${age + 1} is cool"
f interpolators
f"$name is $height%2.2f heigh"
raw interpoaltor
raw"This is a \n not escaped"
however if
val = "this is a new \n line"
raw"$val will not be escaped

class Person(val name: String, age: Int) class definition with constructor.

age is a class parameter, not an attribute, name however is. is just instead of private?
 on every isntantiatioin the body is executed {
    println(1+3)
    val x= 2; // is a field.
 }

 overload constructor with def this() = this("bob",0) but can just add default values for constrcutor... becuase can not have anythign else apart from call anotehr constructor

   println(mary.likes("Inception"))
  println(mary likes "Inception") // equivalent
  // infix notation = operator notation (syntactic sugar)
   only works if one parameter, works like operators
   can name methods with operators to override them as all operators are methods

   // prefix notation
  val x = -1  // equivalent with 1.unary_-
  val y = 1.unary_-
  // unary_ prefix only works with - + ~ !

    // postfix notation
  println(mary.isAlive) can be used with functions without parameters

  // apply
  println(mary.apply())
  println(mary()) // equivalent

Scala objects:
note is object not class. object is a type and a singelton instance.
object Person { // type + its only instance
    // "static"/"class" - level functionality
    val N_EYES = 2
    def canFly: Boolean = false

    // factory method
    def apply(mother: Person, father: Person): Person = new Person("Bobbie")
  }
 // COMPANIONS
  class Person(val name: String) {
    // instance-level functionality
  }

  new creates class instance and without new gets the singelton instance.

Scala Applications = Scala object with
def main(args: Array[String]): Unit so it can get converted to Java main

scala has single class inheritance just like Java with extends
scala also has private??? and can not be inherited
