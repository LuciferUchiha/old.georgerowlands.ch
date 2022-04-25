---
title: Condition variables
description: TODO
tags: [concurrent programming, synchronization]
---

Condition variables provide a means to wait until being notified by another thread that some condition may now be true. For example in a Carpark if you are waiting to get in because it is full you want to be notified when a car exits.

```java
public class CarPark {
    private int places;
    public CarPark(int places) { this.places = places; }
    public synchronized void enter() {
        while(places == 0) {
            try { this.wait(); } // waits and releases lock
            catch (InterruptedException e) { }
        }
        places--;
    }
    public synchronized void exit() {
        places++;
        this.notifyAll(); // wakes all up for race who gets lock 
    }
}
```

The wait and notify/notifyAll functions are implemented in the Object class and act on the lock.

:::note

Make sure to use a while loop, because of interrupts or spurious wakeups.

:::

![threadState](/img/programming/threadState.png)

## notify() vs notifyAll()

notify() wakes up one waiting thread (which then must compete for the lock) you have no control over which thread is woken up. If there are no threads waiting it is like and empty statement.

notifyAll() wakes up all waiting threads which must then compete for the lock.

There are two forms of waiters

- **Uniform waiters**: All waiters are equal (wait for the same condition)
- **One-in, one-out**: A notification on the condition variable enables at most one thread to proceed

When you are working with uniform waiters notify() is fine however it is much safer but less efficient to use notifyAll().

## BlockingQueue

We want to implement a BlockingQueue that is threadsafe. Here we have two conditions to be mindful of, being full and being empty as in both cases we want to block and to this there are a few ways.

![circularBlockingQueue](/img/programming/circularBlockingQueue.png)

We can either use three locks.

```java
public class Queue {
    private final static int SIZE = 10;
    private Object[] buf = new Object[SIZE];
    private int tail = 0, head = 0;

    private Object notEmpty = new Object();
    private Object notFull = new Object();

    public synchronized Object dequeue() {
        while (tail == head) { // while empty
            synchronized (notEmpty) {
                try { notEmpty.wait(); } catch (Exception e) {}
            }
        }
        synchronized (notFull) { notFull.notify(); }
        Object e = buf[head]; head = (head + 1) % SIZE;
        return e;
    }
    public synchronized void enqueue(Object c) {
        while ((tail + 1) % SIZE == head) {
            synchronized (notFull) {
                try { notFull.wait(); } catch (Exception e) {}
            }
        }
        synchronized (notEmpty) { notEmpty.notify(); }
        buf[tail] = c;
        tail = (tail + 1) % SIZE;
    }
}
```

Or add conditions to a lock.

```java
public class Queue {
    private final static int SIZE = 10;
    private final Object[] buf = new Object[SIZE];
    private int tail = 0, head = 0;

    private final Lock lock = new ReentrantLock();
    private final Condition notEmpty = lock.newCondition();
    private final Condition notFull = lock.newCondition();

    public Object dequeue() {
        lock.lock();
        try {
            while (tail == head) { // while empty
                try { notEmpty.await(); } catch (Exception e) {}
            }
            Object e = buf[head]; head = (head + 1) % SIZE;
            notFull.signal(); return e;
        } finally { lock.unlock(); }
    }
    public void enqueue(Object c) {
        lock.lock();
        try {
            while ((tail + 1) % SIZE == head) {
                try { notFull.await(); } catch (Exception e) {}
            }
            buf[tail] = c; tail = (tail + 1) % SIZE;
            notEmpty.signal();
        } finally {
            lock.unlock();
        }
    }
}
```
