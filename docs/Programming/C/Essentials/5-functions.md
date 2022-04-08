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

### Pointers to functions

We can use pointer for functions for a multitude of things for example passing a function to a map function which applies the function to every element in the array.

```c
#include <stdio.h>
#include <stdlib.h>

#define LENGTH 5

void map(int a[], int len, int (*f)(int))
{
    for (int i = 0; i < len; i++)
    {
        a[i] = f(a[i]);
    }
}

int inc(int i)
{
    return i + 1;
}

int main()
{
    int i;
    int values[LENGTH] = {88, 56, 100, 2, 25};

    printf("Before: ");
    for (i = 0; i < LENGTH; i++)
    {
        printf("%d ", values[i]);
    }

    map(values, LENGTH, inc);

    printf("\nAfter: ");
    for (i = 0; i < LENGTH; i++)
    {
        printf("%d ", values[i]);
    }

    return (0);
}
```

```bash title="output"
Before: 88 56 100 2 25 
After: 89 57 101 3 26
```

Another common use case is when you want to use the `qsort` function from the standard library to sort an array.

```c void qsort(void *base, size_t nitems, size_t size, int (*compar)(const void *, const void*))```

```c
#include <stdio.h>
#include <stdlib.h>

#define LENGTH 5

int compareInts(const void *a, const void *b)
{
    return (*(int *)a - *(int *)b);
}

int main()
{
    int i;
    int values[LENGTH] = {88, 56, 100, 2, 25};

    printf("Before: ");
    for (i = 0; i < LENGTH; i++)
    {
        printf("%d ", values[i]);
    }

    qsort(values, LENGTH, sizeof(int), compareInts);

    printf("\nAfter: ");
    for (i = 0; i < LENGTH; i++)
    {
        printf("%d ", values[i]);
    }

    return (0);
}
```

```bash title="output"
Before: 88 56 100 2 25 
After: 2 25 56 88 100
```

## Macros

TODO:
