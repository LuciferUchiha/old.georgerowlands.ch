---
title: General
description: TO BE DONEEEEE
tags: [distributed systems]
---

## Definitions

A distributed system is a set of interacting active components which are located in different locations and realize a common application. Each active component has its it's own independent set of instructions which means they can also run in parallel/concurrently. The location of an active component can be physically different to its other nodes in the system but it can also just be logically for example a different process.

## Advantages and disadvantages

Distributed systems can be used by multiple users at the same time that can interact with each other.

Due to the concurrent nature of distributed systems it can also come with improvements in performance, scalability and use of idle resources.

Depending on your design of the system you can also achieve higher reliability, stability and fault tolerance. For example if you have two of the same component running on different machines in different locations and one goes down you still have the other one running as a backup. Between the two components you can also split up the load instead of having one component constantly overloaded.

Distributed systems do however come with a multitude of disadvantages.

- If the components are located in different locations or on different machines you are depending on several physical components however you also do not have a single point of failure.
- Designing the system can be much more complex as you might need more complex algorithms to manage consistency problems between the components and also have to take extra security precautions.
- You also need to make sure that deployment can be orchestrated cleanly and that versioning is done correctly.

## Client and server model

## Communication

## Challenges
