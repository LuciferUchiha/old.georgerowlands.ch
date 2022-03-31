# Introduction

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

```shell
gcc -std=c11 -pedantic -pedantic-errors -Wall -Wextra -g -o helloWorld helloWorld.c
helloWorld.exe or ./helloWorld.o
```

The options mean the following:

- `-std=c11` use C11 standard or can you use `-std=c89`, `-std=c99`, `-ansi`.
- `-pedantic` use strict ISO C warnings.
- `-pedantic-errors` use strict ISO C errors.
- `-Wall` shows all warnings.
- `-Wextra` turn on extra warnings.
- `-g` activates the debugger.
- `-o` the name of the executable file.

## Include

The `#include <stdio.h>` is a so called preprocessor directive meaning we are telling the compiler that we want something done in the preprocessing phase. All preprocessor directives start with a `#`. The include instruction tells the compiler to "include" the contents of the "stdio.h" file. You might notice it has the `.h` extension which means it is a header file. Header files define information about functions, so called function prototypes which describe a function so the functions name, its arguments etc. The file we are including stands for standard input output which is part of the C standard library and we use the `printf` function of that file to write to the standard output, which is by default the console.

When specifying the file to be included you can either write it between double quotes or angle brackets. The difference between these two forms is subtle but important. If a header file is included using < >, the preprocessor will search a predetermined directory path to locate the header file (the folder for the standard library). If the header file is enclosed in "", the preprocessor will look first for the header file in the same directory as the source file and then in the other folders.

## Inputting Data

THESE NEEDS TO COME LATER ON after pointers and arrays, strings
reading input from keyboard the most general is scanf reads input from standard input stream stdin which is by default the console according to the provided format. comes in as a string but can be formatted to other types as seen later. returns number of items it succesfully reads so when typign in 2014 it will be 4 characters not 1 string or a number. scanf uses whitespaces to decide how to divide the input.

```c title="main.c"
#include "stdio.h"

int main(void)
{
    char str[100];
    int i;

    printf("Enter a word: ");
    scanf("%s", str); // automatically is a pointer to index 0, only reading till whitespace

    printf("Enter an integer: ");
    scanf("%d", &i); // needs pointer to where to save

    printf("You entered str: %s  and i: %d", str, i);

    return 0;
}
```

## Variables and datatypes

in memory each byte has a unique address not each bit.
naming variables start with a letter or underscore and then followed by any combiantion of letters, underscores or digits as long as it also isn't reserved like int. declaring variable reserves the space in memory as it know the amount of bytes the data type of the variable needs. type-speicfer variable-name; multiple of same type int x,y,z; assign value to variable with =  for example x = 12; initializing varibale is giving it an initial value, can be done as part of declaration like int a= 12;

### Basic data types

#### Numbers

types to store integers, floating points and characters. int, float, double, char, _Bool. memory needed for a certain type is dependent on machine and the compiler. int might take 32 bit or 64bit depending.

int x= 0; can also be asssigned in hex x=0xFFFFFF;

can add to bsaic integer types short long and unsigned(only 0 and positive) unsigned basically doubles the range  to check the ranges #include `<limits.h>` and float.h

short int might use less storage not neccesarly tho
long int or just long might use more storage or long float
long long int or just long long might use more storage then a long int

floating points can also be assigned using scientific notation so
float x=3. or 125.8 or -.001 or -3.47 or 1.7e4

double is same as float but more bits most computers 64bits
can create long double but useless???

_Bool value 0 or 1 so true or false.

or you could make your own with an Enum typedef enum { FALSE, TRUE } Boolean; // [TLPI]
Boolean b;
b = TRUE;

from C99 can also #include < stdbool.h> and then write bool val = true/false;

look at C wikipedia

#### Enums and chars

data type that only allows specific values
for example enum primaryColor {red, green, blue}

to now define primary color of this type enum primaryColor myColor = red;

under the hood C maps all the values to integer constants the first being 0 next beign 1 etc.; so myColor = 0; is the same as above. You can also define a different starting number and then other or increased by 1 or completly custom like north=0, east=90 etc.

chars are single characters like 'a' or '6' or ';'; under the hood also just numbers mapped to the ascii table.
so char grad=65; will transfer via ASCII table

escape characters are special character that represnt actions like new line etc. x='\n' or '\r' carraige return

### fomat specifers

for precision of floats for example, does it trunk or round?

### command line arguments

THIS NEEEDS TO COME LATER ON, after arrays
main gets two arguments argc for argument count and argv for argument vector which is an array of character pointers so strings(advanced)

## Operators

arithmetic or logical(boolean) operators and others like assignment, bitwise or relational.
all the same as in java and other languages so not gonna explain important to know is precedence

### Cast and sizeof

conversion between different types can happen automatically (implicit) or has to be done explicit.

for example double to flaot is implicit as no data is lost however double to int data is lost so it ahs to be done explicit and the decimal points are truncated

(int) 25.1 + (int) 27.435

siezof we used above but tells u how many bytes in memory are occupied by a type

## Control Flows

also work the same way as in java and other languages.

## Arrays

## Pointers

## Character arrays, Strings

## Functions

## Structures
