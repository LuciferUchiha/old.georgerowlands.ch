---
title: JMM - Java memory model
description: TODO
tags: [concurrent programming, synchronization]
---

The java memory model, short JMM, specifies guarantees given by the JVM about when writes to variables become visible to other threads, which operations are atomic, and ordering of operations so under which conditions can the effects of operations appear out of order to any given thread.

## Memory layout

Modern CPUs dont just have the main memory they also have multiple caches and registers to make things faster however this can lead to problems.
Allthough all threads share the main memory each thread has several cache levels. We can see these in effect in the following example.

![cpuMemoryLayout](/img/programming/cpuMemoryLayout.png)
![memoryLayoutExample1](/img/programming/memoryLayoutExample1.png)

When running the program all 6 possible interleaving can happen so we would think that the values would be (1,0),(1,1),(0,1) but when running the program we can also get (0,0) this is due to either compiler reordering or caching.

![memoryLayoutExample2](/img/programming/memoryLayoutExample2.png)

## Happens before rules

The JMM defines a partial order called happens-before on actions (variable read/write, monitor lock/unlock, thread start/join) to guarantee that a thread executing action B can see the results of action A (same or different thread) there must be a happens-before relationship between A and B, otherwise there is no guarantee!

### Rule 1

Each action in a thread happens-before every action in that thread that comes later in the program order.

![happensBefore1](/img/programming/happensBefore1.png)

### Rule 2

An unlock on a monitor lock happens-before every subsequent lock on that same monitor lock.

![happensBefore2](/img/programming/happensBefore2.png)

### Rule 3

A write to a volatile field happens-before every subsequent read of that same field.

![happensBefore3](/img/programming/happensBefore3.png)

### Rule 4

A call to Thread.start on a thread happens-before every subsequent action in the started thread.

![happensBefore4](/img/programming/happensBefore4.png)

### Rule 5

Actions in a thread t happens-before another thread detects its termination.

![happensBefore5](/img/programming/happensBefore5.png)

### Rule 6

The happens-before order is transitive.

![happensBefore6](/img/programming/happensBefore6.png)

## Volatile

Volatile fields guarantee the visibility of writes (i.e. volatile variables are never cached). Read access to a volatile implies to get fresh values from memory. Write access to a volatile forces the thread to flush out all pending writes to the memory. Volatile variables do however have a cost because caching is no longer allowed. Important to note is also that access to a volatile variable inside a loop can be more expensive than synchronizing the entire loop.

```java
class MyExchanger {
    private volatile Pair data = null;
    public String getPairAsString() {
        return data == null ? null : data.toString();
    }
    public boolean isReady() {
        return data != null;
    }
    public void setPair(Object first, Object second) {
        Pair tmp = new Pair();
        tmp.setFirst(first);
        tmp.setSecond(second);
        data = tmp; // guaranteed to have both
    }
}
```

### Fixing long/double atomicity

Depending on the implementation a long or double assignment is not atomic, it will do 32 bits at a time. To prevent this we can make the long volatile which will guaranty it to be atomic.

## Double checked locking problem

We want a Singelton with lazy initialization that is thread safe. Our first attempt would be somethings like this with getInstance being synchronized so that we don't run into problems. And this works fine however it is very expensive as for every getInstance we have the synchronization overhead.

```java
public class Singleton {
    private static Singleton instance;
    public synchronized static Singleton getInstance() {
        if(instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
    private Singleton() { /* initialization */ }
}
```

To fix this we need to do so called double checking. We also need to make the instance volatile to prevent there being uninitialied objects.

```java
public class Singleton {
    private volatile static Singleton instance;
    public static Singleton getInstance() {
        if(instance == null) {
            synchronized(Singleton.class) {
                if(instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
    private Singleton() { /* initialization */ }
    // other methods
}
```
