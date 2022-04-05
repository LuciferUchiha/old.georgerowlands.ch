---
title: Variables and data types
description: How do variables work in C and what data types are there.
tags: [c, variables, data types, command line arguments, visibility, const, static, define, sizeof]
---

## Variables and data types

To create a variable you first need a name. A variable name must start with a letter or underscore and then be followed by any combination of letters, underscores or digits as long as the name in the end isn't a reserved word like "int". Secondly you need a type which defines how the data is stored in memory for example `int` is an integer. When writing `int x;` you are declaring a variable which reserves the space in memory to hold the later on assigned value as it knows the amount of bytes the data type of the variable needs. Initializing a variable is giving it an initial value. This can be done as part of the declaration like for example `int a = 12;`.

### Basic data types

[A basic list of c data types](https://en.wikipedia.org/wiki/C_data_types#Main_types), how much memory they take up but this is very computer and compiler dependant. Closly tied to the amount of memory is of course the value range of a variable. These ranges can be checked by including [limits.h](https://pubs.opengroup.org/onlinepubs/007904975/basedefs/limits.h.html) for integer values and [float.h](https://pubs.opengroup.org/onlinepubs/007904975/basedefs/float.h.html) for float values (part of the standard library).

Some interesting things to note are:

- You can assign values using hex so `int x = 0xFFFFFF` is possible.
- You can use scientific notation to assign values so `float x = 1.7e4` is possible.
- You can add short, long, signed and unsigned to numerical values. `short` **might** make the types memory usage smaller, `long` **might** make it larger. `signed` is by default so has no real effect, `unsigned` means its range is only positive values and includes 0. Unless it is `int` itself the word int can be omitted so `long int` and `long` are the same. For some reason you can also do `long long` and `short short` who knows why?
- If you want specific sized data types you can include from the standard library [stdint.h](https://pubs.opengroup.org/onlinepubs/009696899/basedefs/stdint.h.html) as to why to this doesn't exist for floats you can [read here](https://www.reddit.com/r/cpp/comments/34d7b6/why_do_we_have_intn_t_but_no_equivalent_for/).

### Boolean types

To have variables with boolean values in C we can use the `_Bool` data type which can have the values 0 (false) or 1 (true).

```c
#include <stdio.h>

int main(void) 
{
    _Bool x = 1; 
    _Bool y = 0;
    if(x) {
        printf("This will print!");
    } if (!y)
    {
        printf("This will also print!");
    }
}
```

Another way would be to use an Enum with a typedef, this takes advantage of Enums being constant integer values under the hood.

```c
#include <stdio.h>
typedef enum { FALSE, TRUE } Boolean;

int main(void) 
{
    Boolean x = TRUE;
    Boolean y = 0;
    if (x) {
        printf("This will print!");
    }
    if (!y) {
        printf("This will also print!");
    }
}
```

From C99 onwards you can also `#include <stdbool.h>`.

```c
#include <stdio.h>
#include <stdbool.h>

int main(void) 
{
    bool x = true;
    bool y = 0;
    if (x) {
        printf("This will print!");
    }
    if (!y) {
        printf("This will also print!");
    }
}
```

### Enums

[//]: # (TODO CLEANUP)

data type that only allows specific values
for example enum primaryColor {red, green, blue}

to now define primary color of this type enum primaryColor myColor = red;

under the hood C maps all the values to integer constants the first being 0 next beign 1 etc.; so myColor = 0; is the same as above. You can also define a different starting number and then other or increased by 1 or completly custom like north=0, east=90 etc.

## Constant values

### define

With `#define` you can define key value pairs that will be substituted in the preprocessing phase. Important is that you don't write a type, an equal or a semicolon!

```c
#include <stdio.h>  
#define PI 3.14  

int main(void) 
{  
   printf("%f",PI); 
   return 0; 
}  
```

You can also conditionally define variables depending on certain compiler arguments or environment variables.

```c
#include <stdio.h>  

#define X 2

#if X == 1
    #define Y 1
#elif X==2
    #define Y 2
#else
    #define Y 3
#endif

int main(void) 
{  
   printf("%d",Y); 
   return 0; 
}  
```

You can also execute certain code by checking if something is defined or not.

```c
#include <stdio.h>
#define UNIX 1

int main()
{
   #ifdef UNIX
   printf("UNIX specific function calls go here.\n");
   #endif
   printf("C has some weird things.\n");

   return 0;
}
```

### const

In C90 the `const` keyword was added which does not allow the value of a variable to change, making it read-only. Using const is much more flexible then define as allows you to use a data type and it is also better for performance.

```c
#include <stdio.h>

int main(void) 
{
    const int PI = 3.14;
    printf("%f",PI);  
    return 0;
}
```

### Format specifiers

There are lots format specifiers for outputting different data types. You can also use format specifiers to do cool things like adding leading or trailing zeros or only showing a certain amount of decimal points.

![cFormatSpecifiers](/img/programming/cFormatSpecifiers.png)

You can find more details in the [documentation of printf](https://www.cplusplus.com/reference/cstdio/printf/).

### Visibility

All identifiers (variables, functions, classes etc.) must be defined before they can be used . Depending on where the identifier is defined they identifier has has a different visibility. Identifiers in the same block must be ambiguous and are visible in the inner blocks. An identifier from an outer block can be redefined in an inner block and can therefore be shadowed.

```c
#include <stdio.h>
int main(void)
{
    int x = 6
    {
        int x = 9;
        {
            int x = 10;
            printf("%d", x) // 10
        }
         printf("%d", x) // 9
    }
}
```

#### Global

If you define a variable outside all blocks then it is part of the global scope and exists as long as the program runs and can be accessed between multiple files by including the header file where it is defined and adding the `extern` keyword before it.

```c title="main.c"
#include <stdio.h>

int x = 5; // global

int main(void)
{
    printf("%d", x) // 5
}
```

#### static

By adding the `static` keyword to the global variable we can limit it's visibility to just this file.

## Operators

Has the same operators as in many other languages and also work the same so not gonna go into detail. The only interesting ones to go into are below.

![cOperatorPrecedence](/img/programming/cOperatorPrecedence.png)

### Casting

[//]: # (CLEANUP REQUIRED)

conversion between different types can happen automatically (implicit) or has to be done explicit.

for example double to flaot is implicit as no data is lost however double to int data is lost so it ahs to be done explicit and the decimal points are truncated

(int) 25.1 + (int) 27.435

### sizeof

The sizeof operator is very simple and just outputs how many bytes a data type or variable takes up.

```c
int x = 3;

printf("An int takes up %ld bytes on my computer and a double %ld", sizeof(x), sizeof(double)); // 4 and 8
```

## Command line arguments

When compiling you can pass arguments to the main function. The first parameter `argc` is the argument count, the second parameter `argv` is the argument vector which is an array of strings. So in other words it is an array of character arrays or an array of character pointers.

```c title="main.c"
#include <stdio.h>

int main(int argc, char *argv[])
{
    printf("argc=%d\n", argc);

    // the first argument is the name of the executable
    printf("exe name=%s\n", argv[0]);

    for (int i = 1; i < argc; i++)
    {
        printf("argv[%d]=%s\n", i, argv[i]);
    }

    return 0;
}
```

To then pass arguments you can do the following

```bash
foo@bar:~$ gcc -std=c11 -pedantic -pedantic-errors -Wall -Wextra -g -o argvExample main.c
foo@bar:~$ argvExample.exe arg1 arg2
argc=3
exe name=./argvExample
argv[1]=arg1
argv[2]=arg2
```

## Inputting Data

The `stdio.h` file contains the `scanf()` function which reads input from the standard input stream "stdin", which by default is the console. The function can read and parse the input using the provided format specifier. Important to know is that it uses whitespaces to tokenize the input.

```c title="main.c"
#include "stdio.h"

int main(void)
{
    char str[100];
    int i;
    printf("Enter a word followed by a space and a number: ");
    // provide pointers to where to store the values (remember str is actually a pointer to the first element)
    int tokensRead = scanf("%s %d", str, &i); 

    printf("%d tokens were read str: %s  and i: %d", tokensRead,str, i);

    return 0;
}
```