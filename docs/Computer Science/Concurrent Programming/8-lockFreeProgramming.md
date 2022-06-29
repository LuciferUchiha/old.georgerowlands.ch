---
title: Lock free programming
description: TODO
tags: [concurrent programming]
---

## Disadvantages of locks

Locks are very useful and do their job well however there are some disadvantages to them. Because of the context-switch overhead performance can suffer. However probably the worst parts are that when a thread is waiting for a lock it cannot do anything else. If a thread that holds a lock is delayed or even ends up in a deadlock then no other thread that needs the lock can progress. This can then lead to so called **priority inversion** when a high priority thread is waiting for a lock from a low priority thread and therefor gets its priority downgraded.

This example works perfectly fine but we want to remove the locks. We can remove the one for reading by making the value volatile to have the visability garantie. However volatiles do not support read-modify-write sequences but that is what we want.

```java
public final class Counter1 {
    private long value = 0;
    public synchronized long getValue() { return value; }
    public synchronized long increment() { return ++value; }
}
public final class Counter2 {
    private volatile long value = 0;
    public long getValue() { return value; }
    public synchronized long increment() { return ++value; }
}
```

## CAS - compare and set

CPUs have an instruction called Compare and set/swap, `CAS(memory_location, expected_old_value, new_value)`. This atomically compares the content of a memory location to a given value and, if they are the same, modifies the content of that memory location to a given new value and returns if the swap was done. With this we can do something like this.

```java
public final class CASCounter {
    private volatile long value = 0;

    public long getValue() {
        return value;
    }
    public long increment() {
        while(true) {
            long current = getValue();
            long next = current + 1;
            if (compareAndSwap(current, next)) return next;
        }
    }

    // Wrapper for old sun microsystems impl.
    private static final Unsafe unsafe = Unsafe.getUnsafe();
    private static final long valueOffset;
    static {
        try {
            valueOffset = unsafe.objectFieldOffset( CASCounter.class.getDeclaredField("value"));
        } catch (Exception ex) { throw new Error(ex); }
    }
    private boolean compareAndSwap(long expectedVal, long newVal) {
        return unsafe.compareAndSwapLong(this, valueOffset, expectedVal, newVal);
    }
}
```

## Atomics

Java also added Atomic Scalars which all support CAS and atomic arithmetic operations for int/long. For doubles or floats etc you can use `Double.doubleToRawLongBits()` and then convert back with `Double.longBitsToDouble()`.

![javaAtomic](/img/programming/javaAtomic.png)

```java
class AtomicInteger extends Number {
    AtomicInteger()
    AtomicInteger(int initialValue)
    boolean compareAndSet(int expect, int update)
    int incrementAndGet() int decrementAndGet()
    int getAndIncrement() int getAndDecrement()
    int addAndGet(int delta) int getAndAdd(int delta)
    int getAndSet(int newValue)
    int intValue() double doubleValue()
    long longValue() float floatValue()
    int get() void set(int newValue)
}
```

It can however get a bit tricky when there are multiple values for example in the NumberRange example

```java
public class NumberRange {
    private final AtomicInteger lower = new AtomicInteger(0);
    private final AtomicInteger upper = new AtomicInteger(0);

    public int getLower() { return lower.get(); }
    public void setLower(int newLower) {
        while (true) {
            int l = lower.get(), u = upper.get();
            if (newLower > u) throw new IllegalArgumentException();
            if (lower.compareAndSet(l, newLower)) return;
        }
    }
    // same for getUpper/setUpper
    public boolean contains(int x) {
        return lower.get() <= x && x <= upper.get();
    } 
}
```

So instead we could do something like this

```java
public class NumberRange {
    private static class Pair {
        final int lower, upper; // lower <= upper
        Pair(int l, int u) { lower = l; upper = u; }
    }

    private final AtomicReference<Pair> values = new AtomicReference<>(new Pair(0,0));

    public int getLower(){ return values.get().lower; }
    public void setLower(int newLower){
        while(true) {
            Pair oldp = values.get();
            if(newLower > oldp.upper) throw new IllegalArgumentException();
            Pair newp = new Pair(newLower, oldp.upper);
            if(values.compareAndSet(oldp, newp)) return; // uses == comparison
        }
    }
}
```

### ABA Problem

The ABA problem occurs in lock-free algorithms when a variable which was read has been changed by another thread.

```A -> B -> A```

The CAS operation will compare its A with A and think that "nothing has changed" even though the second thread did work that violates that assumption. For example

1. Thread T1 reads value A from shared memory
2. T1 is preempted, allowing thread T2 to run
3. T2 modifies the shared memory value A to value B and back to A before preemption
4. T1 begins execution again, sees that the shared memory value has not changed and continues.

For this reason there is the AtomicStampedReference.

```java
public class AtomicStampedReference<V> {
    public AtomicStampedReference(V ref, int stamp) { ... }
    public V getReference() { ... } // returns reference
    public int getStamp() { ... } // returns stamp
    public V get(int[] stampHolder) { ... } // returns both
    public void set(V newReference, int newStamp) { ... }
    public boolean compareAndSet(V expectedReference, V newReference, int expectedStamp, int newStamp) { ... }
    public boolean attemptStamp(V expectedReference, int newStamp) { ... }
}
```

## Non-blocking algorithms

### Stack

```java
public class ConcurrentStack<E> {
    private static class Node<E> {
        public final E item;
        public Node<E> next;
        public Node(E item) { this.item = item; }
    }

    final AtomicReference<Node<E>> head = new AtomicReference<>();

    public void push(E item) {
        Node<E> newHead = new Node<E>(item);
        while(true) {
            Node<E> oldHead = head.get();
            newHead.next = oldHead;
            if (head.compareAndSet(oldHead, newHead)) return;
        }
    }
    public E pop() {
        while(true) {
            Node<E> oldHead = head.get();
            if (oldHead == null) throw new EmptyStackException();
            Node<E> newHead = oldHead.next;
            if(head.compareAndSet(oldHead, newHead)) {
                return oldHead.item;
            }
        }
    }
}
```

### Queue

The tricky part with the queue is that there are two things to watch the head and the tail which has to get moved. In this implementation a dummy node is used meaning that there are 3 invariants

- tail refers to dummy (i.e. to the same node as head) OR
- tail refers to the last element OR
- tail refers to second-last element (in the middle of an update)

```java
public class ConcurrentQueue <E> {
    private static class Node<E> {
        final E item;
        final AtomicReference<Node<E>> next;
        public Node(E item, Node<E> next) {
            this.item = item;
            this.next = new AtomicReference<Node<E>>(next);
        }
    }

    private final Node<E> dummy = new Node<E>(null, null);
    private final AtomicReference<Node<E>> head = new AtomicReference<Node<E>>(dummy);
    private final AtomicReference<Node<E>> tail = new AtomicReference<Node<E>>(dummy);

    public boolean put(E item) {
        Node<E> newNode = new Node<E>(item, null);
        while (true) {
            Node<E> curTail = tail.get();
            Node<E> tailNext = curTail.next.get();
            if (tailNext != null) {
                // Queue in intermediate state, advance tail
                tail.compareAndSet(curTail, tailNext);
            } else {
                // In consistent state, try inserting new node
                if (curTail.next.compareAndSet(null, newNode)) {
                    // Insertion succeeded, try advancing tail
                    tail.compareAndSet(curTail, newNode);
                    return true;
            }
        }
    }

    public E pop() {
        while(true) {
            Node<E> oldHead = head.get();
            if (oldHead == null) throw new EmptyQueueException();
            Node<E> newHead = oldHead.next.get();
            if(head.compareAndSet(oldHead, newHead)) {
                return oldHead.item;
            }
        }
    }
}
```
