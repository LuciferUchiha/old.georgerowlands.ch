---
title: Introduction to Kotlin
tags: [kotlin, java, jvm]
---

kotlin can run anywhere where java can run as uses jvm aswell. Does have native compiler tho. statically typed and object oriented like java but can also be used for functional programming.

4 guiding principles:

- Safety
- Concise
- pragmatic not academic like scala
- interoprability, especially with java

some blabla about kotlin and how works with jvm.

Kotline compiler (kotlinc) takes the kotlin files and generates bytecode in a .class file, just like in Java. The bytecode is then run using the JVM. However you also need a the kotlin runtime library in addition to the JRE. So when distributing a kotlin application you need to distribute JRE and kotlin runtime library. WHY??

## Converting Hello World

```java title="HelloWorld.java"
class HelloWorld {
    static void main(String[] args){
        System.out.println("Hello World!");
    }
}
```

```kotlin title="HelloWorld.kt"
fun main(args: Array<String>){
    println("Hello World!")
}
```

Don't need to be in a class, compiler is smart enough to create one for use. Array is class as everything is a class in kotline. no return type. functions outside of class are called toplevel function.

## Kotlin standard library

Notice in the hello world there is no import for the Array class or for the println function. This is because these are part of the kotlin standard library which the compiler automatically imports by default so less imports have to be written. This is very similiar to in Java where java.lang is imported by default which includes classes such as Object, Boolean, Enum, etc.

You can find a full list of what kotlin imports by default in the [kotlin documentation](https://kotlinlang.org/docs/packages.html#default-imports).

## Variable declarations

Kotlin uses type inference which is done at compile time. val is immutable so like final in java and var is mutable.

```kotlin
fun main(args: Array<String>){
    val number //does not work as compiler doesn't know how many bytes to reserve
    val number = 25 // either intialize so type can be inffered
    val number2: Int // or assign type
    val number = 10 //would not work as immutable
}
```

Just like when workign with final in java and class instances, if the instance is immutable but the attributes are mutable we can still change them, we just can't change the instance reference.

```kotlin
class Employee(val name: String, var age: Int){}

fun main(args: Array<String>) {
    val employee1 = Employee("Bob Ross", 25)
    employee1.name = "Michael Jackson" // does not work as name is val
    employee1.age = 35 // works fine
    employee1 = Employee("Sherlock Holmes", 30) // does not work
}
```

## Type Aliases

Kotlin introduced in 1.1 type aliases which allow you to create aliases for a type. It does not create a new class for the type but just replaces it later on. This can be especially useful when working with long class names or generic classes.

For example in kotlin if we look at the implementation of StringBuilder it is actually just a type alias of the java.lang.Stringbuilder.

Typealiases should be defined on the toplevel so outside of any class.

```kotlin
typealias EmployeeSet = Set<Employee>

class Employee(val name: String, var age: Int){}

fun main(args: Array<String>) {
    val employee1 = Employee("Bob Ross", 25)
    val employees = EmployeeSet()
    employees.add(employee1)
}
```

If you want to use Type aliases defined in other files you can just import them like classes.
