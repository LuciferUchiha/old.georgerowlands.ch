---
title: Bag
description: Bag
tags: [java, collections, data structures, algorithms, bag, binary search]
---

A bag is a data structure that can contain the same element multiple times which is why it also often called multiset. The order of adding elements is not necessarily given, this depends on the implementation. Common operations on a bag are adding elements, removing elements and searching for a specific element.

## Array implementations

One of the simplest ways of implementing data structures is by using arrays. When implementing a data structure the time complexities can be different on whether the data is always in a sorted state or not.

```java title="UnsortedBag.java"
// TODO
```

When implementing a sorted collection in Java you can either implement your own binary search or you can use `java.util.Arrays.binarysearch(a, from, to, key)` which returns the index of the key, if it is contained and otherwise $(-(insertion point) - 1)$ with insertion point being the point where the key would be inserted, i.e the index of the first element greater than the key.

```java title="SortedBag.java"
// TODO
```

### Time complexities

| Operation        | UnsortedBag                                | SortedBag                                             |
| ---------------- | ------------------------------------------ | ----------------------------------------------------- |
| add(E e)         | $O(1)$ <br/> no search, or shift           | $O(n)$ <br/> search + shift right $O(\log{n}) + O(n)$ |
| search(Object o) | $O(n)$ <br/> linear search                 | $O(\log{n})$ <br/> binary search                      |
| remove(Object o) | $O(n)$ <br/> search + remove $O(n) + O(1)$ | $O(n)$ <br/> search + shift left $O(\log{n}) + O(n)$  |
| Ideal use case   | When adding a lot                          | When searching a lot                                  |
