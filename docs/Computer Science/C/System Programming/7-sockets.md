---
title: Sockets
description: Sockets
tags: [c, sockets]
---

## Sockets Interface

IPC mechanism between 2 programs either on same host or over the network. Berkeley sockets???

client/server scenario.

communication domain defines how socket adress looks and if local or over network. AF_UNIX same as AF_LOCAL domain for on same host and domains AF_INET for IPv4 and AF_INET6 for IPv6 for over internet protocol.

Stream Sockets (SOCK_STREAM) reliable, biderectional byte streams. Relieable meaning that bytes are received as they are sent or an error is sent.
Datagram Sockets (SOCK_DGRAM) are messaged based streams that are not reliable and connectionles, meanining messages can be sent multiple times/lost and the order is not guaranteeed.

### System Calls

socket() creates new socket, with domain and type. returns id.
bind() binds an address to a socket for servers. Unix domain sockets use a path Internet socketrs use a IP and Port
listen() server listens for new connections. before accept and connect. backlog is queue length for pending connections.
accept() server accepts a connection. takes the remote()client address.
connect() creates a connection with another socket.
close() to close conneciton

struct sockaddr is a generic struct for adresse in bind() it can automatically parse by using teh family..

work similiarly to pipes. using read and write and same errors etc.

Datagram sockets dont need listen and accept. use recfrom and sendto instead. read blocks till write recevied.

## Unix Domain Sockets

for communication between to process on same host. Use file paths as adresses. Access is handled via file permissions. Here there are also stream and datagram sockets.

datagram sockets here however are reliable. if sent package is bigger then the buffer that can be sent it is cut off and sent in pieces.
bind creates a socket entry in the file system including permissions for owner and group. for connect and sento u need write and execute access.

sockaddr_un struct for unix domain adresses.

binding to same path causes ADDRINUSE errno. can't use open, close with remove().

can crate a socketpair which is often followed up by a pipe, works same as pipe/fifo
??? better security????

## Internet Sockets

stream sockets are based on TCP protocol. datagram sockets are based on UDP protocol.

### Network Byte Order

no clue what the fuck this is.

IPv4 adress structs

IPv6 adress structs

### Loopback and Wildcard Addresses

### Converting Addresses
