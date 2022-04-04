---
title: Essentials
description: A extensive and detailed summary on the basics of programming C language including examples.
tags: [C, Types, Operators, Control Flow, Arrays, Pointers, Strings, File I/O]
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

## Inputting Data

[//]: # (THIS HAS A DEPENDENCY TO STRINGS AND POINTERS SO MOVE FURTHER DOWN)

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

### Format specifiers

There are lots format specifiers for outputting different data types. You can also use format specifiers to do cool things like adding leading or trailing zeros or only showing a certain amount of decimal points.

![cFormatSpecifiers](/img/programming/cFormatSpecifiers.png)

You can find more details in the [documentation of printf](https://www.cplusplus.com/reference/cstdio/printf/).

### command line arguments

[//]: # (THIS HAS A DEPENDENCY TO STRINGS AND ARRAYS SO MOVE FURTHER DOWN)

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

## Control Flows

These work just as in many other languages so will not go into further detail.

### If/Else

```c
if (test expression1) {
   // statement(s)
}
else if (test expression2) {
   // statement(s)
}
else {
   // statement(s)
}
```

### For

```c
for (initializationStatement; testExpression; updateStatement) {
    // statements inside the body of loop
}
```

### While

```c
while (testExpression) {
  // the body of the loop 
}
```

### Do While

```c
do {
  // the body of the loop
}
while (testExpression);
```

### Break and Continue

The `break` statement ends a loop immediately when it is encountered. The `continue` statement skips the current iteration of a loop and continues with the next iteration.

### Goto

Just dont use this.... if you need it you are doing something wrong unless you have a very very special use-case.

```c
#include <stdio.h>
int main(void) 
{
    int num, i = 1;
    printf("Enter the number whose table you want to print?");
    scanf("%d", &num);
table:
    printf("%d x %d = %d\n", num, i, num * i);
    i++;
    if (i <= 10)
        goto table;
}
```

### Switch

Important to note here is that the values of expression and each constant-expression must have an integral type and a constant-expression must have an unambiguous constant integral value at compile time. Also the break here makes sure that it doesn't fall through to the other statements.

```c
switch (expression) {
    case constant-expression-1:
      // statements
      break;

    case constant-expression-t2:
      // statements
      break;
    default:
      // default statements
}
```

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

## Arrays

[//]: # (CLEANUP REQUIRED)

fixed size can only store values of one data type. declaration long numbers[10]; 10 being the size, so can store 10 values. to access particular element you need to use an index starting at 0. array out of bounds in C might crash your program or can cause unexpected behaviour like xxxxx memory attack. the compiler cannot check out of bounds errors. Can be initialized with values with long numbers[5] = {1,2,3,4,5}; Can also partialy initialize array rest will just take their default init value so for int, 0.

designated initializers test it!! int arr[6]={[5]=10}; so the last value will be 10 all others 0.

can also create multidimensional arrays so basically an array of arrays. same as in other language 2D can be imagined like a table, row can column can also use designated initializers. Can also go further on like 3D etc. But can quickly get confussing.

C99 introduced variable lenght arrays meaning the length can be assigned usign a variable not a constant. This does not mean the length of an array can change! Linus torvalds is not a fan of this which is why the linux kernel is VLA free. C11 it is however optional for compilers to implement

## Functions

[//]: # (CLEANUP REQUIRED)

function header defines name, paramaters(number and data types of vlaues) type the functionr eturns. functiion body contaisn the statements that are executed when the funciton is called. void no return, void not passing any data. function prototypes is just the header so defining, providing all the external specifications the function. functions need to be defined before the are used so often u write all the fucntion protorpyes at the start of the file.

parameters are local to the function on the stack. pass by value meaning a copy is made that is local to the function meaning if we change the value it has no effect to the argument we will later on learn how to pass by reference. return value doesn't have to be handled.

local and global variables.

local variables are always local to the block they are defined in.

global variables can be accesed from anywhere and are decalred outside of any function, are alive from start to end of program. local variables mask global variables. should avoid them tho as they are a dependency which means that there is coupling between functions.

## Pointers

[//]: # (CLEANUP REQUIRED)

Every variable is a memory location and every memory location has its address defined which can be accessed using ampersand (&) operator which denotes an address in memory. A pointer is a variable whose value is the address of another variable. Thsi address is internally represented as an unsigned int on most systems however you shouldn't think of it as such. every pointer has the type of the variable it is pointing to so the compiler knows how much memory is occupied by that variable. the asteriks denotes a pointer. you can initiate it by pointing to no location in memory with NULL, so called null pointer. to access the value a pointer is pointign to is so called dereferencing which is using the asterik again. *pointer + 5. to output a pointers value in hex use %p, pointers always use 8 bytes. pointers also have addresses so can output that aswell &pnumber warning by compiler because expected a pointer but it is a pointer to a pointer of itn so cast to void\*.

pointer arithmetic: + or - to increment or decrement a pointer by one which is usefull when working with arrays to go to the next or previous element.

pointer - pointer is space between the pointers so could find out if they point to same value?

never dereference uninitialized pointer as value could go anywhere could maybe overwrite data or cause the program to crash. NULL is same as zero which is same as false so can do if(!pointer) to do soemthign if the pointer is not NULL.

const long *pvalue = &value defines a pointer to a constant. so the value cant be changed so*pvalue=99; is not possible. but we can still change it via value=99 can also still change to waht the pointer is pointing to so long number and then pvalue=&number is still possible.

not allowing the address to change then you write int *const pConst, cant change the address, but can change the values???? can then also combine the 2.

void pointers: void* can store an address of any type. can not be dereferenced as it doesn't know the size of waht it is pointign to so must first be cast to anotehr pointer type.

pointers and array, can point an int*pointer to the first elemenet because an array always points to the first address. does the same as &values[0]
arr[i] is the same as*(arr+i) if arr is a pointer you can also arr++ to go to next element.

interesting example is arraySum from video

swap example from book with pass by value and pass by reference.

pointers also allow then to have multiple returns, so called output parameters.

dynamic memory allocation. when creating variables or pointers compilers assigns memory on the stack which normally does not stay aroudn for very long when no longer needed is cleared, leaves block. dynamic memory allocation reserves space on heap which is around for the entire program but then needs to be freed by you the developer.

malloc from stdlib.h, specify number of bytes to reserve on heap and returns addres of first byte as a void pointer so to use needs to be cast. if it fails will return NULL.
programmer is responsible so need to release the memory, otherwise memory leak which is when you allocate memory but can no longer access it without releasing it.
free(pointer); pointer=NULL. calloc() number of data items and then the size of each item so for example for arrays, advantage is it initializes all the bits to zero. realloc realocates memory to resize some already allocated memory. it preserves the contents which is very important.

## Character arrays, Strings

[//]: # (CLEANUP REQUIRED)

string constant/literal is anythign between double quotes. strings in memory are arrays of char. \0 is the null character which is added by compiler at the end of each string so we know where it ends. so a length of a string is always one more. do not confuse with NULL which is a symbol that represnets a memory adress that doesnt reference anything. no datatype stirng in C can however get extensive functions for string from standard library. char myString[20] can store a string wtih up to 19 charachters. can initialize like char word[] = {'H', 'e', ...} if there is no array size given compiler compute the size and adds one for the null terminator. You can also do char word[7] = {"Hello!"} if the array is to small size=6 compiler doesnt put one there and doesn't throw error so good practice is or aynthign or let compiler figure it out. can also partially initialize char str[40] = "To be". myString= "Hello" doesnt work you could iterate over it. display entire stirng with %s no indexes or anything.

compare strings tricky because char arrays so cant jsut do == you can use functions for standard library.

string functions from standard library in string.h strlen returns size_t which is an unsigned long, strcpy, strncpy because you cant assign does not check if it fits will just copy as much as it can or throw error???? strncpy has third number which is maximum number of characters to copy check how exactly, concatenation strcat, strncat coyp of frist string is appeneded to the first second string is not altered returns where was inserted ncat only copies certain amount of characters, compararing strcmp adn strncmp if they are the same then returns 0, else -1 if "smaller on ascii" or 1 if larger, compares strings until they differ so can check for substrings at the beginning.

search strings: strchr and strstr finding string or char in string. returns pointer to where to first occurance that was found so char* if not found return NULL which is eqvl to no address.

toikeninzing string: strtok(), can use multiple delimeters, returns first token etc, seems a bit dumb????

analyzing like isLower, isUpper, isAlpha etc. can be done on characters or strings

converting char like toUpper, toLower so need to do for each for string.
 stdlib.h has functions to convert to numbers like atoi etc.

## Macros

TODO:

## Structures

In C structures defined using the `struct` keyword are a very important concept as they allow for grouping of elements very similarly to classes in other languages they just don't include functions.for example a date, month, day, year. can then create variables as type struct date. memory is allocated 3 variables inside. can access member variables with . so today.year for example. can also assign initil.compound literal can assign values after initilation like (struct date) {1,2,3} or specify the specific values with .month=9for only one time thing. can initialize structs like arrays with {7,2,2015}. or just the frist 2 or can do {.month=12}

### Unnamed structs

Unnamed structures can be used if you know that you only need one instance of it at all times which can be useful for constants.

```c
    struct /* No name */ {
        float x;
        float y;
    } point;
    
    point.x = 42;
```

### Array of structs

Can then do all the normal things you would expect to be able to do with an array.

```c
struct Student
{
    int rollNumber;
    char studentName[10];
    float percentage;
};
struct Student studentRecord[5];
```

### Nested structs

A nested structure in C is a structure within structure. One structure can be declared inside another structure in the same way structure members are declared inside a structure.

```c
struct Date
{
    int day;
    int month;
    int year;
};
struct Time
{
    int hours;
    int minutes;
    int seconds;
};
struct DateTime
{
    struct Date date;
    struct Time time;
}
```

### Pointers to structs

You can have pointers to struct variables. The important thing to know here is that there is a shorthand for accessing the data by usign the `->` operator.

```c
#include<stdio.h>

struct dog
{
    char name[10];
    char breed[10];
    int age;
    char color[10];
};

int main()
{
    struct dog my_dog = {"tyke", "Bulldog", 5, "white"};
    struct dog *ptr_dog;
    ptr_dog = &my_dog;

    printf("Dog's name: %s\n", (*ptr_dog).name); // instead of having to do this
    printf("Dog's breed: %s\n", ptr_dog->breed); // you can do this
    printf("Dog's age: %d\n", ptr_dog->age);
    printf("Dog's color: %s\n", ptr_dog->color);

    // changing the name of dog from tyke to jack
    strcpy(ptr_dog->name, "jack");

    // increasing age of dog by 1 year
    ptr_dog->age++;

    printf("Dog's new name is: %s\n", ptr_dog->name);
    printf("Dog's age is: %d\n", ptr_dog->age);

    return 0;
}
```

## typdef

The `typedef` keyword is used in C to assign alternative names to existing datatypes. This can be especially powerfull when combined with structs.can be used to give a type a new name. so typedef unsigned char BYTE; BYTE can then be used as an allias. this can become very powerful with structs.

```c
#include <stdio.h>

typedef struct Point
{
    double x;
    double y;
} Point; // can have the same name

struct date
{
    unsigned short day;
    unsigned short month;
    unsigned int year;
};
typedef struct date Date;

typedef unsigned char byte;

int main(void)
{
    Point origin = {0, 0};
    struct date today = {1, 4, 2022};
    Date tomorrow = {2, 4, 2022};
    byte intSize = sizeof(int);

    printf("The origin is: (%f/%f)\n", origin.x, origin.y);
    printf("Today is %d/%d/%d\n", today.day, today.month, today.year);
    printf("Tommorrow is %d/%d/%d\n", tomorrow.day, tomorrow.month, tomorrow.year);
    printf("On my computer an int takes up %d bytes.\n", intSize);

    return 0;
}
```

```bash title="output"
The origin is: (0.000000/0.000000)
Today is 1/4/2022
Tommorrow is 2/4/2022
On my computer an int takes up 4 bytes.
```

## File I/O

c views a file as a continoues sequence of bytes and can read byte forbyte. text files or binary files. text files are sequence of characters as lines each endign with newline. c automaticall opens 3 files, standard input, keyboarad, stnadard ouptut and error both by defualt display file that is read with getchar or scanf
standard ouput is used with printf or puts()

file pointer pointing to a struct fo type FILE that represents a stream. fopen() opens file and return the file pointer takes name and mode if can't open return NULL.
file modes w,a,r,w+,a+,r+ etc. always check if pFile is null

renaming file with rename function prob also does the same for move becuase it can take absolute path???

files need to be close wehn done EOF = endoffile character returns 0 if sussecfull otherwise EOF is equivalant to -1.

deleting file with remove()

reading from file: fgetc get char as int from open file, rewind resets reader head at start, fgets reads an entire line as string it keeps newline at end. fscanf ???

writing to file:
