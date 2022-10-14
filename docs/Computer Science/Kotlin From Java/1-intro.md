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

## Quick Differences between Java and Kotlin

No semicolons, you can still write it but it is redundant. The only reason is when you want to chain statements on the same line.

Kotlin has soft and hard keywords. Hard keywords work just like in java, you can't use them anywhere except for their intended purpose but soft keywords you can use for example as a variable name. It isn't recommended tho as itcan cause confussion.

Kotlin has a slightly different String class then in Java. for example in Java length is a method but in kotlin it is a property as it should be.

Kotlin also has different Exception handling. It does not differentiate between checked and unchecked exceptions, they are all unchecked?? throw keyword also does not exist in kotlin???

tenary operator x ? y : z, does not exist in kotlin instead uses if.

for loop does not exist in the same as in java.

no static keyword. Concept is replaced with toplevel function.

no new keyword, just makes writing more concise.

This is just a brief overview.

## Handling Equality

In Java we have the simple employee class with equals method overwritten:

```java
public class Employee {
    private String name;
    private int id;

    public Employee(String name, int id){
        this.name = name;
        this.id = id;
    }

    @Override
    public boolean equals(Object obj){
        if (obj == null) return false;
        if (obj == this) return true;
        if (obj instanceof Employee){
            Employee other = (Employee) obj;
            return name.equals(other.name) && id == other.id;
        }
    }
}
```

We already know how this works in Java and understand these outputs:

```java
Employee emp1 = new Employee("Bob",1);
Employee emp2 = new Employee("John",2);
Employee emp3 = new Employee("John",2);

System.out.println(emp1 == emp2); // False
System.out.println(emp2 == emp3); // False
System.out.println(emp1.equals(emp2)); // False
System.out.println(emp2.equals(emp3)); // True
```

In Kotlin we can implement a very similar class to the above class but much more concise:

```kotlin
class Employee(val name: String, val id: Int){
    override fun equals(obj: Any?): Boolean { // Any like object and can be null
        if(obj is Employee) {
            return name == obj.name && id == obj.id;
        }
    }
}
```

```kotlin
Employee emp1 = Employee("Bob",1);
Employee emp2 = Employee("John",2);
Employee emp3 = Employee("John",2);

println(emp1 == emp2); // False
println(emp2 == emp3); // True
println(emp1.equals(emp2)); // False
println(emp2.equals(emp3)); // True
```

In kotlin == does a strucutural equality check so the following 2 lines do the identical thing. To do a reference check in kotlin we use === . So in other words `==` in kotline is the same as calling equals in java and `===` in kotlin is the same as using `==` in Java. So we actually want:

```kotlin
Employee emp1 = Employee("Bob",1);
Employee emp2 = Employee("John",2);
Employee emp3 = Employee("John",2);

println(emp1 === emp2); // False
println(emp2 === emp3); // False
println(emp1 == emp2); // False
println(emp2 == emp3); // True
```

## Bit Operators

In kotlin to use bit operators you need to write it out instead of using the symbols so we have the following conversion:

| Operation             | Java        | Kotlin      |
| --------------------- | ----------- | ----------- |
| Conjunction (and)     | a & b       | a and b     |
| Disjunction (or)      | a \| b      | a or b      |
| Exclusive disjunction | (xor) a ^ b | a xor b     |
| Inversion             | ~ a         | a.inv()     |
| Shift Left            | a << bits   | a shl bits  |
| Shift Right           | a >> bits   | a shr bits  |
| Unsigned Shift Right  | a >>> bits  | a ushr bits |

Java also includes assignment operators modified with each of the bitwise operators, like `|=`. In Kotlin, we will have to repeat ourselves: a = a or b.

## Casting and Type checking

:::todo

smart casting, is and as keyword
:::

## String templates

Very similar to `f""` python we can now use variable values very easily in strings.

```kotlin
val n = 1
println("n=$n")
println("n+1=${n+1}")
// can also contain logic
println("$n is ${if(n > 0) "positive" else "not positive"}) 
```

## Raw Strings

In Kotlin you can write raw Strings using triple quotes. These strings can contain special characters without the need for escaping them just like in python when using `r""`. They can also span across multiple lines.

```kotlin
// instead of "C:\\Folder\\file.txt"
val path = """C:\Folder\file.txt""" 
val receipt = """Item 1: $1.00
Item 2: $0.50"""
// Because the above is hard to read often use this
receipt = """Item 1: $1.00
          >Item 2: $0.50""".trimMargin(">") 
```

The trimMargin method removes all white spaces from the start of every line up to the first occurrence. To still be able to use escape characters in raw strings you need to do the following:

```kotlin
val receipt = """Item 1: $1.00\nItem 2: $0.50"""
receipt = """Item 1: $1.00${"\n"}Item 2: $0.50"""
```
