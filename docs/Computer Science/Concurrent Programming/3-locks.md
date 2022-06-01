## Interleavings

Interleaving is a possible way in which a series of statements could be executed. This concept is important because in concurrent programming the interleaving of a program could influence the result. Choosing the interleaving is however not up to us but the scheduler.

![interleaving](/img/programming/interleaving.png)

```java
class Counter {
    private int i = 0;
    public void inc() { i++; }
    public int getCount() { return i; }
}
class R implements Runnable {
    private Counter c;
    public R(Counter c) { this.c = c; }
    public void run() {
        for (int i = 0; i < 100000; i++) {
            c.inc();
        }
    }
}
public class CounterTest {
    public static void main(String[] args) {
        Counter c = new Counter();
        Runnable r = new R(c);
        Thread t0 = new Thread(r); Thread t1 = new Thread(r);
        Thread t2 = new Thread(r); Thread t3 = new Thread(r);
        t0.start(); t1.start(); t2.start(); t3.start();
        try {
            t0.join(); t1.join(); t2.join(); t3.join();
        } catch (InterruptedException e) {}
        System.out.println(c.getCount());
    }
}
```

![counterExampleProblem](/img/programming/counterExampleProblem.png)

Counter example. Because the scheduler is allowed to switch context between every operation. Read and write operations are not guarantted to atomic meaning that something like the following could happen. Even when writing to a double it might do in 2 parts, first assign the first 32bit then the next 32 bit and even this could be interrupted by the sheduler.

### Interleaving model

The interleaving model is used to calculate the number of possible interleavings depending on the number of threads $n$ and the number of atomic instructions $m$.

$$interleavings = \frac{(n \cdot m)!}{(m!)^n}$$

For example if there are 2 threads and 3 atomic instructions there are 20 possible different executions. By increasing the thread amount to 4 this number skyrockets to 369'600.

## Race conditions

A race condition can happen when two or more threads are accessing shared data and at least one of them is modifying the data. The final result of a race condition depends on how the threads are scheduled. This leads to unpredictable results as thread scheduling on is nondeterministic. To prevent this we have to use so called synchronization.

## Synchronization

Synchonization is managing access to shared data between multiple threads that can be mutated.

### Locking

locking is a mechanism to enforce mutual exclusion. Mutual exclusion (mutex) prevents simultaneous access to a shared resource by restricting access to one thread at a time and therefore guarding critical sections from concurrent execution.

![counterExampleLockFix](/img/programming/counterExampleLockFix.png)

in java synchronized keyword is built in locking mechanism for enforcing atomicity. two parts the object that will serve as a lock and a block of code to be guarded by the lock. The lock is aqcquired when synchronized section is entered. If lock is not available because it has already been taken by another thread then thread enters a waiting queue. When the thread exits the syncronized section the lock is released. Often lock is just on the current class or instance which can be shorthanded. In the byte code this adds the memory barriers, monitorenter and monitorexit. Synchronizing is not free it comes with additional code and also means that the compiler can make fewer optimizations

#### Reentrancy

a lock can be acquired multiple times by the same thread to no effect.
lock in lock example stuff.

#### Design considerations

maybe not always use this sometimes better to use a specific lock object which is more explicit and can be declared private. stackoverflow bad example of lock with stirng.

#### Lock Attack

can obtain lock and never give it free.

### java.util Lock

more flexible, locks can acquired and released in different scopes try with finally to unlock comes with more responsibility.

#### Reentrant Lock

implements Lock. ReentrantLock allows threads to enter into the lock on a resource more than once. When the thread first enters into the lock, a hold count is set to one. Before unlocking the thread can re-enter into lock again and every time hold count is incremented by one. For every unlocks request, hold count is decremented by one and when hold count is 0, the resource is unlocked. fairness parameter, by which the lock would abide by the order of the lock request i.e. after a thread unlocks the resource, the lock would go to the thread which has been waiting for the longest time

### Deadlock

A Deadlock is a situation where a thread is blocked because it is holding a resource and waiting for another resource acquired by some other thread. So in other words the necessary conditions for a deadlock to happen are
– Mutual Exclusion
– Hold and Wait, threads request additional resources while holding other resources.
– No Preemption, resources are released exclusively by threads.
– Circular Wait, two or more processes form a circular chain where each thread waits for a
resource that the next thread in the chain holds. Can be eliminated with global order.

#### Global order

Instead of having the following situation

![globalOrder](/img/programming/globalOrder.png)

We can acquire the locks in lexicographical order.

![globalOrderFix](/img/programming/globalOrder.png)
