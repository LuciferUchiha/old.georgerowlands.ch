---
title: File I/O
description: Reading and writing to files in C.
tags: [c, file i/o]
---

To interact with files in C you need to have a FILE pointer, which will let the program keep track of the memory address of the file being accessed. In C text files are sequence of characters as lines each ending with a newline (\n). Interstingly you have already been working with file I/O since the beggining as C automatically opens 3 files, the standard input (keyboard), standard output and error (both being the display). You have read from and written to these files using `scanf()` and `printf()`.

## Opening and closing files

The FILE pointer points to the FILE struct which represents a stream. To be able to open a file and get a FILE pointer you need to use the `fopen()` function which takes the name of the file and the mode to open it with, depending on the mode certain operations are limited. The function returns a FILE pointer or if something went wrong NULL. Once you have finished working with the file or you have reached the end of the file marked with EOF (end of file, equivalent to -1) you should close it with the `fclose()` function.

### Modes

- r  - Open for reading. If the file does not exist returns NULL.
- w  - Open for writing. If the file exists, its contents are overwritten. If the file does not exist, it will be created.
- a  - Open for append. Data is added to the end of the file. If the file does not exist, it will be created.
- r+ - Open for both reading and writing. If the file does not exist, returns NULL.
- w+ - Open for both reading and writing. If the file exists, its contents are overwritten. If the file does not exist, it will be created.
- a+ - Open for both reading and appending. If the file does not exist, it will be created.

## Reading

To read from a text file you have 3 options:

- `fscanf()`, the file alternative of scanf.
- `fgetc()`, reads a single char (returns its int value) and increments the header by one.
- `fgets()`, reads an entire line as a string and keeps the newline at the end.

```c
#include <stdio.h>

int main(void){
    char *fileName = "./text.txt";
    FILE *file = fopen(fileName, "r");
    if(file == NULL){
        printf("Failed to open %s file!\n", fileName);
        return -1;
    }

    char c = '\0';
    while(c != EOF){
        c = fgetc(file);
        printf("%c", c);
    }
    printf("\n");
    rewind(file); // reset position to start

    char str [100];
    while(fgets(str, 100, file)){   
        printf("%s\n", str);
    }

    rewind(file); // reset position to start

    int bananaCount = 0;
    fscanf(file, "%s %s %d %s", str, str, &bananaCount, str);
    printf("bananaCount=%d\n", bananaCount);
    
    fclose(file);
    return 0;
}
```

```text title="text.txt"
I have 3 bananas
```

## Writing

Very similar to reading you have the following functions for writing `fprintf()`, `fputc(`), `fputs()`. Important to note here is that the null terminator, '\0' will not be written.

## File positions

file positioning: ftell returns position(offset in bytes) as long value, fgetpos get positon, fseek move to a certain position in file. SEEK_:SET, CUR, END, fsetpos go to certain pos.

## Deleting, renaming, copying and moving

renaming file with rename function prob also does the same for move becuase it can take absolute path???

deleting file with remove()
