---
title: Overloading
description: TO BE DONEEEEE
tags: [c++, overloading, operator overloading, friend, move-semantic]
---

C++ allows you to specify more than one definition for a function name or an operator in the same scope, which is called function overloading and operator overloading.

## Function Overloading in C++

You can have multiple definitions for the same function name in the same scope. The definition of the function must differ from each other by the types and/or the number of arguments in the argument list. You cannot overload function declarations that differ only by return type.

```cpp
class PrintData {
   public:
      void print(int i) {
        cout << "Printing int: " << i << endl;
      }
      void print(double  f) {
        cout << "Printing float: " << f << endl;
      }
      void print(char* c) {
        cout << "Printing character: " << c << endl;
      }
};
```

## Operator Overloading

You can redefine or overload most of the built-in operators available in C++. Thus, a programmer can use operators with user-defined types as well.

Overloaded operators are functions with special names: the keyword "operator" followed by the symbol for the operator being defined. Like any other function, an overloaded operator has a return type and a parameter list.

```cpp title="Box.h"
#pragma once
class Box {
    double m_length;
    double m_breadth;
    double m_height;

public:
    Box(const double length = 0, const double breadth = 0, const double height = 0)
        : m_length(length)
        , m_breadth(length)
        , m_height(height)
    {}

    double getVolume(void) {
        return m_length * m_breadth * m_height;
    }
    void setLength(double length) {
        m_length = length;
    }
    void setBreadth(double breadth) {
        m_breadth = breadth;
    }
    void setHeight(double height) {
        m_height = height;
    }

    Box operator+(const Box& b) {
        Box box;
        box.m_length = this->m_length + b.m_length;
        box.m_breadth = this->m_breadth + b.m_breadth;
        box.m_height = this->m_height + b.m_height;
        return box;
    }
};
```

```cpp title="main.cpp"
#include <iostream>
#include "Box.h"

using namespace std;

int main()
{
    Box box1(6, 7, 5);
    Box box2(12, 13, 10);
    double volume;


    cout << "Volume of Box1 : " << box1.getVolume() << endl;
    cout << "Volume of Box2 : " << box2.getVolume() << endl;

    Box box3 = box1 + box2;

    cout << "Volume of Box3 : " << box3.getVolume() << endl;
    return 0;
}
```

````bash title="Output"
Volume of Box1 : 180
Volume of Box2 : 1440
Volume of Box3 : 4860
```

### With move-semantic

### Not overloadable Operators

- ::
- .*
- .
- ?:

:::warning
If you overload && or || you deactivate the Short-circuit evaluation.
:::

### Operators as functions

### Friend functions

### Index operator

### Assignment operator

### Increment/Decrement operator

### Type conversion operator

### Literal operator
