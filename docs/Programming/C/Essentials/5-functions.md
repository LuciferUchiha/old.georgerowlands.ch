---
title: Functions
description: What are functions, how can you create and use them in C?
tags: [C, functions, function prototype, macros]
---

## Functions

Just as with variables functions need to be defined before they can be used. To declare a function we use function prototypes, which include a name, the type of value it return and a list of parameters it takes. Parameters being values that the function it takes as input, also with a name and type just like variables.

Parameters are pass by value in C, meaning that a copy of the input is made on the stack which is local to the function body. Later on you can also pass by reference using pointers.

```c
#include <stdio.h>
int addNumbers(int a, int b); // function prototype

int main()
{
    int n1 = 1, n2 = 2, sum;

    sum = addNumbers(n1, n2);
    printf("sum = %d",sum);

    return 0;
}

int addNumbers(int a, int b) {
    return a + b;
}

```

### Pass by reference

swap example from book with pass by value and pass by reference.

### Multiple return values

pointers also allow then to have multiple returns, so called output parameters.

## Macros

TODO:
