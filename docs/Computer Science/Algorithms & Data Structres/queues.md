---
title: Queues
tags: [java, collections, data structures, queues]
---

A queue is as the name says like a queue of people. Meaning it follows the FIFO policy (first in first out). The most common operations on queues are:

- `enqueue(E e)`: Adds an element to the rear of the queue.
- `E dequeue()`: Takes the element from the front of the queue.
- `E peek()`: Returns the element at the front of the queue, which corresponds to the element to next be dequeued.

![queue](/img/programming/queue.png)

## Implementing a Queue

```java title="MyQueue.java"
// TODO
```

### Queue Using two Stacks

Although the most common way of implementing a queue is with a [linked list](./linkedLists) it is also possible to implement a queue by using two stacks. Just like when [implementing a stack with two queues](./stacks#stack-using-two-queues) you need to decide if adding or removing an element will be expensive.
