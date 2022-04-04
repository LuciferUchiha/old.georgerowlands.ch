---
title: Essentials
description: TO BE DONEEEEE
tags: [c++]
---

## Variables and data types

In C++ you pretty much have the same data types as in C and they work the same as C++ in an extension of C. If you want specific sized data types you can just as in C include from the standard library [cstdint.h].

### Custom types

In C++ you can create your own types using typedef just as in C but you can also use the `using` keyword. Later you can also use structs and classes.

```cpp
typedef int int32_t;// in <cstdint>
typedef unsigned long long uint64_t;// in <cstdint>
using INT32 = int;
using UINT64 = unsigned long long;
```
