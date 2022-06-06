---
title: Sockets
description: Sockets
tags: [c, sockets]
---

For a more in-depth explanation of how sockets work check out the [distributed systems section](../../Distributed%20Systems/2-networking.md).

## Sockets Interface

Sockets are like pipes an IPC mechanism between 2 processes that can either be on the same host or network.

The communication domain of the socket defines how the socket address looks and whether the communication is local or over the network. There are the following types of sockets domains:

- `AF_UNIX` and `AF_LOCAL` for IPC on the same host.
- `AF_INET` for IPv4 and `AF_INET6` for IPv6.

There are two types of sockets:

- Stream Sockets, `SOCK_STREAM` which are reliable and bidirectional byte streams. Reliable meaning that bytes are received in the same order as they are sent and are guaranteed to arrive or an error is sent.
- Datagram Sockets, `SOCK_DGRAM` are messaged based. They are not reliable and are connectionless. Meaning a connection between the client and server is not established and that the messages can be sent multiple times or lost and that the order of arrival is non-deterministic.

### System Calls

Just like all other IPC mechanisms, sockets use system calls to communicate:

- `int socket(int domain, int type, int protocol);` creates an endpoint for communication and returns a file descriptor to that endpoint. By default, protocol can be 0.
- `int bind(int sockfd, const struct sockaddr *addr, socklen_t addrlen);` "Assigns a name to a socket". Name being the addr and addrlen the size, in bytes, of the address structure
- `int listen(int sockfd, int backlog);` marks the socket to be used to accept incoming connection requests.
- `int accept(int sockfd, struct sockaddr *restrict addr, socklen_t *restrict addrlen);` extracts the first connection request from queue of pending connections for the listening socket. Creates and returns a new connected socket to be further used. The original socket is unaffected by this call.
- `int connect(int sockfd, const struct sockaddr *addr, socklen_t addrlen);` connects the socket to the address specified by addr.
- `int close(int fd);` to close the socket and connection.

To then read and write you can then use the same system calls as with pipes.

![cSocketDiagram](/img/programming/cSocketDiagram.png)

When working with Datagram sockets you dont use the listen, accept and connect system calls because the sockets are connectionless. You also don't use the read and write system calls. Instead, you use the following:

- `ssize_t recvfrom(int socket, void *restrict buffer, size_t length, int flags, struct sockaddr *restrict address, socklen_t *restrict address_len);`
- `ssize_t sendto(int socket, const void *message, size_t length, int flags, const struct sockaddr *dest_addr, socklen_t dest_len);`

![cDatagramSocketDiagram](/img/programming/cDatagramSocketDiagram.png)

### Addresses

When referring to addresses all functions take the `struct sockaddr` which is a generic structure for addresses and can parse the addresses with help of the family attribute (`AF_INET` or `AF_UNIX`).

```c
struct sockaddr {
   unsigned short   sa_family;
   char             sa_data[14];
};
```

## Unix Domain Sockets

Unix domain sockets enable efficient communication between processes on the same host. Unix domain sockets support both stream-oriented sockets with the TCP protocol and datagram sockets with the UDP protocol (reliable compared to over the internet).

The address for Unix domain sockets is a file and can be specified with the structure below. When you bind a Unix domain socket a file is created at the specified path for the socket including permissions for the owner and group (to be able to connect and write you need write and execute access). When the socket is no longer required, you must manually delete the socket file.

struct sockaddr_un {
       unsigned short int sun_family; /*AF_UNIX*/
       char sun_path[UNIX_PATH_MAX]; /*pathname*/
};

When repeatedly binding to the same path the errno `ADDRINUSE` is set.

Example using UDP:

```c title="unix_server"
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <sys/un.h>

#define SOCK_PATH "unix_sock_server"

int main(void)
{

    int server_sock, err;
    struct sockaddr_un server_sockaddr, client_sockaddr;
    memset(&server_sockaddr, 0, sizeof(struct sockaddr_un));
    char buf[256];
    memset(buf, 0, 256);

    server_sock = socket(AF_UNIX, SOCK_DGRAM, 0);
    if (server_sock == -1)
    {
        printf("Failed to create server socket");
        exit(1);
    }

    server_sockaddr.sun_family = AF_UNIX;
    strcpy(server_sockaddr.sun_path, SOCK_PATH);
    err = bind(server_sock, (struct sockaddr *)&server_sockaddr, sizeof(server_sockaddr));
    if (err == -1)
    {
        printf("Failed to bind server socket");
        close(server_sock);
        exit(1);
    }

    printf("waiting to recvfrom...\n");
    int client_len;
    int bytes_read = recvfrom(server_sock, buf, 256, 0, (struct sockaddr *)&client_sockaddr, &client_len);
    if (bytes_read == -1)
    {
        printf("Failed to read from client to server");
        close(server_sock);
        exit(1);
    }
    printf("DATA RECEIVED = %s\n", buf);

    close(server_sock);
    return 0;
}
```

```c title="unix_client"
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <sys/un.h>

#define SERVER_PATH "unix_sock_server"

int main(void)
{
    int client_sock, err;
    struct sockaddr_un server_sockaddr;
    memset(&server_sockaddr, 0, sizeof(struct sockaddr_un));
    char buf[256];

    client_sock = socket(AF_UNIX, SOCK_DGRAM, 0);
    if (client_sock == -1)
    {
        printf("Failed to create client socket");
        exit(1);
    }

    server_sockaddr.sun_family = AF_UNIX;
    strcpy(server_sockaddr.sun_path, SERVER_PATH);

    strcpy(buf, "Hello from client");
    printf("Sending data...\n");
    err = sendto(client_sock, buf, strlen(buf), 0, (struct sockaddr *)&server_sockaddr, sizeof(server_sockaddr));
    if (err == -1)
    {
        printf("Failed to write from client to server");
        close(client_sock);
        exit(1);
    }
    printf("Data sent!\n");
    close(client_sock);

    return 0;
}
```

Example using TCP:

```c title="unix_server"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <sys/un.h>

#define SOCK_PATH "unix_sock_server"

int main(void)
{
    int server_sock, client_sock, err;
    struct sockaddr_un server_sockaddr;
    struct sockaddr_un client_sockaddr;
    memset(&server_sockaddr, 0, sizeof(struct sockaddr_un));
    memset(&client_sockaddr, 0, sizeof(struct sockaddr_un));
    char buf[256];

    // create socket
    server_sock = socket(AF_UNIX, SOCK_STREAM, 0);
    if (server_sock == -1)
    {
        printf("Failed to create server socket");
        exit(1);
    }

    // create address
    server_sockaddr.sun_family = AF_UNIX;
    strcpy(server_sockaddr.sun_path, SOCK_PATH);
    err = bind(server_sock, (struct sockaddr *)&server_sockaddr, sizeof(server_sockaddr));
    if (err == -1)
    {
        printf("Failed to bind server socket");
        close(server_sock);
        exit(1);
    }

    err = listen(server_sock, 1);
    if (err == -1)
    {
        printf("Failed to listen on server socket");
        close(server_sock);
        exit(1);
    }
    printf("socket listening...\n");

    // accept incoming connection, store client address
    int client_len;
    client_sock = accept(server_sock, (struct sockaddr *)&client_sockaddr, &client_len);
    if (client_sock == -1)
    {
        printf("Failed to accept client on server socket");
        close(server_sock);
        close(client_sock);
        exit(1);
    }

    printf("waiting to read...\n");
    int bytes_read = read(client_sock, buf, sizeof(buf));
    if (bytes_read == -1)
    {
        printf("Failed to read from client to server");
        close(server_sock);
        close(client_sock);
        exit(1);
    }
    printf("DATA RECEIVED = %s\n", buf);

    memset(buf, 0, 256); // empty buffer
    strcpy(buf, "Hello From Server");
    printf("Sending data...\n");
    err = write(client_sock, buf, strlen(buf));
    if (err == -1)
    {
        printf("Failed to write from server to client");
        close(server_sock);
        close(client_sock);
        exit(1);
    }
    printf("Data sent!\n");

    close(server_sock);
    close(client_sock);
    return 0;
}
```

```c title="unix_client"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <sys/un.h>

#define SERVER_PATH "unix_sock_server"
#define CLIENT_PATH "unix_sock_client"

int main(void)
{

    int client_sock, err;
    struct sockaddr_un server_sockaddr;
    struct sockaddr_un client_sockaddr;
    memset(&server_sockaddr, 0, sizeof(struct sockaddr_un));
    memset(&client_sockaddr, 0, sizeof(struct sockaddr_un));

    char buf[256];

    client_sock = socket(AF_UNIX, SOCK_STREAM, 0);
    if (client_sock == -1)
    {
        printf("Failed to create client socket");
        exit(1);
    }

    // setup client address
    client_sockaddr.sun_family = AF_UNIX;
    strcpy(client_sockaddr.sun_path, CLIENT_PATH);
    // bind
    err = bind(client_sock, (struct sockaddr *)&client_sockaddr, sizeof(client_sockaddr));
    if (err == -1)
    {
        printf("Failed to bind client socket");
        close(client_sock);
        exit(1);
    }

    // setup server address
    server_sockaddr.sun_family = AF_UNIX;
    strcpy(server_sockaddr.sun_path, SERVER_PATH);
    // connect to server
    err = connect(client_sock, (struct sockaddr *)&server_sockaddr, sizeof(server_sockaddr));
    if (err == -1)
    {
        printf("Failed to connect client to server");
        close(client_sock);
        exit(1);
    }

    strcpy(buf, "Hello from client");
    err = write(client_sock, buf, strlen(buf));
    if (err == -1)
    {
        printf("Failed to write from client to server");
        close(client_sock);
        exit(1);
    }
    printf("Data sent!\n");

    // read data from server
    printf("Waiting to recieve data...\n");
    memset(buf, 0, sizeof(buf)); // empty buffer
    err = read(client_sock, buf, sizeof(buf));
    if (err == -1)
    {
        printf("Failed to read from server to client");
        close(client_sock);
        exit(1);
    }
    printf("DATA RECEIVED = %s\n", buf);

    close(client_sock);
    return 0;
}
```

### Socketpairs

You can create socketpairs which can then be used very similarly to pipes with the `int socketpair(int domain, int type, int protocol, int sv[2]);` function.

```c
void child(int socket) {
    const char hello[] = "hello parent, I am child";
    write(socket, hello, sizeof(hello)); /* NB. this includes nul */
    /* go forth and do childish things with this end of the pipe */
}

void parent(int socket) {
    /* do parental things with this end, like reading the child's message */
    char buf[1024];
    int n = read(socket, buf, sizeof(buf));
    printf("parent received '%.*s'\n", n, buf);
}

void socketfork() {
    int fd[2];
    static const int parentsocket = 0;
    static const int childsocket = 1;
    pid_t pid;

    /* 1. call socketpair ... */
    socketpair(PF_LOCAL, SOCK_STREAM, 0, fd);

    /* 2. call fork ... */
    pid = fork();
    if (pid == 0) { /* 2.1 if fork returned zero, you are the child */
        close(fd[parentsocket]); /* Close the parent file descriptor */
        child(fd[childsocket]);
    } else { /* 2.2 ... you are the parent */
        close(fd[childsocket]); /* Close the child file descriptor */
        parent(fd[parentsocket]);
    }
    exit(0); /* do everything in the parent and child functions */
}
```

## Internet Sockets

Stream sockets are based on the TCP protocol. Datagram sockets are based on the UDP protocol.

### Network Byte Order

no clue what the fuck this is.

IPv4 adress structs

IPv6 adress structs

### Loopback and Wildcard Addresses

### Converting Addresses
