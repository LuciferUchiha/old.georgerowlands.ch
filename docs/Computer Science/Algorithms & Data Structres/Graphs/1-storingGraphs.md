---
title: Storing Graphs
description: Storing Graphs
tags: [java, collections, data structures, algorithms, graphs, adjacency matrix, adjacency list, edge table]
---

## Adjacency matrix

When storing a graph in an adjacency matrix we have a matrix that is $n \times n$, with $n$ being the number of vertices in the graph.

So for a weighted graph we use `int[][] G = new int[n][n]` where the value stored at `G[x][y]` corresponds to the weight from vertex $x$ (row) to vertex $y$ (col). If there is no edge between 2 vertices then there are a few ways of storing this. Either we set the value as 0 or `Integer.MAX_VALUE` or we use an Integer array and set it to null.

If the graph is unweighted we can either use the same 2D int array and just store all edge weights as 1 or we can use a 2D boolean array which interestingly does use less space in java. A normal boolean variable uses 32 bits in java just like an int however in an array each boolean value only takes up 8 bits.

If the graph is undirected then $G = G^T$ so if there is an edge between the vertices $x$ and $y$ the value needs to be set at `[x][y] and [y][x]`.

The biggest problem with storing graphs this way is that $O(n^2)$ memory is needed and we waste a lot of space as in most cases there are only a few edges and we don't need to be able to store every possible combination.

![adjacencyMatrix](/img/programming/adjacencyMatrix.png)

```java
public class UndirectedUnweightedGraph {
 private final boolean[][] adjMatrix;
 public final int n;
 public GraphI(int numNodes) {
  if (numNodes < 1) throw new IllegalArgumentException();
  this.adjMatrix = new boolean[numNodes][numNodes];
  this.n = numNodes;
 }
 public boolean addEdge(int u, int v){
  if(0<= u && u<n && 0 <= v && v<n){
   if(adjMatrix[u][v]) return false;
   adjMatrix[u][v] = adjMatrix[v][u] = true;
   return true;
  }
  throw new IndexOutOfBoundsException();
 } 
}
```

## Edge table

An other easy but less common alternative to the adjacency matrix is a list or table of edges. With edges having the following structure

```java
class Edge {
 int from, to, weight;
}
```

If it is an unweighted graph the weight can just be omitted and if it is an undirected graph you can either have two entries for each edge or handle from and to the same way.

The nice things about this solution is that it only uses memory of $O(m)\,, m= \text{Number of edges}$

## Adjacency list

In an adjacency list we store all edges that are connected to a certain vertex. We then have a list of adjacency lists for the entire graph. And adjacency list can be just a simple array but is also often seen as a linked list due to being dynamic. If the graph is undirected an edge appears in both adjacency lists. This structure only uses $O(n+m)$ memory with $n$ being the amount of vertices and $m$ the amount of edges.

```java
public class UnweightedGraph<K> {
 private static class Vertex<K> {
  K data;
  int indegree = 0, deg;
  boolean visited;
  List<Vertex<K>> adjList = new LinkedList<Vertex<K>>();

  Vertex(K value) {
   data = value;
  }

  boolean addEdgeTo(Vertex<K> to) {
   return (adjList.contains(to)) ? false : adjList.add(to);
  }
 }
 private Map<K, Vertex<K>> vertices;
 private int nofEdges = 0;

 public AdjListGraph() { // default constructor
  this(false);
 }

 public AdjListGraph(boolean directed) {
  super(directed);
  vertices = new HashMap<K, Vertex<K>>();
 }

 public AdjListGraph(AdjListGraph<K> orig) { // copy constructor
  this(orig.isDirected());
  for (K k : orig.vertices.keySet()) {
   addVertex(k);
  }
  for (Vertex<K> v : orig.vertices.values()) {
   for (Vertex<K> w : v.adjList) {
    addEdge(v.data, w.data);
   }
  }
 }

 public boolean addVertex(K vertex) {
  if (vertex != null && !vertices.containsKey(vertex)) {
   vertices.put(vertex, new Vertex<K>(vertex));
   return true;
  } else {
   return false;
  }
 }

 public boolean addEdge(K from, K to) {
  Vertex<K> vf = vertices.get(from);
  Vertex<K> vt = vertices.get(to);
  if (vf != null && vt != null && vf.addEdgeTo(vt)) {
   vt.indegree++;
   if (!isDirected()) {
    vt.addEdgeTo(vf);
    vf.indegree++;
   }
   nofEdges++;
   return true;
  } else {
   return false;
  }
 }
}
```
