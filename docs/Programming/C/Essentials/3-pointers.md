---
title: Pointers
description: What are pointers how are they useful and how can we use them in C.
tags: [c, pointers, void pointers, const pointers]
---

Every variable is a memory location and every memory location has an address which can be accessed using the address-of operator, `&`. A pointer is a variable whose value is the address of another variable. This address is internally represented as an unsigned int on most systems however you shouldn't think of it as such (you can output it in hex using the %p format specifier). Every pointer has the type of the variable it is pointing to so the compiler knows how much memory is occupied by that variable. The `*` denotes a pointer. You can define and initialize a pointer by pointing to no location in memory with `NULL`, a so called null pointer, which is also equivalent to 0.

To access the value the variable holds which a pointer is pointing we can dereference the pointer by using `*` again.

Pointers are also stored in memory so they also have addresses so it is possible to output them as well. &pnumber warning by compiler because expected a pointer but it is a pointer to a pointer of itn so cast to void\*???

:::warning
You should never dereference an uninitialized pointer as if you assign it a value it could go anywhere. You could maybe overwrite data or even cause the program to crash!
:::

```c
#include <stdio.h>
int main()
{
    int var = 5;
    int* p_var = &var;
    printf("var=%d and it's address is %p\n", var, (void*)&var);
    printf("p_var=%p and it's address is %p and the value it points to is %d", (void*)p_var, (void*)&p_var, *p_var);
    return 0;
}
```

## Void pointers

A void pointer can store an address of any type and can not be dereferenced as it doesn't know the size of the type it is pointing to so you must first cast it to another pointer type if you want to do so.

```c
#include<stdio.h>
int main()
{
    int a = 10;
    void *ptr = &a;
    printf("Address of a is %p\n", ptr);
    printf("Value of a is %d", *((int*)ptr));
    return 0;
}
```

## Const pointers

There are 3 ways you can use the `const` keyword with pointers all having different results.

When `const` is written before the type it defines a pointer to a constant value meaning we cant change the value via dereferencing. If the variable the pointer points isn't defined as a constant then the value can still be changed.

```c
#include<stdio.h>
int main()
{
    int val = 10;
    const int* pointer = &val;
    // *pointer = 3;  this does not work
    val = 4; // this however still does
    pointer = &val;
    printf("%d", *pointer); // 4
}
```

When `const` is written in between the type and identifier you can not change the address the pointer points to, however you can still the change the value of the variable as this has no effect on the address.

```c
#include<stdio.h>
int main()
{
    int val = 10;
    int* const pointer = &val;
    int otherVal = 3;
    // *pointer = &otherVal;  this does not work
    *pointer = 5; // this however still works
    printf("%d", *pointer); // 4
}
```

You can then also combine these two concepts.
