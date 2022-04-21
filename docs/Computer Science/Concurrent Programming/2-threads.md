## Processes vs threads

A process is an exectuable program which is loaded into memory. A process has it's own part of logical memory address space allocated by the OS. As seen in C we can also switch between process but this is a rather expensive operation. Processes can communicate with each other via Signals (IPC???), files or sockets.

A thread is a single sequential flow which runs in the address space of it's process. This also means it shares the same address space with threads of the same process. It does however have it's own execution context containing amongst other things the call stack. Threads can communicate with each other via shared memory.

![jvmProcess](/img/programming/jvmProcess.png)

## Threading models

There are a few different ways how threads can be bound.

- Kernel-Level (1:1): The kernel controls the threads and processes and threads are scheduled to available CPUs by the kernel. This approach is used by most current JVM implementations.
- User-level (1:n): Threads are implemented and managed/scheduled by a runtime library, so called green threads. This allows for efficient context switching and application-specific scheduling as the kernel is not involved. This does however mean that different threads can not be scheduled on different processors.
- Hybrid (m:n): User-level threads are assigned to a number of kernel threads.

![threadingModels](/img/programming/threadingModels.png)

## Scheduling

## Java threads
