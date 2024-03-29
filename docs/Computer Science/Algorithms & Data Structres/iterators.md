---
title: Iterators
tags: [java, collections, data structures, iterators, modcount]
---

The `Iterator<E>` interface allows you to implement a class that can be used to traverse a collection that contains elements of type `E`. An iterator always holds the value of the next element, apart from at the beginning of an iteration, where it holds a reference to the first element. In Java, the for-each loop uses an iterator internally. This means if you want to use a for-each loop on a collection, the collection class needs to implement the iterator interface. When implementing an iterator you often do this with an internal private final class in the collection class as you then have access to the internal structure of the collection.

`E next()` on the iterator returns the value the iterator is pointing to and advances the iterator to the next element.

`boolean hasNext()` on the iterator returns false once the iterator has reached the end of the collection, otherwise true.

The iterator interface also provides a `void remove()` method. This method removes the most recently returned element from the iterator.

![iteratorRemove](/img/programming/iteratorRemove.png)

When removing elements with the iterator we can however encounter problems when there are multiple iterators in a concurrent environment. This issue can be solved with a modification counter (modCount) which we increase by 1 whenever the underlying collection is changed, for example when adding or removing an element. When an iterator is instantiated the modCount is copied and continuously checked if it is the same as the underlying modCount of the collection if not then a `ConcurrentModificationException` is thrown. How this works for different collections in java is [explained here](https://stackoverflow.com/a/5847949/10994912).

```java
// TODO what is the underlying collection linked list????
@Override
public Iterator < E > iterator() {
    return new MyIterator();
}

private final class MyIterator implements Iterator < E > {
    private Node < E > next = first,
    p = null,
    pp = null;
    private int myModCount = modCount;
    private boolean mayRemove = false;

    @Override
    public boolean hasNext() {
        return next != null;
    }

    @Override
    public E next() {
        if (modCount != myModCount)
            throw new ConcurrentModificationException();
        if (next == null)
            throw new NoSuchElementException();
        E e = next.elem;
        if (p != null) pp = p;
        p = next;
        next = next.next;
        mayRemove = true;
        return e;
    }

    @Override
    public void remove() {
        if (modCount != myModCount)
            throw new ConcurrentModificationException();
        if (!mayRemove)
            throw new IllegalStateException();
        if (pp != null) pp.next = next;
        else first = next;
        if (next == null) last = pp;
        p = pp;
        mayRemove = false;
        size--;
        modCount++;
        myModCount = modCount;
    }
}
```

## ListIterator

In Java, there is also the `ListIterator<E>` interface which extends the `Iterator<E>` interface. This interface adds functionality that allows for iteration in both directions with `E next()` and `E previous()`.
