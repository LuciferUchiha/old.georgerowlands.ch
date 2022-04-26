---
title: Set
description: Set
tags: [java, collections, data structures, algorithms, set, binary search]
---

A set is a data structure that can hold unique elements. It represents a mathematical set which in german is called a "Menge". This means that an element is either in the set or it isn't. Just like with a bag you have the common operations of adding elements, removing elements and searching for a specific element.

## Array implementations

```java title="UnsortedSet.java"
// TODO
```

Just like when [implementing the bag](./bag#array-implementations) we can use `java.util.Arrays.binarysearch(a, from, to, key)` which returns the index of the key, if it is contained and otherwise $(-(insertion point) - 1)$ with insertion point being the point where the key would be inserted, i.e the index of the first element greater than the key.

```java title="SortedSet.java"
// TODO
```

### Time complexities

When implementing a set and bag there is also the question of whether the data should be sorted or not. Depending on the answer the time complexities will be different and the implementation changes.

| Operation        | UnsortedSet                                     | SortedSet                                                                     |
| ---------------- | ----------------------------------------------- | ----------------------------------------------------------------------------- |
| add(E e)         | $O(n)$ <br/> check (search) + add $O(n) + O(1)$ | $O(n)$ <br/> search insertion point (check) + shift right $O(\log{n}) + O(n)$ |
| search(Object o) | $O(n)$ <br/> linear search                      | $O(\log{n})$ <br/> binary search                                              |
| remove(Object o) | $O(n)$ <br/> search + remove $O(n) + O(1)$      | $O(n)$ <br/> search insertion point (check) + shift left $O(\log{n}) + O(n)$  |
| Ideal use case   | When set is needed but don't search a lot       | When set is needed and a lot of searching                                     |
