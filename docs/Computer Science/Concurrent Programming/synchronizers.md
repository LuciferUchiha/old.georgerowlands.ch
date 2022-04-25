---
title: Synchronizers
description: TODO
tags: [concurrent programming, synchronization]
---

A synchronizer is any object that coordinates the control flow of threads based on its state. The most simplest form of synchronization being locks.

## Semaphore

A semaphore is an integer variable that represents a resource counter which can be interpreted as permits to the resource. Its main usage it to restrict the number of threads than can access some physical or logical resource.

```java
public class Semaphore {
    public Semaphore(int permits) {...}
    // acquires a permit, blocking until one is available, or the thread is interrupted.
    public void acquire() throws InterruptedException {...}
    // acquires a permit, blocking until one is available.
    public void acquireUninterruptibly() {...}
    public void release() {...}
}
```

![semaphoreBehavior](/img/programming/semaphoreBehavior.png)

### Example

It is for example perfect to implement the CarPark seen here.

```java
class SemaphoreCarPark implements CarPark {
    private final Semaphore s;
    public SemaphoreCarPark(int places) {
        s = new Semaphore(places);
    }
    public void enter() {
        s.acquireUninterruptibly();
        log("enter carpark");
    }
    public void exit() {
        log("exit carpark");
        s.release();
    }
}
```

### SemaphoreLock

With a binary semaphore you can use it as a mutex/lock. The only problem is that the lock isn't reentrant and a different thread can release the lock then the one that has acquired it.

```java
class SemaphoreLock {
private final Semaphore mutex = new Semaphore(1);
    public void lock() { mutex.acquireUninterruptibly();}
    public void unlock() { mutex.release(); }
}
```

## ReadWriteLock

The motivation for a ReadWriteLock is that if we use the same lock for reading and writing then only one thread could read at the time even tho this doesn't cause any problems. To solve this a ReadWriteLock maintains a pair of locks, a lock for reading which can be held simultaneously by multiple readers and a write lock which can only be held by one thread. This leads to there being 2 possible states. Either one thread is writing or one or multiple threads are reading.

```java
public interface ReadWriteLock {
    Lock readLock(); // allows for concurrent reads
    Lock writeLock(); // writes are exclusive
}
```

![readWriteLockBehavior](/img/programming/readWriteLockBehavior.png)

### Example

```java
class KeyValueStore {
    private final Map<String, Object> m = new TreeMap<>();
    private final ReadWriteLock rwl = new ReentrantReadWriteLock();
    private final Lock r = rwl.readLock();
    private final Lock w = rwl.writeLock();
    public Object get(String key) {
        r.lock(); try { return m.get(key); } finally { r.unlock(); }
    }
    public Set<String> allKeys() {
        r.lock(); try { return new HashSet<>(m.keySet()); } finally { r.unlock(); }
    }
    public void put(String key, Object value) {
        w.lock(); try { m.put(key, value); } finally { w.unlock(); }
    }
    public void clear() {
        w.lock(); try { m.clear(); } finally { w.unlock(); }
    }
}
```

## CountDownLatch

A CountDownLatch delays the progress of threads until it reaches its terminal state. It main usage being to ensure that an activity does not proceed until another one-time action has completed.

```java
public class CountDownLatch {
    public CountDownLatch(int count) {...}
    // Causes the current thread to wait until the latch has counted down to zero
    public void await() {...}
    // Decrements the count, releasing all waiting threads if the count reaches zero.
    public void countDown() {...}
    public long getCount() {...}
}
```

Here there are two common scenarios. Either a thread wants to wait until some other actions are done, or a thread is used a sort of starting gun for other threads.

![countDownLatchBehavior1](/img/programming/countDownLatchBehavior1.png)
![countDownLatchBehavior2](/img/programming/countDownLatchBehavior2.png)

### Example

```java
class KeyValueStore {
    private final Map<String, Object> m = new TreeMap<>();
    private final ReadWriteLock rwl = new ReentrantReadWriteLock();
    private final Lock r = rwl.readLock();
    private final Lock w = rwl.writeLock();
    public Object get(String key) {
        r.lock(); try { return m.get(key); } finally { r.unlock(); }
    }
    public Set<String> allKeys() {
        r.lock(); try { return new HashSet<>(m.keySet()); } finally { r.unlock(); }
    }
    public void put(String key, Object value) {
        w.lock(); try { m.put(key, value); } finally { w.unlock(); }
    }
    public void clear() {
        w.lock(); try { m.clear(); } finally { w.unlock(); }
    }
}
```

## CyclicBarrier

A CyclicBarrier allows a set of threads to all wait for each other to reach a common barrier point.

```java
public class CyclicBarrier {
    public CyclicBarrier(int nThreads) {...}
    public CyclicBarrier(int nThreads, Runnable barrierAction)
    public void await() {...}
}
```

![cyclicBarrierBehavior](/img/programming/cyclicBarrierBehavior.png)

## Exchanger

An Exchanger allows two threads to wait for each other and exchange an objects. This can be especially useful when the object is very big as it can be reused.

```java
public class Exchanger<T> {
    public T exchange(T t) {...}
}
```

![exchangeBehavior](/img/programming/exchangeBehavior.png)

## BlockingQueue

A BlockingQueue is a queue which supports operations to wait for the queue to become non-empty when retrieving an element, and wait for space to become available when storing an element. This is especially commonly used in the Product-Consumer pattern.

![blockingQueueProductConsumer](/img/programming/blockingQueueProductConsumer.png)

```java
public interface BlockingQueue<E> extends Queue<E> {
    E take() throws InterruptedException;
    void put(E e) throws InterruptedException;
    ...
}
```

![blockingQueueBehavior](/img/programming/blockingQueueBehavior.png)
