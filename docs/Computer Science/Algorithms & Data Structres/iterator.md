# Iterator

An iterator is an object that enables us to traverse a collection. A Iterator allows holds the value of the next element, apart from at the beginning it holds a reference to the first element. The next() returns the value pointed to by the iterator and then advances the iterator. Iterators often have the method hasNext() which returns false once it is at the end. In java the foreach syntax sugar internally uses a iterator.

In java there are also ListIterators which allow you to iterate in both directions, with next() and previous().

When implementing an iterator you often do this with an internal class in the collection class as you then have access to the internal structure of the collection.

## Remove

Iterators also have a remove() method. This method removes the most recently returned element from the collection.

![iteratorRemove](/img/programming/iteratorRemove.png)

We can however encounter problems with removing when there are multiple iterators, for example when our application is multithreaded. This issue can be solved with a modification counter which we increase by 1 whenever we change the collection so when adding or removing. When an iterator is instantiated it copies the modCount and checks continuously if the modCounts are the same if not we throw a ConcurrentModificationException.

Our Iterator then looks something like the following

```java
@Override
 public Iterator<E> iterator() {
  return new MyIterator();
 }

 private class MyIterator implements Iterator<E> {
  private Node<E> next= first, p = null, pp = null;
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
