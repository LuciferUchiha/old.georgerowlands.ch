---
title: Introduction
description: A Brief introduction to how operating systems are structures and what key role system calls play in them.
tags: [c, unix, operating systems, posix, system calls, kernel, kernel user mode]
---

An operating system is a program that acts as an interface between the user and the computer hardware and controls the execution of all kinds of programs. Operating systems have kernels which are responsible for scheduling, starting and ending programs but also provide other functionalities like networking or file systems.

![unixStructure](/img/programming/unixStructure.png)

CPUs run in two modes, [kernel and user modes](https://docs.microsoft.com/en-us/windows-hardware/drivers/gettingstarted/user-mode-and-kernel-mode) also well explained [here](https://blog.codinghorror.com/understanding-user-and-kernel-mode/). Only certain actions can be done in the kernel mode which is why there needs to be a way to interact between these two layers. This is what [system calls](https://www.ionos.com/digitalguide/server/know-how/what-are-system-calls/) are for. They allow a program to do things it can't do in the user mode like send information to the hardware etc.

![systemCalls](/img/programming/systemCalls.png)

## POSIX

POSIX stands for Portable Operating System Interface and is an API specification for system calls to maintain compatibility among operating systems. Therefore, any software that conforms to POSIX should be compatible with other operating systems that adhere to the POSIX standards. This is the reason, as to why most of the tools we use on Unix-like operating systems behave almost the same as it is pretty much POSIX compliant.