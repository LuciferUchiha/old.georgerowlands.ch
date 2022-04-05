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

const long *pvalue = &value defines a pointer to a constant. so the value cant be changed so*pvalue=99; is not possible. but we can still change it via value=99 can also still change to waht the pointer is pointing to so long number and then pvalue=&number is still possible.

not allowing the address to change then you write int *const pConst, cant change the address, but can change the values???? can then also combine the 2.
