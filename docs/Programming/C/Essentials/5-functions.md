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

You might find yourself often swapping values between two variables which would lead you to implementing a swap function and your first attempt might look something like this

```c
#include <stdio.h>
void swap(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
    printf("swap: a=%d, b=%d\n", a, b);
}
int main()
{
    int a = 10;
    int b = 5;

    swap(a, b);
    printf("main: a=%d, b=%d\n", a, b);

    return 0;
}
```

When executing the above code you will notice that the desired result was not reached due to functions in java being pass by value. To fix this we can use pointers and create functions which are pass by reference.

```c
#include <stdio.h>
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
    printf("swap: a=%d, b=%d\n", a, b);
}
int main()
{
    int a = 10;
    int b = 5;

    swap(&a, &b);
    printf("main: a=%d, b=%d\n", a, b);

    return 0;
}
```

### Multiple return values

By using pointers as so called output parameters you can have functions return more then one value.

## Macros

TODO:
