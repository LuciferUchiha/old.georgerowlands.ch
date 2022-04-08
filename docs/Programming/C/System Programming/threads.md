---
title: Introduction
description: A Brief introduction to how operating systems are structures and what key role system calls play in them.
tags: [c, unix, operating systems, posix, system calls, kernel, kernel user mode]
---

Threads are similar to process and allow a program to do multiple things at once by having multiple threads in it. A key difference between threads and process is however that threads share the same global memory and just have their private stack for local variables and function calls and are therefore not as expensive as process which have the big overhead of creating an entire new memory space. This is why threads are also often called lightweight processes.

Exchanging information between process can be quiet tricky and costly because the parent and child don't share memory. However threads share the following things between each other amongst other things

- PID and Parent PID
- Open file descriptors
- Signal handlers
- Global memory

Each thread however does receive the following things for itself

- Thread ID
- Signal Mask
- Errno variable
- Stack

To work with threads you can use the Pthreads API which are also known as POSIX threads, sounds familiar... which is provided with the gcc compiler. Important to know here is that Pthreads functions don't return -1 on failure like many other functions in the standard library. Instead they return 0 on success and add the errno on failure. To be able to use the Pthreads API you need to pass the `-pthread` flag to the gcc compiler.

## Create threads

To create a thread you will need to use the following function

```c
int pthread_create(pthread_t *restrict thread,
                        const pthread_attr_t *restrict attr,
                        void *(*start_routine)(void *),
                        void *restrict arg);
```

The first parameter is an integer that is used as an output parameter and is used to identify the thread in your operating system.
The second parameter is for specific attributes for the thread, by passing NULL you can use the default.
The third parameter is the function that the thread will execute once it is started.
The fourth parameter is used to pass arguments to the function and must be cast to a void pointer. If you want to pass multiple arguments, you would use a pointer to a struct.

```c
int pthread_join(pthread_t thread, void **retval);
```

A call to the join function blocks the calling thread until the thread with ID as the first parameter is terminated. You can also store the return value of the thread with the second parameter.

Threads can terminate in multiple ways

- By calling pthread_exit.
- By letting the thread function return.
- By calling exit which will terminate the process including all its threads.

Interestingly of the main thread calls pthread_exit all of the other threads will continue to execute otherwise they all automatically terminate when main returns.

```c
#include <stdio.h>
#include <pthread.h>

#include <stdio.h>
#include <pthread.h>

void *foo()
{
    printf("foo ID: %ld\n", pthread_self());
    pthread_exit(NULL);
}

int main(void)
{
    printf("main ID: %ld\n", pthread_self());
    pthread_t foo_t;
    pthread_create(&foo_t, NULL, foo, NULL);

    pthread_join(foo_t, NULL);
    printf("done");

    return 0;
}

```

## Passing value

When creating the pthread you can pass the arguments using the fourth parameter.

```c
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

typedef struct Point
{
    double x;
    double y;
} Point;

void *printPoint(void *args)
{
    Point p = *((Point *)args);
    printf("(%f, %f)", p.x, p.y);
    pthread_exit(NULL);
}
int main(void)
{
    pthread_t pid;
    Point p = {2, 10};

    pthread_create(&pid, NULL, printPoint, &p);
    pthread_join(pid, NULL);
    return 0;
}
```

## Returning values

You can return values from a thread with the pthread_exit function. The values you return should be on the heap otherwise you will run into problems.

```c
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

typedef struct Point
{
    double x;
    double y;
} Point;

void *createPoint()
{
    Point *p = malloc(sizeof(Point));
    p->x = 3;
    p->y = 7;
    pthread_exit((void *)p);
}
int main(void)
{
    pthread_t pid;
    Point p;
    void *res;
    pthread_create(&pid, NULL, createPoint, NULL);
    pthread_join(pid, &res);

    p = *((Point *)res);
    free(res);
    res = NULL;
    printf("(%f, %f)", p.x, p.y);
    return 0;
}
```

## Compare threads
