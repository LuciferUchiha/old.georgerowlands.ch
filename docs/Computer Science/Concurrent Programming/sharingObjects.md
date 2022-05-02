---
title: Safe object sharing
description: TODO
tags: [concurrent programming, synchronization, immutability]
---

Instead of synchronizing objects to make sure that nothing breaks when sharing objects there are two alternatives. Either you make the object immutable then the object can never share so there shouldn't be any inconsistent state. Or you just don't share the state variable across threads.

## Immutable objects

In principle immutable objects aren't very complicated but you do have to be aware of how the object is initialized when working concurrently as we don't want not or half initialized objects. For example in the below example the account object could be un or partial initialized.

```java
// immutable
final class Account {
    private int balance;
    public Account(int balance) { this.balance = balance; }
    public String toString() { return "" + balance; }
}
class Company {
    private Account account = null;
    public Account getAccount() { // lazy initialization
        if(account == null) account = new Account(10000);
        return account;
    }
}
```

if we then call `T0: company.getAccount().toString();` and `T1: company.getAccount().toString();` we have no guaranties that we get 10000, we could get 0. To fix this we could make the field volatile. The happens-before relation then guarantees that fields set in the constructor are visible as the invocation of the constructor happens-before the assignment to the volatile field account.

```java
class Company {
private volatile Account account = null; // safe publication
    public Account getAccount() {
        if(account == null) account = new Account(10000);
        return account;
    }
}
```

Using volatile for this can however be very expensive and we only really want it for the first initialization not for any further calls of getAccount. For this reason the JMM guarantees that final fields are only visible after they have been initialized! This then means that if a thread sees a reference to an Account instance, it has the
guarantee to see the initialized final fields. The JMM also guaranties that for final references of an object, all referenced objects are visible after initialization if accessed over the final reference. Initialization-Safety is only guaranteed if an object is accessed after it is fully constructed. For this to be the case you can not allow the `this` reference to escape during construction.

```java
class Account {
    private final int balance;
    public Account(int balance) { this.balance = balance; }
    public String toString() { return "" + balance; }
}
```

## Thread locals

DateFormats are documented not to be threadsafe. Meaning we could use a fresh instance on every invocation.

```java
public class BadFormatter {
    private static final SimpleDateFormat sdf = new SimpleDateFormat();
    public static String format(Date d) {
        return sdf.format(d);
    }
}
public class GoodFormatter {
    public static String format(Date d) {
    SimpleDateFormat sdf = new SimpleDateFormat();
        return sdf.format(d);
    }
}
```

However if this is a performance problem you could also use ThreadLocals. A thread-local variable provides a separate copy of its value for each
thread that uses it. It provides a means to pass state along the call stack without having to explicitly define an additional method parameter.

```java
class ThreadLocal<T> {
    public T get();
    public void set(T value); 
    protected T initialValue();
    public void remove(); // since 1.5
}
```

We could then solve the above problem like the following

```java
class ThreadLocalFormatter {
    private static ThreadLocal<SimpleDateFormat> local = ThreadLocal.withInitial(() -> new SimpleDateFormat());
    public static String format(Date d) {
        return local.get().format(d);
    }
}
```

### ThreadLocalRandom

Although Random is threadsafe the concurrent use of the same Random instance across threads may encounter contention and consequent poor performance which is why ThreadLocalRandom was added.

```java
    private static ThreadLocal<ThreadLocalRandom> local = ThreadLocal.withInitial(() -> new ThreadLocalRandom());
```
