---
title: POSIX Interprocess Communication
description: POSIX Interprocess Communication
tags: [c, ipc, processes, pipes, posix]
---

## POSIX Message Queues

To send messages from one process to another. Each read operation reads an entire message. POSIX messages can have a payload but also a priority which could have an influence on the order of the queue.

mq_open function, mq_getattr, mq_setattr, mq_attr, mq_send, mq_receive, mq_close, mq_unlink?

## POSIX Semaphores

You can find a detailed explanation of what a semaphore is [here](../../Concurrent%20Programming/synchronizers.md).

### Named Semaphores

Named semaphores have a name and can be used by multiples process just like named pipes (FIFOs). The process that opens the semaphore but doesn't create it just needs to pass the first 2 arguments. Just like with mutexes there are in addition the functions `sem_trywait(sem_t *sem)` and `sem_timedwait(sem_t *sem, const struct timespec *abs_timeout);`.

```c
#include <fcntl.h>
#include <sys/stat.h>
#include <semaphore.h>
#include <stdio.h>

int main(void)
{
    char *name = "/my_semaphore";                                // must start with "/""
    sem_t *sema = sem_open(name, O_CREAT, S_IRUSR | S_IRGRP, 2); // or/and O_EXCL
    sem_wait(sema);
    // sem_wait(sema); // blocks
    int current = 0;
    sem_getvalue(sema, &current);
    printf("Decrease semaphore by 1, now: %d\n", current);
    sem_post(sema);
    sem_getvalue(sema, &current);
    printf("Add semaphore by 1, now: %d\n", current);
    sem_close(sema);
    sem_unlink(name);
    return 0;
}
```

### Unnamed Semaphores

Unnamed semaphores work the same way as named ones but they are in memory and can be accessed by processes and threads via shared memory. Instead of opening one you need to initialize it with the `int sem_init(sem_t *sem, int pshared, unsigned int value);` function and when you are finished with it remove it with `int sem_destroy(sem_t *sem);`. The pshared argument indicates whether this semaphore is to be shared between the threads of a process, or between processes. If pshared has the value 0, then the semaphore is shared between the threads of a process, and should be located at some address that is visible to all threads. If pshared is nonzero, then the semaphore is shared between processes, and should be located in POSIX shared memory.

## POSIX Shared Memory

POSIX Shared Memory Objekt erlaubt Prozessen
Speicher zu teilen, ohne ein Disk File.

shm_open has size 0, ftruncate, mmap
