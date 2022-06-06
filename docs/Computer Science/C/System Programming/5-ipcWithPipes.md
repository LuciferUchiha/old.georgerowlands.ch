---
title: IPC with Pipes
description: IPC with Pipes
tags: [c, ipc, processes, pipes]
---

Interprocess comminucation - IPC is the subject of coomunicatiing, echanging data and synchronizing between to processes.

A kategorie of IPC are Datatransfers which use read and write system calls. The second category commincates via shared memory, without system calls and is therefore also faster.

Datatransfers can be byte streams, message based or use special pseduoterminals. Important with all these mechanisms is that a read operation is destructive. Meaning if data has been read then it is no longer available to the others. Synchronization is done automaticallly. If there is no data available then read operation blocks.

Pipes, FIFOs, Stream sockets are unlimited byte streams which means that the number bytes does not matter.

Message queues and datagram sockets are messaged based. Each read operation reads one message exactly how it was written. It is not possible to only read a part of a message or multiple at once.

Shared Memory and memory mappings are fast but need to be synchronized. reading is however not destructive. Often semaphores are used.

## File locks

Work same as ReadWriteLock in Java.
coordiante file access. Read locks can be shared between multiples however if a process has a write lock then no other thread can have a read or write lock.
flock and fcntl system calls???

## Pipes

A pipe "|" is a form of redirection of standard output to some other destination that can be used in shells on Unix operating systems. So for example you can redirect the stdout of a command to a file or connect it to the stdin of another command. Pipes are unidirectional i.e data flows from left to right through the pipe. The command-line programs (right side) that do the further processing are referred to as filters. You can also use pipes programmatically in C for IPC.

read blocks, if pipe is closed returns 0/EOF.

Just a buffer in or file kernel memory with max capacity of 64KB. If a pipe is full write blocks until on the other end data is read.

pipe puts 2 file descriptors into the passed array the first (index 0) being the read end of the pipe and the other file descriptor for the write end.

when finished with writing need to close it so read gets EOF and doesn't block indefinetly. If the pipe was closed on read side and the process still writes to the pipe the kernel sends a SIGPIPE signal. if the signal is ignored then write returns the error EPIPE.

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main(void)
{
    int fd[2]; // 0 = read, 1 = write end
    pipe(fd);

    int id = fork();

    if (id == -1) { printf("Error when forking"); return 1; }
    if (id == 0) // child process
    {
        close(fd[0]); // close read end
        int x;
        printf("CHILD: Input a number: ");
        scanf("%d", &x);
        if (write(fd[1], &x, sizeof(x)) == -1) { printf("Error writing to pipe"); return 3; }
        close(fd[1]); // close write end when finished
    }
    else // parent process
    {
        close(fd[1]); // close write end
        int y;
        if (read(fd[0], &y, sizeof(y)) == -1) { printf("Error reading from pipe"); return 3; }
        printf("PARENT: You put in: %d\n", y);
        close(fd[0]); // close read end when finished
    }
    return 0;
}
```

```bash title="output"
CHILD: Input a number: 4
PARENT: You put in: 4
```

### Bidirectional Pipes

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main(void)
{
    /* Send a number from parent to child, child processes the number and sends back to parent. */
    const int READ_END = 0; const int WRITE_END = 1;
    int childToParent[2];
    int parentToChild[2];
    if(pipe(childToParent) == -1) { printf("Error creating pipe"); return 1; }
    if(pipe(parentToChild) == -1) { printf("Error creating pipe"); return 1; }

    int id = fork();
    if (id == -1)
    {
        printf("Error when forking");
        return 2;
    }
    if (id == 0) // child process
    {
        close(childToParent[READ_END]);
        close(parentToChild[WRITE_END]);
        int input;
        if (read(parentToChild[READ_END], &input, sizeof(input)) == -1)
        {
            printf("Error when reading from parent to child");
            return 3;
        }
        printf("CHILD: Received: %d\n", input);
        int output = input * 2; // input gets doubled
        if (write(childToParent[WRITE_END], &output, sizeof(output)) == -1)
        {
            printf("Error when writing from child to parent");
            return 4;
        }
        printf("CHILD: Sent: %d\n", output);
    }
    else // parent process
    {
        close(parentToChild[READ_END]);
        close(childToParent[WRITE_END]);
        printf("PARENT: Input a number: ");
        int input;
        scanf("%d", &input);
        if (write(parentToChild[WRITE_END], &input, sizeof(input)) == -1)
        {
            printf("Error when writing from parent to child");
            return 5;
        }
        printf("PARENT: Sent: %d\n", input);
        int output;
        if (read(childToParent[READ_END], &output, sizeof(output)) == -1)
        {
            printf("Error when reading from child to parent");
            return 6;
        }
        printf("PARENT: Received: %d\n", output);
        close(parentToChild[WRITE_END]);
        close(childToParent[READ_END]);
    }
    return 0;
}
```

```bash title="output"
PARENT: Input a number: 5
PARENT: Sent: 5
CHILD: Received: 5
CHILD: Sent: 10
PARENT: Received: 10
```

### Simulating the "|" Pipe Operator

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void)
{
    const int READ_END = 0;
    const int WRITE_END = 1;
    int fd[2];
    if (pipe(fd) == -1)
    {
        printf("Error creating pipe");
        return 1;
    }

    int pingForkId = fork();
    if (pingForkId == -1)
    {
        printf("Error when forking");
        return 2;
    }
    if (pingForkId == 0) // child process
    {
        dup2(fd[WRITE_END], STDOUT_FILENO); // copies pipe write fd to stdout fd
        close(fd[READ_END]);
        close(fd[WRITE_END]); // can be closed as still a reference pointing to it

        execlp("ping", "ping", "-c", "5", "google.com", NULL); // current process code gets replaced by new process code. system() would create another child process.
    }
    int grepForkId = fork();
    if (grepForkId == -1)
    {
        printf("Error when forking");
        return 2;
    }
    if (grepForkId == 0) // child process
    {
        dup2(fd[READ_END], STDIN_FILENO); // copies pipe read fd to stdin fd
        close(fd[READ_END]);
        close(fd[WRITE_END]);

        execlp("grep", "grep", "rtt", NULL);
    }

    close(fd[READ_END]);
    close(fd[WRITE_END]);
    // Wait for children to terminate
    waitpid(pingForkId, NULL, 0);
    waitpid(grepForkId, NULL, 0);
    return 0;
}
```

### Synchronizing with Pipes

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main(void)
{
    int fd[2]; /* Process synchronization pipe */

    if (pipe(fd) == -1)
    {
        printf("Error creating pipe");
        return 1;
    }

    for (int i = 0; i < 10; i++)
    {
        switch (fork())
        {
        case -1:
            printf("Error when forking");
            return 2;
        case 0:           // child process
            close(fd[0]); // close read end

            // child does some work and lets parent know when finished
            for (int j = 0; j < 100000000; j++)
            {
            }
            printf("Finished work in Process %d\n", i);
            // notifies parent that done by decrementing file descriptor count
            close(fd[1]);
            exit(EXIT_SUCCESS);
        default:
            break; // parent continue with loop
        }
    }
    printf("Finished creating all children\n");
    close(fd[1]); // parent doesn't use write end
    int dummy;
    // blocks till all are finished and receives EOF
    if (read(fd[0], &dummy, 1) != 0)
    {

        printf("Parent didn't get EOF");
        return 3;
    }
    printf("All finished");
    return 0;
}
```

```bash title="output"
Finished creating all children
Finished work in Process 0
Finished work in Process 1
Finished work in Process 2
Finished work in Process 4
Finished work in Process 3
Finished work in Process 5
Finished work in Process 6
Finished work in Process 7
Finished work in Process 8
Finished work in Process 9
All finished
```

## FIFO files (Named Pipes)

pipes only work in same hierarchy.

```c title="fifo_read.c"
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <errno.h>

int main(void)
{
    char *fifoPath = "myfifo";
    if (mkfifo(fifoPath, S_IRUSR | S_IWUSR) == -1 && errno != EEXIST)
    {
        printf("Error when creating FIFO file\n");
        return 1;
    }

    int fd = open(fifoPath, O_RDONLY); // blocks till write end is opened
    int output;
    if (read(fd, &output, sizeof(output)) == -1)
    {
        printf("Error when reading from FIFO");
        return 4;
    }
    printf("PARENT: Received: %d", output);
    remove(fifoPath);
    return 0;
}
```

```c title="fifo_write.c"
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <errno.h>

int main(void)
{
    char *fifoPath = "myfifo";
    if (mkfifo(fifoPath, S_IRUSR | S_IWUSR) == -1 && errno != EEXIST)
    {
        printf("Error when creating FIFO file\n");
        return 1;
    }
    int fd = open(fifoPath, O_WRONLY); // blocks till other end is opened
    int input = 10;
    if (write(fd, &input, sizeof(input)) == -1)
    {
        printf("Error when writing to FIFO");
        return 3;
    }
    printf("CHILD: Sent: %d", input);
    remove(fifoPath);
    return 0;
}
```
