---
title: Hash tables
description: Hash tables
tags: [java, collections, data structures, algorithms, hashing, hash tables]
---

## Motivation

Imagine we want to be able to access data with O(1) using the data's key.

![hashTable](/img/programming/hashTable.png)

To be able to do so we need to generate a hash code from the key of the data. This in return then gives us a number. We then want to get an index in a hash table from this number by using a hash function. For this to be able to work 2 conditions need to be met. Firstly we need to be able to know if 2 objects are the same (equals()) secondly we need to be able to generate a hash code(hashCode()) from the objects key(can be a combination of attributes or just one).

Importantly here is the following

$$(a.equals(b)) \Rightarrow (a.hashCode() == b.hashCode())$$

So if 2 objects are the same then their hash Code must be the same as well. However if 2 hash codes are the same it does not necessarily mean that the objects are the same. If this happens we call it a collision.

## Hashing Function

We want the index to be calculated as fast as possible. We also from the above requirements want the same key to have the same index. We also want the hash codes and therefore the indices to be evenly distributed so that as little collusions happen as possible.

For the beggining we just decide to do the following

$$index = hash code \,\%\, table.length()$$

## Hash Code

We went the generated hash code to be randomly spread across the entire range of an int.

If the key is a 32-bit data type, like boolean, byte, short, int, char and float we can just take its value straight as an int.

If the key is a 64-bit data type, like long or double we do an XOR(Only true if they are different) between the two 32-bit parts.

```java
public int hashCode() {
 return (int)(value ^ (value >>> 32));
}
```

For strings you might think it would be a good idea to add the char values together. However this is not a good idea as for example AUS and USA would then have the same hash code. Instead we create a polynomial using the char values as coefficients.

```java
public final class String {
 private final char value[];
 /** Cache the hash code for the string */
 private int hash; // Default to 0
 ...
 public int hashCode() {
  int h = hash;
  if (h == 0 && value.length > 0) {
   char val[] = value;
   for (int i = 0; i < value.length; i++) {
    h = 31 * h + val[i];
   }
   hash = h;
  }
  return h;
 }
 ...
}
```

## HashMap

A Java HashMap has always a power of 2 as size. This then leads to the map reserving twice as much memory then it actually needs in the worst case. The advantage is that it is very easy to calculate powers of 2 thanks to bit shifts. IT also allows us to change the hash function (hashCode() & 0x7FFFFFFF) % length to hashCode() & (length -1). The bitmask with 0x7FFFFFFF ensures that the hash code is positive.

```java
public HashMap (int initialCapacity) {
 int capacity = 1;
 while (capacity < initialCapacity)
 capacity <<= 1;
 table = new Entry[capacity];
}
private int indexFor(int h) {
 return h & (table.length - 1);
}
```

## Collision Resolution

As mentioned before collisions can happen and we can't really avoid them. Which is why we need to come up with a way to deal with them.

### Seperate Chaining

When a collision happens we chain the elements together just like with a linked list. The advantage of this strategy is that it is very simple and the table never gets "full". The problem however is that it needs additional memory and the memory needs to be dynamic.
![seperateChaining](/img/programming/seperateChaining.png)

With this strategy our class for a HashMap would look something like this

```java
public class HashMap<K,V> implements Map<K,V> {
 Node<K,V>[] table;
 ...
 static class Node<K,V> implements Map.Entry<K,V> {
  final K key;
  V value;
  Node<K,V> next;
  ...
 }
}
```

If the table has the size m and we insert n elements. The probability of a collision is

$$\prod_{i=0}^{n-1}{\frac{m-i}{m}}$$

and therefor the probability for at least 1 collision is

$$1 - \prod_{i=0}^{n-1}{\frac{m-i}{m}}$$

### Open addressing

With this strategy when there is a collision we look for a free space in the hash table. The advantage of this strategy is that it does not need any additional space however the table can get full.

#### Linear probing

If there is a collision we try the next highest index until we find a few space. If we reach the end of the table we restart our search at index 0 until we are back to the initial collision.

So if our hash code is x and our table has the size m our index after k collisions is = (x mod m + k) mod m.

```java
public void add(T elem) {
 int i = (elem.hashCode() & 0x7FFFFFFF) % size;
 while (array[i] != null) {
  i = (i + 1) % size;
 }
 array[i] = elem;
}
```

The above code however doesn't check if we are working with a set or if the table is full. The problem with this strategy however is that clusters form. When inserting then you have to probe until you find a free space which makes the cluster even bigger and therefore the probability of hitting a cluster even bigger.

When inserting into a table of size n with a cluster of size k the probability of increasing the cluster when inserting is $\frac{k+2}{n}$. The probability of an insert needing at least 3 probe steps is $\frac{k-2}{n}$.

##### Double hashing

The idea here is that we don't look at the next highest free space, so a step size of 1 but each element has its own step size. We do this to avoid creating clusters. This strategy is called double hashing as you are hashing for the index but also for the step size.

So if our hash code is x and our table has the size m our index after k collisions is = (x mod m + k * step) mod m.

```java
public void add(T elem) {
 int i = (elem.hashCode() & 0x7FFFFFFF) % size;
 int step = ...?
 while (array[i] != null) {
  i = (i + step) % size;
 }
 array[i] = elem;
}
```

We need to be very carful with choosing the step size otherwise we make the problem even worse. Some obvious examples of bad step sizes would be 0 or the table size. So we set us the following condition

$$ggt(step, m)= 1 \text{ so they are teilerfremd and } 0 < step < m$$

Some common choices are:

- m is a power of 2 and step is an odd number $\in [1, m-1]$. 1 + 2*((elem.hashCode() & 0x7FFFFFFF) % (m/2))
- m is a prime number and step $\in [1, m-1]$. 1 + (elem.hashCode() & 0x7FFFFFFF) % (m – 2)

## Removing elements

We cant just remove and element and set it to null otherwise when looking for a different element after the deletion we could hit a null reference before we find the element we are looking for. Instead of setting it to null we set it to a sentinel. If we are looking for a value and we hit a sentinel we just carry on our search, however if we are adding an element we can add it in the place of the sentinel.

```java
public class HashTable<T> {
 private final Object[] arr;
 private static final Object sentinel = new Object();
 public void remove(Object o) {
  assert o != null;
  int i = (o.hashCode()& 0x7FFFFFFF) % arr.length;
  int cnt = 0;
  while (arr[i] != null && !o.equals(arr[i]) && cnt != arr.length) {
   i = (i + 1) % arr.length; 
   cnt++;
  }
  if (o.equals(arr[i])) arr[i] = sentinel;
 }
 public boolean contains(Object o) {
  assert o != null;
  int i = (o.hashCode()& 0x7FFFFFFF) % arr.length;
  int cnt = 0;
  while (arr[i] != null && !o.equals(arr[i]) && cnt != arr.length) {
   i = (i + 1) % arr.length;
   cnt++;
  }
  return cnt != arr.length && arr[i] != null;
 }
}
```

## Performance improvements

Using modulo in the probe loop causes the application to pretty slow due to the multiple divisions that need to be done. So instead of i = (i + step) % size; we can use the following

- If the table size is a power of 2 we can use a bitmask i = (i + step) & (size - 1);
- Instead of a modulo we can detect an overflow manually i = i + step; if (i >= size) i -= size;
- Because a comparison of i with 0 is faster then with a given number we can probe backwards and check for an underflow i = i - step; if (i < 0) i += size;

## Load factor

The amount of collisions increase with the amount of elements in the table. To be able to make statments on the status of the table we have the so called load factor which is defined as

$$\lambda = \frac{\text{Number of element in table}}{\text{table size}}$$

If we know the amount of elements to be inserted we can calculate a size for the table depending on the desired load factor.

We can also create a new table and copy the elements over to the new table if a certain threshold load factor has been reached. Importantly here is that all the indices have to be recalculated. We kill this process **rehashing**.

When searching for an element in a separate chained list we expect to find it after half the load factor so O(1+L/2). For a search to be unsuccessful we waste O(1+L) because we have to go through the entire list.

### Separate chaining

There is no upper limit for the load factor as the chains can be of any length. The average length of the chains is the load factor. To be efficient the load factor should be $\lambda < 1$.

### Open addressing

The load factor here is limited due to the system to $\lambda \leq 1$. As long as $\lambda < 1$ there is still a free space in the table. For optimal performance it is recommended to have for linear probing a load factor of $\lambda < 0.75$ for double hashing $\lambda < 0.9$
