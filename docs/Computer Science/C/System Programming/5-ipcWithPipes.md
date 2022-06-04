---
title: IPC with Pipes
description: IPC with Pipes
tags: [c, ipc, processes, pipes]
---

## File locks

## Pipes

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
