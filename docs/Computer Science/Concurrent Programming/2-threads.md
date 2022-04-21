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

Scheduling is done by the kernel and is the act of allocating CPU time to threads. It also has to make sure that per CPU core only one thread is running at any given time. There are mainly two scheduling models. It is up to the java implementation but we can assume that in most cases it will be preemptive.

### Cooperative

With cooperative scheduling the threads decide, when they should give up the processor to other threads.

![cooperativeScheduling](/img/programming/cooperativeScheduling.png)

### Preemptive

With preemptive scheduling the jvm/kernel interrupts the threads at any time. This stops threads from unfairly hogging the processor.

![preemptiveScheduling](/img/programming/preemptiveScheduling.png)

## Java threads

main is a non daemon intial thread.
Runnable is a functional interface with one function run(). Thread is a class which takes a runnable and implements Runnable in it's run function it calls the run function of the passed runnable. start() starts a new thread to execute run methods and returns immideatly.

Extending Thread is possible and any easy and simple way, however it is better to implement runnable seperatly Because it is a better seperation of concerns, and you can still easly access the thred mehtods thanks to static imports.

Because it is a functional interface you can also use lambdas.

yield function hints the scheduler that the thread is willing to yield its use of the processor but it can just be ignored by the processor.

join(x) waits for the thread to termiante for max of x seconds. setDaemon marks the thread either as deamon or user thread. Daemon threads run in background, must be set before start is called. if a process only has demon threads left then the process stops.

threads can have priorities range of 1 to 10. jvm is free to implement these so could also be ignored.

Threads state example from locks slide.
