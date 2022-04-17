---
title: Introduction
description: An introduction to programming in C language and running your first program.
tags: [C, history, includes, hello world]
---

## History

C was originally developed at Bell Labs by Dennis Ritchie in 1972 to construct utilities running on Unix later on it was also used to re-implement the kernel of the Unix operating system and has till this day been the kernel language for Unix. In 1989 C was standardized by ANSI (American National Standards Institute) to so called ANSI C or also known as C89. Later on in the same year it was adopted by the International Organization for Standardization (ISO) who then created the so called Standard C. Over the years ISO has published new standards corresponding to the year they were published in, so C90, C99, C11, C17 and are now working on C2x.

## Running a C program

When writing a C programm there are 4 phases of programming:

- Editing: Which is where you actually write or modify your code.
- Compiling: This part is actually split into 2 phase.
  - Preprocessing: Which is where the code can still be modified by the compiler.
  - Compilation: In the compilation is where the compiler actually checks the syntax and semantics of your code and makes sure everything is in order. The compiler then translates the code to assembly language which is then further translated into actual machine code/instructions. These machine instructions are then stored in object files that have either of the extensions `.obj` or `.o`.
- Linking: The goal of this phase is to get the program into its final form for execution. The linker combines the object modules with additional libraries needed by the program to create the entire executable file which can then be run.
- Running: This is the final phase and is self explanatory.

For more about how the compilation and linking works check out this [good article](https://medium.com/@bdov_/what-happens-when-you-type-gcc-main-c-a4454564e96d).

### First C Program

```c title="helloWorld.c"
#include "stdio.h"

int main(void)
{
    printf("Hello World");
    return 0;
}
```

To then compile and run our "Hello World" we can use for example the GNU Compiler Collection (gcc).

```bash
foo@bar:~$ gcc -std=c11 -pedantic -pedantic-errors -Wall -Wextra -g -o helloWorld helloWorld.c
foo@bar:~$ helloWorld.exe
Hello World
```

The options mean the following:

- `-std=c11` use C11 standard or can you use `-std=c89`, `-std=c99`, `-ansi`.
- `-pedantic` use strict ISO C warnings.
- `-pedantic-errors` use strict ISO C errors.
- `-Wall` shows all warnings.
- `-Wextra` turn on extra warnings.
- `-g` activates the debugger.
- `-o` the name of the executable file.

## Commenting

[//]: # (NEEDS TO BE WRITTEN UP)

## Include

The `#include <stdio.h>` is a so called preprocessor directive meaning we are telling the compiler that we want something done in the preprocessing phase. All preprocessor directives start with a `#`. The include instruction tells the compiler to "include" the contents of the "stdio.h" file. You might notice it has the `.h` extension which means it is a header file. Header files define information about functions, so called function prototypes which describe a function so the functions name, its arguments etc. The file we are including stands for standard input output which is part of the C standard library and we use the `printf` function of that file to write to the standard output, which is by default the console.

When specifying the file to be included you can either write it between double quotes or angle brackets. The difference between these two forms is subtle but important. If a header file is included using < >, the preprocessor will search a predetermined directory path to locate the header file (the folder for the standard library). If the header file is enclosed in "", the preprocessor will look first for the header file in the same directory as the source file and then in the other folders.
