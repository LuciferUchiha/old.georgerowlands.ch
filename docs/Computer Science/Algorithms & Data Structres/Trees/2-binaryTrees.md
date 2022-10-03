---
title: Binary Trees
tags: [java, collections, data structures, algorithms, trees, binary tree, binary search tree, avl tree, balanced trees]
---

A binary tree is a tree with the order of 2. Meaning that a node is either a leaf or has left and/or right child.

![binaryTree](/img/programming/binaryTree.png)

By adding empty leaves we can make sure the binary tree is always filled which can make certain operations and algorithms easier. We add the empty leaves by first adding 2 empty leaves to all leaves which make the leaves to inner nodes. Then all inner nodes that only have one child receive an empty leaf.

![alternativeBinaryTree](/img/programming/alternativeBinaryTree.png)

## Traversal orders

There are multiple ways to traverse a tree each one giving a different result.

### Pre-order, NLR

In this order a node visited before its left and right subtree is traversed.

1. Visit the current node.
2. Recursively traverse the current node's left subtree.
3. Recursively traverse the current node's right subtree.

![preOrderTree](/img/programming/preOrderTree.png)

### Post-order, LRN

In this order a node is visited after its left and right subtree has been traversed.

1. Recursively traverse the current node's left subtree.
2. Recursively traverse the current node's right subtree.
3. Visit the current node.

![postOrderTree](/img/programming/postOrderTree.png)

### In-order, LNR

In this order a node is visited in between the traversal of its left and right subtree.

1. Recursively traverse the current node's left subtree.
2. Visit the current node.
3. Recursively traverse the current node's right subtree.

![inOrderTree](/img/programming/inOrderTree.png)

## Binary search tree

A binary search tree is a binary tree where each node has a key. *key(v)=Key of the node v*. The important thing here is that in the left subtree of a node there are only nodes with keys that are smaller then the key of the node. In the right subtree accordingly only nodes with a key that are the same or larger.

Interestingly when traversing the tree in-order we can see that the keys ascend.

![inOrderBinarySearchTree](/img/programming/inOrderBinarySearchTree.png)

### Operations

#### Insert

When inserting a node you need to find the ideal place for insertion. This is started by comparing it with the root and seeing whether it belongs in the left or right half. This is then repeated recursively repeated until the insertion point is found.

#### Search

When searching for a specific key we follow a similar process as with when inserting. By comparing the key with the roots key and then carrying on down the tree. If we don't just want the first node but all nodes with this key, once the first node is found we carry on down the right subtree until it is empty.

#### Remove

When removing a node we distinguish between 3 different cases.

##### Leaf

We search for the node and then simply remove it, nothing complicated.

![binarySearchTreeRemoveLeaf](/img/programming/binarySearchTreeRemoveLeaf.png)

##### Node with 1 child

We search for the node to be removed and remove it. The child of the removed node then takes its place. Also nothing complicated.

![binarySearchTreeRemove1Child](/img/programming/binarySearchTreeRemove1Child.png)

##### Node with 2 children

We search for the node to be removed. We then look for the symmetrical (inorder) successor, which is the node in the right subtree that is the furthest left. We then replace the to be removed node with the symmetrical successor. Lastly we delete the symmetrical successor at its original position which is either case 1 or 2.

![binarySearchTreeRemove2Children](/img/programming/binarySearchTreeRemove2Children.png)

```java
private Node<K, E> remove(Node<K,E> node, K key){
 if (node == null) {
  return null;
 }
 else {
  int c = key.compareTo(node.key);
  if (c < 0) {
   node.left = remove(node.left, key);
  }
  else if (c > 0) {
   node.right = remove(node.right, key);
  }
  else {
   if (node.left == null) {
    node = node.right;
    nodeCount--;
   }
   else if (node.right == null) {
    node = node.left;
    nodeCount--;
   }
   else {
    Node<K, E> succ = symSucc(node.right);
    succ.right = remove(node.right, succ.key);
    succ.left = node.left;
    node = succ;
   }
  }
  return node;
 }
}

private Node<K, E> symSucc(Node<K,E> node){
 Node<K, E> succ = node;
 while (succ.left != null) {
  succ = succ.left;
 }
 return succ;
}
```

### Time complexities

The time complexities of the operations depend on the height of the tree. In the worst case all operations take O(n), when the tree has become like a list. In the best case all operations O(log n), this is when the tree is complete(excluding the last level). From this we can see it is important to keep the height as small as possible to have the best time complexities.

## AVL Tree

The AVL Tree, named after inventors **A**delson-**V**elsky and **L**andis is a self balancing binary search tree. For a tree to be **balanced** the heights of a nodes subtree can not differ more then 1.

In other words the balance factor of a node is the difference between the height of the nodes left and right subtree. *bal(v)= height of right subtree of v - height of left subtree of v*. For a node to be balanced its balance factor has to be in {-1, 0, 1}, otherwise it is unbalanced. This then leads to for a tree to be balanced all of its nodes must be balanced.

### Operations

All of the operations, insert, search and remove work the same as with a binary tree. However now after inserting or deleting we have to recalculate the balance factors of all of the nodes from the inserted/removed node. Important when a node was removed and replaced with its symmetrical successor we have to start at the lowest removed node. If after recalculating the balance factors the tree is no longer balanced we have to perform rebalancing operations till the tree is balanced again.

There are 3 situations when a tree is unbalanced which then lead to different rebalancing operations.

1. bal(p) and bal(v) have the same sign.
2. bal(v) = 0
3. bal(p) and bal(v) have deafferent signs.

![unbalancedTrees](/img/programming/unbalancedTrees.png)

#### Simple Rotations

Situation 1 and 2 can be resolved with a simple rotation. Depending on which subtree has the higher absolute balance factor. If the left subtree is higher then the right subtree we perform a  **right rotation**. The other way around we perform a **left rotation**.

![avlRightRotation](/img/programming/avlRightRotation.png)
![avlLeftRotation](/img/programming/avlLeftRotation.png)

#### Double Rotations

We can't resolve situation 3 with a simple rotation we need to do a so called double rotation. Here again we have 2 options depending which subtree is higher. either a **right-left double rotation** or a **left-right double rotation**.

![avlRightLeftRotation](/img/programming/avlRightLeftRotation.png)
![avlLeftRightRotation](/img/programming/avlLeftRightRotation.png)

## Implementation

We can notice that we often need to know the balance factors of a node. This can be calculated every time using the heights however this is very bad for performance instead we should store the balance factors with the nodes and update them when needed.

### Insert

If we insert a new node *v* and its parent is *p* then we have the following situations

![avlUpinSituations](/img/programming/avlUpinSituations.png)

If the height of *p* doesn't change we just need to update the balance factor of *p* and are done. However if the height of *p* changes. So if the balance factor of *p* changes from 0 to +/-1 then we have to recursively update the balance factor of its parent *pp*. For this we use the so called upin(p) method.

#### Upin Case 1

If the height of *pp* doesn't change so the balance factor of *pp* changes from 0 to +/-1 we are done.

![avlUpinFall1](/img/programming/avlUpinFall1.png)

#### Upin Case 2

If the height of *pp* changes but the node stays balanced so the balance factor of *pp* changes from 0 to +/-1 we have to recursively update the balance factor of its parent with upin(pp).

#### Upin Case 3

If the height of *pp* changes and the node is no longer balanced so the balance factor of *pp* changes from +/-1 to +/- 2 we have to perform at the max 1 rotation.

### Remove

Here we use upout to update the balance factors however it can happen that more then 1 rotation is needed on the way to the root.
