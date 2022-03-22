# Linked List, Stack & Queue

## Array vs Linked List

When implementing collections with arrays we encounter the following issues. An array needs a given size which leads us to implementing algorithms that either always when adding an element make an array that is one size larger, copying everything over and then adding the new element. Or when the array gets full we increase its size by either a fixed amount that could also possibly go up depending on how many times we have already increased the size. Meaning the array is either always full(first algorithm) or we are using to much space.

The advantage of a linked list, which has nodes that have a value and a reference of the next node. The linked list then just needs to know the first node and can then make its way through the list. With this method the size of the collection is dynamic we can just add nodes onto the end.

![arraysVsLinkedList](/img/programming/arraysVsLinkedList.png)

## Implementation of Linked List

Just as with the all other collections there are lots of ways to implement a linked list depending on your use case.

### Add

Here there are a few options. Either you can make your way to the end of the linked list and add the new element on to the end. This however has a complexity of O(n) which is not ideal. So we could keep a reference in the list of not only the root but also the tail, the last element. Another option is to just add it to the front of the list, so it becomes the new root and its reference to the next node is the old root.

### Remove

When removing there is only really one way of doing it and that is to find the node that holds the value to be removed (curr) whilst also remembering the previous node (prev) and then setting the reference of the prev.next to curr.next.
![linkedListRemove](/img/programming/linkedListRemove.png)

### Contains

Here you just need to search the linked list until you either reach the end or have found the value.

## Variations

### Singly linked list

This is default when talking about linked lists. A node has a value and a reference to the next element.

### Doubly linked list

Here unlike the singly linked list a node has a value, a reference to the next element and also a reference to the previous element. This makes removing of node much easier.

### Circular linked list

In a circular linked list the last element does not have a reference to null as the next element but the root making the list like a circle.

## Stack

A Stack is like a pile of clothes or paper. Meaning it follows LIFO, last in first out. You can either push(put something on top) or pop(take something of the top). Often the operation peek/top is defined which returns the reference of the top element, so the next to be poped. A stack can be very easily implemented using a linked list. It can also be implemented using 2 Queues if you like to make life hard.

### Stack using 2 Queues

## Queue

A Queue is as the name says like a queue of people. Meaning it follows FIFO, first in first out. You can either enqueue(add to the back) or dequeue(take from the front). Here the peek/element method returns the front element so the one to be next dequeued. A queue can also be very easily implemented using a linked list but it is also possible to do it with 2 Stacks.

### Queue using 2 Stacks
