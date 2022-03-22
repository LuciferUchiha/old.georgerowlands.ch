# Bag and Set

## Bag

Can contain an element multiple times. Depending on implementation order is not necessarily given. A bag is often also called a Multiset. Common Operations on a bag are add(), remove(), search().

## Set

An element is either in the set or not, which means it only contains unique values. Same as a mathematical set or in German "Menge".

## Time Complexities with arrays

When implementing a set and bag there is also the question of whether the data should be sorted or not. Depending on the answer the time complexities will be different and the implementation changes.

| Operation        | UnsortedBag                          | SortedBag                                                 | UnsortedSet                              | SortedSet                                                |
| ---------------- | ------------------------------------ | --------------------------------------------------------- | ---------------------------------------- | -------------------------------------------------------- |
| add(E e)         | **O(1)** <br />no search, or shift   | O(n) <br /> search O(log n) + shift right O(n) worst case | O(n)<br /> check O(n) + add O(1)         | O(n) <br />search O(log n) + shift right O(n) worst case |
| search(Object o) | O(n) linear search                   | **O(log n)** binary search                                | O(n) linear search                       | **O(log n)** binary search                               |
| remove(Object o) | O(n) <br />search O(n) + remove O(1) | O(n) <br /> search O(log n) + shift left O(n) worst case  | O(n) <br />search O(n) + remove O(1)     | O(n) <br /> search O(log n) + shift left O(n) worst case |
| Best use case    | When adding a lot                    | When searching a lot                                      | When set is needed but don't search a lot | When set is needed and a lot of searching                                                         |

When implementing the data structures you can either implement your own binary search or you can use java.util.Arrays.binarysearch(a, from, to, key) which returns the index of the key, if it is contained otherwise, *(-(insertion point) - 1)* with insertion point being the point where the key would be inserted, i.e the index of the first element greater than the key.

## Java Collections

Collections are containers holding elements of the same type. Depending on the use cases there are lots of different data structures to choose from.
![javaCollections](/img/programming/javaCollections.png)
