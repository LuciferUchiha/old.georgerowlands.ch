---
title: Processes and signals
description: bablalblasblsafg
tags: [c, processes, signals, system calls, environment variables]
---

## Processes

A program is a file containing instructions on how to create a process. Processes are instances of a running program. A program can have multiple processes and a process can be executing the same program.

The kernel sees a process as a piece of user-space memory with program code, constants and initial values for variables. The kernel also keeps track of processes by storing its Process ID (PID), its virtual memory space, open file descriptors and signal handlers amongst other things.

The PID is a positive integer and is used to identify a process in the system. The "init" process which is responsible for starting the unix operating system has the PID=1. Every process has a parent process apart from init so processes form a tree structure with init as its root. You can check this out with the `pstree` command. If a process dies it get's adopted by init so has the PID=1.

`pid_t getpid(void)` of current process.
`pid_t getppid(void)` of parent process.

![pstree](/img/programming/pstree.png)

### Memory layout

The memory of each process is split into segments: program code, initialized data, none initialized data(bss), stack and the heap.

![memoryLayout](/img/programming/memoryLayout.png)

Unix and many other operating systems use virtual memory for performance reasons. When using virtual memory only a so called Page is loaded into the RAM the rest is offloaded. Along with the above mentioned data structure the kernel also keep a so called page table for each process which maps the virtual memory address space to the Page frame in the physical memory, RAM. Address spaces not in use are not mapped so if a process tries to access them you receive a so called segmentation fault (SIGSEGV).

![pageTable](/img/programming/pageTable.png)

### Stack and stack frames

Stack frames are parts of the stack which are allocated when a function is called for its arguments, local variables and CPU register copies of the external variables. If have worked with recursion you have maybe come across a "Stackoverflow" which can happen when the stack is full and no longer has any space.

## Environment variables

## Signals
