---
title: Inheritance
description: Inheritance
tags: [cpp, inheritance, interfaces, polymorphism]
---

Works very similar to other programming languages like Java where you have super/parent classes and sub/child classes and the child inherits the attributes and functions of the parent.

```mermaid
class diagram of Person and Student.
```

In C++ the above relationship would be implemented like this:

```cpp title="Person.h"
class Person {
    string m_name;
    int m_age;
public:
    Person(const char name[], int age) : m_name(name), m_age(age) {}
    string getName() const{ retur nm_name; }
    void setAge(intage) { m_age= age; }
    void print() const; // no implementation
};
```

```cpp title="Person.cpp
    void Person::print() const{
        cout << "Name: " << m_name << endl;
        cout << "Alter: " << m_age << endl; 
    }
```

```cpp title="Student.h"
class Student : public Person {
    int m_number;
public:
    Student(conststring& name, int age, int nr) : Person(name, age), m_number(nr) {} // call super constructor
    void setNumber(int nr) { m_number = nr; }
    void printNumber() const; // no implementation
};
```

```cpp title="Student.cpp"
// implementation
void Student::printNumber() const {
    cout << "Matrikelnummer: " << m_number << endl;
}
```

```cpp
void main() { 
    Person pers("Peter", 20);
    pers.setAge(21);
    pers.print();

    Student student("Anna", 21, 50101);
    student.setName("Anne");
    student.setNumber(56123);
    student.print();
    student.printNumber();

    Person pers2 = student; // projects/copies student onto person
    pers2.print();
    // pers2.printNumber(); // not defined
}
```

As one would expect you need to call the parent constructor in the initializer list of the child (if this is not done the default constructor will be called). Then you can further delegate to other constructors in the child and make sure all attributes are initialized.

## Inheriting Constructors

There is a special way to use the `using` keyword to inherit and be able to refer to the constructors of a parent. If in the below example the using is not used then the default constructor would be called and m_val would not be initialized.

```c
class A
{
    int m_val;
    public: 
        A(int x) : m_val(x) {}
};

class B: public A
{
     using A::A;
};
```

## Deconstructors

The deconstructor of a child calls the deconstructor of its parent after completion. This is so that dynamically allocated attributes can be removed first. Deconstructors should also in most cases only be implemented if there are dynamically allocated attributes that need to be cleaned up.

Important is that the deconstructor will also be called at the end of the block in which a static object was used.

## Overload Resolution with Inheritance

A common scenario is that a child overloads a parent's function. When doing so we can however run into problems for example if he have the following functions:

```cpp
void Person::foo(char c);
void Student::foo(int i);
```

and then want to do the following:

```cpp
Student s;
s.foo(10); // Student::foo(int i) is called
s.foo('A'); // Student::foo(int i) is called
```

We cant see that in both cases the Student implementation gets used. This is because the compiler looks first in the child if there is a function that matches the call, and there is because the char can get implicitly casted to an int (only after it has checked all functions in the child will it scan the parent). But what if we want the char implementation of the parent to be used. There are two ways:

- The child offers the parents function by writing `using Person::foo;`.
- The parent function is explicitly called `s.Person::foo('A');`.
