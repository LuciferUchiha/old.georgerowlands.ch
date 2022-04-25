---
title: Executor Framework
description: TODO
tags: [concurrent programming, executors, workers]
---

The Java executor framework is used to run and manage Runnable objects, so called Tasks. It does this using so called workers or worker threads which are most often managed as part of a ThreadPool. Depending on the configuration of the pool instead of creating new threads every time the so called channel will try and reuse already created threads. Any excess tasks flowing into the channel that the threads in the pool can't handle at the minute are held in some form of data structure like a BlockingQueue. Once one of the threads has finished its task and gets free, it picks up the next task from the channel.

![executorFramework](/img/programming/executorFramework.png)

The Executor Interface provides a single function `void execute(Runnable task)` which executes the given task and depending on the implementation will do this using a thread pools, a single thread etc.

## Custom Executors

This is just a custom executor that uses a thread pool.

```java
class MyThreadPoolExecutor implements Executor {
    private final BlockingQueue<Runnable> queue = new LinkedBlockingQueue<Runnable>();

    public void execute(Runnable r) { queue.offer(r); }

    public MyThreadPoolExecutor(int nrThreads) {
        for (int i = 0; i < nrThreads; i++) { activate(); }
    }

    private void activate() {
        new Thread(() -> {
            try {
                while (true) { queue.take().run(); }
            } catch (InterruptedException e) { /* die */ }
        }).start();
    }
}
```

You can also create an executor just executes the given task on the current thread.

```java
class DirectExecutor implements Executor {
    public void execute(Runnable r) { r.run(); }
}
```

Or you can create an executor that creates a new thread for each task.

```java
class ThreadPerTaskExecutor implements Executor {
    public void execute(Runnable r) {
        new Thread(r).start();
    }
}
```

## Builtin Executors

The executor frameworks has some builtin executors that you can access using the factory methods in the `Executors` class. All the factories return instances of the `ExecutorService` interface which extends the `Executor` interface and adds some life-cycle management methods.

```java
interface ExecutorService extends Executor {
    void shutdown(); // kind, finish all pending tasks, don't accept new ones
    List<Runnable> shutdownNow(); // all running tasks are interrupted, a list of the tasks that were awaiting execution
    boolean isShutdown();
    boolean isTerminated();
    boolean awaitTermination(long timeout, TimeUnit unit) throws InterruptedException; // blocks until all tasks completed execution after a shutdown request
}
```

- `Executors.newFixedThreadPool(int nThreads)`: Creates a thread pool that reuses a fixed number of threads operating off a shared unbounded queue. Threads that die due to an exception are replaced.
- `Executors.newCachedThreadPool()`: Creates a thread pool that creates new threads as needed, but will reuse previously constructed threads when they are available.
- `Executors.newSingleThreadScheduledExecutor()`: Creates an Executor that uses a single worker thread operating off an unbounded queue. The worker thread is replaced if it dies due to an exception.
- `Executors.newScheduledThreadPool(int corePoolSize)`: Creates a thread pool that can schedule commands to run after a given delay, or to execute periodically.

## Callable and Future

Because the runnable interface does not allow for exceptions or results we need to use something different if we wish to have this functionality. The executor framework has a few tools for this. We have the `Callable` interface which is our alternative for the `Runnable` interface and then the `Future` interface which is similiar to a promise in JavaScript and represents a future result of a task.

```java
interface Callable<V> {
    V call() throws Exception;
}
```

```java
interface Future<V> {
    boolean cancel(boolean mayInterruptIfRunning);
    boolean isCancelled();
    boolean isDone();
    V get() throws InterruptedException, ExecutionException, CancellationException;
    V get(long timeout, TimeUnit unit) throws InterruptedException, ExecutionException, CancellationException, TimeoutException;
}
```

Instead of then using the execute function from the `Executor` interface, we have a few additional functions in the `ExecutorService` interface along with life-cycle methods.

```java
interface ExecutorService extends Executor {
    // ...lifecycle methods
    <T> Future<T> submit(Callable<T> task); // the key function
    Future<?> submit(Runnable task);
    <T> Future<T> submit(Runnable task, T result);
    // takes a list of tasks and returns a list of the matching results
    <T> List<Future<T>> invokeAll(Collection<? extends Callable<T>> tasks) throws InterruptedException;
    // Executes the given tasks, returning the result of one that has completed successfully if any do.
    <T> T invokeAny(Collection<? extends Callable<T>> tasks) throws InterruptedException, ExecutionException;
}
```