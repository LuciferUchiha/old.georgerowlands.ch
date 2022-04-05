---
title: Dynamically allocated memory
description: sdfkgsdkfjghöklajhlksgkjlasg
tags: [C]
---

dynamic memory allocation. when creating variables or pointers compilers assigns memory on the stack which normally does not stay aroudn for very long when no longer needed is cleared, leaves block. dynamic memory allocation reserves space on heap which is around for the entire program but then needs to be freed by you the developer.

malloc from stdlib.h, specify number of bytes to reserve on heap and returns addres of first byte as a void pointer so to use needs to be cast. if it fails will return NULL.
programmer is responsible so need to release the memory, otherwise memory leak which is when you allocate memory but can no longer access it without releasing it.
free(pointer); pointer=NULL. calloc() number of data items and then the size of each item so for example for arrays, advantage is it initializes all the bits to zero. realloc realocates memory to resize some already allocated memory. it preserves the contents which is very important.
