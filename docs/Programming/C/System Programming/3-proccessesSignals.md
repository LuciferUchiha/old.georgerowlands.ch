Linux structure, kernel etc. Job of kernel? scheduling, file system, networking all works over an API called system calls
CPU runs in kernel or user mode. difference? system call switches to kernel
Ein System Call ist ein kontrollierter Eintrittspunkt
in den Kernel, der seine Dienste via API bereitstellt.
Bei System Calls geht die CPU in den Kernel-Mode.
Argumente werden kopiert v. User- zu Kernel-Space.
Jeder System Call hat einen Namen und eine Nr./ID
libc vs glibc?

pid_t? from sys/types.h?

system calls just return -1 if somethign went wrong can find error code in globale variable errno of errno.h
succesfful calls dont set errno back to NULL, output errors with perror or get string with strerror from string.h

# File IO with systemcalls

Alle System Calls für I/O beziehen sich auf einen File
Deskriptor, ein (kleiner) positiver Integer Wert. what is deskriptor???? each process has its own set of descriptors, at least stdin 0, stdout 1, stderr 2

Find posix constant in unistd.h STDIN_FILENO etc.
open, read, write and then close flags modes and errors???

file offset/positioning?
