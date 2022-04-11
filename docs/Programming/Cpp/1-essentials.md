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

## Namespaces

### Scope operator and using

::

## Class, Struct, Union

### Constructors

primitve data types dont have cosntructors so need to be initialized manually. what does explicit do?

#### Copy constructor

#### Move constructor

### Destructor

### Anonymous/temporary objects

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

### Initializer lists

as constructors, function arguemtns, Range for loop

## Structs

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

## Enums

Just like in C you can use enums and they work the same way.

### Enum classes

## Binding of values

??? not sure it is called this jsut splitting no?

## Type conversion

normal casts, static_cast, dynamic_cast, const_cast, reinterpret_cast

## Enum classes
