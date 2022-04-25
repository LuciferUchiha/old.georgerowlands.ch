---
title: Interrupts
description: TODO
tags: [concurrent programming, synchronization]
---

Blocking methods can potentially take forever if the event they are waiting for never occurs so we might want them to be cancelable. Java offers us to functions for this.

`Thread.stop()` is declared deprecated as it is inherently unsafe because it unlocks all the monitors that the thread has locked. If any of the objects previously protected by these monitors were in an inconsistent state, the damaged objects become visible to other threads, potentially resulting in broken behavior.

## Interrupt flag

Every thread has a boolean interrupted status property. When `interrupt()` is called and the thread is blocked in an invocation of wait, sleep or join statement, an InterruptedException is thrown. Otherwise the thread's interrupt flag is set. Just before InterruptedException is thrown the interrupt flag is reset. If the interrupt flag is set, a subsequent wait / sleep / join call immediately throws an InterruptedException. You can read the flag with `isInterrupted()`. There is also the static `Thread.interrupted` function that resets the flag and returns the old value.

```java
Thread.currentThread().interrupt(); // true
System.out.println(Thread.interrupted()); // prints true, now false
try {
    Thread.sleep(1000); System.out.println("ok1"); // prints
} catch (InterruptedException e) {
    System.out.println("IE: " + Thread.currentThread().isInterrupted());
}
Thread.currentThread().interrupt(); // true
System.out.println(Thread.currentThread().isInterrupted()); // prints true
try {
    Thread.sleep(1000); System.out.println("ok2"); // doesn't print
} catch (InterruptedException e) {
    System.out.println("IE: " + Thread.currentThread().isInterrupted()); // prints
}
```

## Handling InterruptedException

### Ignore

### Propagate

### Defer

## Lost signals

A lost signal can happen when a thread is notified with notify simultaneously to an interrupt then the notify signal may get lost.

1. Threads t1 and t2 are waiting in a wait()
2. Thread t3 performs a notify => t1 is selected
3. Thread t4 interrupts t1
   1. wait called by t1 throws InterruptedException
      1. t1 does not process notification
      2. t2 does not wake up

A solution to this problem is to use notifyAll() or notify in ExceptionHandler.

```java
catch( InterruptedException e ) {
    notify();
    throw e;
}
```
