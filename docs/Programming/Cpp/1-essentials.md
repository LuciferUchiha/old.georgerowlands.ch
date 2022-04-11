---
title: Essentials
description: TO BE DONEEEEE
tags: [cpp]
---

## Variables and data types

In C++ you pretty much have the same data types as in C and they work the same as C++ in an extension of C. If you want specific sized data types you can just as in C include from the standard library `cstdint.h`.

### Custom types

In C++ you can create your own types using typedef just as in C but you can also use the `using` keyword. Later you can also use structures and classes.

```cpp
typedef int int32_t;// in <cstdint>
typedef unsigned long long uint64_t;// in <cstdint>
using INT32 = int;
using UINT64 = unsigned long long;
```

### Placeholder type specifiers

The `auto` keyword specifies that the type of the variable that is being declared will be automatically deducted from its initializer. In the case of functions, if their return type is auto then that will be evaluated by return type expression at runtime.

The decltype function/operator lets you extract the type of the passed expression.

```cpp
#include <iostream>
#include <string>
using namespace std;
auto foo() { return "foo"; }
int main()
{
    auto x = 7;
    auto f = foo();
    decltype(69) y = x;
    // decltype(69) z = f; doesn't work
    cout << x << endl;
    cout << y << endl;
    cout << f << endl;

    return 0;
}
```

### Constant values

The `const` keyword can be used just like in C and makes a variable read only same goes for the `define` preprocessor directive. New in C++ however is the `constexpr` keyword. The constant expression allows us to create expressions and functions that are evaluated at compile time to speed things up.

```cpp
#include <iostream>
using namespace std;
constexpr int product(int x, int y){return (x * y);}
constexpr size_t length = 100;

int main()
{
    constexpr int x = product(10, 20);
    cout << x << endl << length << endl;
    return 0;
}
```

### Type conversion

In C++ just like in many other language you can convert data of one type to that of another. It has implicit and explicit conversion. Just as with many other languages when casting data can be lost.

```cpp
#include <iostream>
using namespace std;

int main() {
    int num_int1 = 9;
    double num_double1;
    // implicit conversion int to double
    num_double1 = num_int1;
    cout << "num_int1 = " << num_int1 << endl;
    cout << "num_double1 = " << num_double1 << endl;

    int num_int2;
    double num_double2 = 3.14;
    // implicit conversion double to int
    num_int2 = num_double2;
    cout << "num_int2 = " << num_int2 << endl;
    cout << "num_double2 = " << num_double2 << endl;

    return 0;
}
```

```bash title="Output"
num_int1 = 9
num_double1 = 9
num_int2 = 3
num_double2 = 3.14
```

#### C-style type casting

As the name suggests, this type of casting is same as in the C programming language and is also commonly refereed to the cast notation.

```cpp
#include <iostream>
using namespace std;

int main() {
    int num_int = 9;
    double num_double;
    // converting from int to double
    num_double = (double)num_int;
    cout << "num_int = " << num_int << endl;
    cout << "num_double = " << num_double << endl;

    return 0;
}
```

#### Function-style casting

This is the old way of doing it in C++ before type conversion operators were introduced.

```cpp
#include <iostream>
using namespace std;

int main() {
    int num_int = 9;
    double num_double;
    // converting from int to double
    num_double = double(num_int);
    cout << "num_int = " << num_int << endl;
    cout << "num_double = " << num_double << endl;

    return 0;
}
```

#### Type conversion operators

This is the way how it is done in modern C++.

##### Static cast

In general you use a static cast just like any other cast so far when you are certain of the data types involved in the conversion. This takes the pointer in ptr and tries to safely cast it to a pointer of type Type*. This cast is done at compile time. It will only perform the cast if the types are related. If the types are not related, you will get a compiler error.

```cpp
class B {};
class D : public B {};
class X {};

int main()
{
    D* d = new D;
    B* b = static_cast<B*>(d); // this works
    // X* x = static_cast<X*>(d); ERROR - Won't compile
    return 0;
}
```

##### Dynamic cast

A dynamic cast is executed at runtime, not compile time. Because this is a run-time cast, it is useful especially when combined with polymorphic classes. In fact, in certain cases the classes must be polymorphic in order for the cast to be legal.

##### Constant cast

It is used to change the constant value of any object or we can say it is used to remove the constant nature of any object.

 ```cpp
#include <iostream>
using namespace std;

int main()
{
    int x = 50;
    const int* y = &x;
    cout << "old value is " << *y << "\n";
    int* z = const_cast<int*>(y);
    *z = 100;
    cout << "new value is " << *y;
}
 ```

##### Reinterpret cast

???? very confussing

## Namespaces

### Scope operator and using

::

## Functions

### Const functions

## Class

### Constructors

In C++ primitive types don't have constructors so you need to initialize them in the constructor.

```cpp
#include <iostream>
using namespace std;

class Point {
private:
    double m_x;
    double m_y;

public:
    // default constuctor
    Point() = default; // or just Point(){};
    Point(double x, double y) { // Point object is already initialized
        m_x = x; // lots of copiessssss
        m_y = y;
    }
};

int main()
{
    Point p1(); // default constructor, very bad nothing is initialized
    Point p2(1, 2);
}
```

However the above example is a bad way of creating a constructor as the object is already initialized and then the values are changed, this leads to lots of member-wise copying unnecessarily used memory. Even worse is the default constructor which leaves the attributes uninitialized because as mentioned the primitives don't have a default constructor.

### Initializer lists

Instead in modern C++ we use initializer lists which stops the copying and everything bad mentioned above.

```cpp
#include <iostream>
using namespace std;

class Point {
private:
    double m_x;
    double m_y;

public:
    // default constuctor
    Point() : m_x(0), m_y(0) {};
    Point(double x, double y): m_x(x), m_y(y) {};
};

int main()
{
    Point p1(); // default constructor x and y are 0
    Point p2(1, 2);
}
```

### Default parameters

We can improve the above constructor even more by using default parameter values. Because the arguments also don't change and we don't want them to we can add const.

```cpp
#include <iostream>
using namespace std;

class Point {
private:
    double m_x;
    double m_y;

public:
    Point(const double x = 0, const double y = 0): m_x(x), m_y(y) {};
};

int main()
{
    Point p1(); // x and y are 0
    Point p2(1, 2);
}
```

### Explicit constructor

You need to be very careful with creating constructors and often have to define a constructor as explicit otherwise something might just implicitly create an object of a certain type.

```cpp
#include <iostream>
using namespace std;
  
class Complex {
private:
    double real;
    double imag;
  
public:
    // Default constructor
    explicit Complex(double r = 0.0, double i = 0.0)
        : real(r), imag(i)
    {}
  
    // compare two Complex numbers
    bool operator==(Complex rhs) { return (real == rhs.real && imag == rhs.imag); }
};
  
int main()
{
    Complex com1(3.0, 0.0);
    cout << com1 == 3.0 << endl; // if not explicit this will create a Complex object (3.0,0.0) and compare them
    return 0;
}
```

### Anonymous/temporary object

These objects have no name and are thrown away after use.

```cpp
#include <iostream>
using namespace std;
class Point {
    double m_x, m_y;
public:
    Point(double x = 0, double y = 0)
        : m_x(x), m_y(y)
    {}

    void print() {
        cout << "(" << m_x << "/" << m_y << ")" << endl;
    }
};

int main()
{
    Point(1, 3).print();
    return 0;
}
```

## Struct

Just like in C you have structs which are also commonly called open classes. Structs can only hold public attributes and no functions.

### Struct packing

When working with structs it is however important to know how the memory is used. A struct declaration allocates a contiguous memory for the collection. It uses a multiple of the largest attribute in memory which is needed for all attributes + any padding needed. It uses the largest attribute as alignment for easier access. which can lead to the order of your attributes having an influence on how much the object takes up in memory.

```cpp
struct top { // total of 16 bytes
    char* p; // 8 bytes on 64 bit, 4 on 32 bit system
    int i; // 4 bytes
    short s; // 2 bytes
    char c; // 1 byte
    // 1 byte padding
}

struct bottom { // total of 24 bytes
    char c; // 1 byte
    // 7 bytes padding
    char* p; // 8 bytes
    short s; // 2 bytes
    int i; // 4 bytes
    // 2 bytes padding
}   
```

You can check the alignment of a struct with `alignof(top)`. You can also change the default behaviour with either `#pragma pack(1)` to use 1 byte alignment and then after defining the struct restet it back to default with `#pragma pack()`. Or you can use `struct alignas(4) S{};`.

### Bit fields

Bitfields can only be used inside structured data types, i.e. struct, class, and union types and with integer types. The purpose is to allow you to pack multiple members inside a single byte.

```cpp
struct halfbyte_t {
    unsigned int half1: 4;
    unsigned int half2: 4;
} halfbyte;
```

This declares a variable named halfbyte that contains two 4-bit members, which will be packed into a single 8-bit byte, rather than having to use 2 bytes if you just declared them unsigned char. 1-bit fields are especially useful if you have lots of boolean flags in a structure, since you don't have to have a separate byte for each flag.

## Union

In a union all members share the same memory location. This means that at any given time, a union can contain no more than one object from its list of members. It also means that no matter how many members a union has, it always uses only enough memory to store the largest member.

```cpp
#include <iostream>
#include <string>
using namespace std;

union Record // will only take up a double amount in memory
{
    char   ch;
    int    i;
    long   l;
    float  f;
    double d; // biggest attribute
    int* int_ptr;
};

int main() {
    Record t;
    t.i = 5; // t holds an int
    t.f = 7.25; // t now holds a float, int is gone

    cout << t.f << endl;
    cout << t.i << endl;
}
```

```bash title="Output"
7.25
1088946176
```

## Enum

Just like in C you can use enums and they work the same way.

### Enum class

Enum classes or so called scoped enumerations make enumerations both strongly typed and strongly scoped. Class enums don't allow implicit conversions to int, and also don't allow comparisons between different enumerations.

```cpp
#include <iostream>
using namespace std;

int main()
{
    enum class Color {
        Red,
        Green,
        Blue
    };
    enum class State {
        Good,
        Bad
    };

    // An enum value can be used as variable identifier
    int Green = 10;

    // Instantiating the Enum Class
    Color x = Color::Green;

    // Comparison now is completely type-safe
    if (x == Color::Red)
        cout << "It's Red\n";
    else
        cout << "It's not Red\n";

    State p = State::Good;

    if (p == State::Bad)
        cout << "Something went wrong\n";
    else
        cout << "All is good\n";

    // won't work because no implicit conversion to int
    // if(x == p)
    // cout<<"red is equal to good";
    // cout<< x;
    cout << int(x);

    return 0;
}
```
