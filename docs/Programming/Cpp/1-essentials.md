---
title: Essentials
description: TO BE DONEEEEE
tags: [c++]
---

## Variables and data types

In C++ you pretty much have the same data types as in C and they work the same as C++ in an extension of C. If you want specific sized data types you can just as in C include from the standard library [cstdint.h].

### Custom types

In C++ you can create your own types using typedef just as in C but you can also use the `using` keyword. Later you can also use structures and classes.

```cpp
typedef int int32_t;// in <cstdint>
typedef unsigned long long uint64_t;// in <cstdint>
using INT32 = int;
using UINT64 = unsigned long long;
```

### Visibility

All identifiers (variables, functions, classes etc.) must be defined before they can be used just as in C. Depending on where the identifier is defined they identifier has has a different visibility. Identifiers in the same block must be ambiguous and are visible in the inner blocks. An identifier from an outer block can be redefined in an inner block and can therefore be shadowed.

```cpp
int x = 6
{
    int x = 9;
    {
        int x = 10;
        std::cout<< x << std::endl; // 10
    }
    std::cout<< x << std::endl; // 9
}
```

#### Namespaces

global namespace

#### Scope operator and using

### Module variables and functions

## Preprocessor
