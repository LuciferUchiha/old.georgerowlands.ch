---
title: Data Types and Null References
tags: [kotlin, java, jvm, types]
---

## Kotlin's Builtin Types

Everything in Kotlin is a class so there are no primitive types that are written in lowercase like in java. However, the available types are pretty much the same as in Java. This also makes sense since, in the end, it will all run on the JVM. There are however some things you need to be aware of when working with Kotlin's builtin types.

### Numerical Types

by default integer literals are of type Int. Automatic covnersion from int to long does not work, i.e automatic sign extension / implicit casting / wideing of numbers, instead use .toLong(). Long is also with L literal

The same works for byte to short or int etc. instead need to use toShort etc.

default is double just like in java. Float is with f literal. Here also no automatic widening.

### Character Types

char is also between '' but can not assign int value to use character set index like in java. to do this we need to use toChar() from an integer type.

### Boolean Type

works the same as in java and also still have autoboxing if use Java class with primitive value but pass kotlin wrapper class instance.

### Any, Unit and Nothing

Any is sort of like Object Class, It is the root of all Kotlin classes.

Unit is like a void type, this is a very similar to conecept as used in Scala. So for void return we actually use return type unit and it does return a empty singelton not nothing.

Nothing is a subclass of any class. This concept seems very weird?

## Arrays

## Null References
