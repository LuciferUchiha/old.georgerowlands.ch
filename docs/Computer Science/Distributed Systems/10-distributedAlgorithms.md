---
title: Distributed Algorithms
description: Distributed Algorithms
tags: [distributed systems, collections, data structures, algorithms, hashing, hash tables]
---

## Distributed Euclidean Algorithm

The euclidean algorithm is used to find the GCD of two numbers. This can be done locally but also using a distributed algorithm:

```java
int gcd(int a, int b) {
    assert a >= 0 && b >= 0;
    while(b != 0) {
        int tmp = b;
        b = a % b;
        a = tmp;
    }
    return a;
}
```

In the distributed algorithm each node has a reference to its left and right neighbor. The node first informs its neighbors of its own value. If a received number is smaller than its value then a node adjusts its value and shares its new value with its neighbors.

```java
public class GcdActor extends AbstractActor {
    private int n;
    private final Set<ActorRef> neighbours = new HashSet<>();
    public GcdActor(int n) { 
        this.n = n;
        System.out.printf("%s Initial Value: %d%n", getSelf(), n);
    }
    @Override
    public Receive createReceive() {
        return receiveBuilder()
            .match(ActorRef.class, actor -> {
                neighbours.add(actor);
                if(neighbours.size() == 2) {
                    neighbours.forEach(a -> a.tell(n, getSelf()));
                }})
            .match(Integer.class, value -> {
                if(value < n) {
                    n = ((n-1) % value) + 1;
                    neighbours.forEach(a -> a.tell(n, getSelf()));
                    System.out.printf("%s Current Value: %d%n",
                    getSelf(), n);
                }})
            .matchAny(msg -> unhandled(msg))
            .build();
    }       
}
public static void main(String[] args) throws Exception {
    ActorSystem as = ActorSystem.create();
    List<Integer> values = List.of(108, 76, 12, 60, 36);
    List<ActorRef> actors = IntStream.range(0, values.size())
        .mapToObj(n -> as.actorOf(Props.create(GcdActor.class, values.get(n)), "GCD"+n))
        .collect(Collectors.toList());
    final int size = actors.size();
    for(int i = 0; i < size; i++) {
        actors.get(i).tell(actors.get((i+1) % size), null);
        actors.get(i).tell(actors.get((size+i-1) % size), null);
    }
}
```

## Distributed Echo Algorithm

The idea of the echo algorithm is to traverse an arbitrary graph by implicitly building a spanning tree. The algorithm is defined as followed:

There are two types of messages: Explorer messages, which color the nodes red, and Echo messages, which color the nodes green. Before the algorithm is executed, all nodes are white.

1. An initiator turns red and sends an explorer to all of his neighbors.
2. A white node that receives an explorer turns red
3. A node that has received an explorer or an echo over all of its edges turns green
4. A non-initiator node that has received an explorer or an echo over all of its edges sends an echo over the edge over which it received the first explorer
5. The algorithm terminates when the initiator turns green

The edges over which the echo messages have run result in a spanning tree. For a Graph with $E$ edges this algorithm uses 2 * E messages.

```java
public class EchoNode extends AbstractActor {
    private final Set < ActorRef > neighbours = new HashSet < > ();
    private ActorRef parent;
    private int counter = 0; // number of received tokens
    @Override
    public Receive createReceive() {
        return receiveBuilder()
            .match(ActorRef.class, actor -> neighbours.add(actor))
            .match(Start.class, value -> {
                parent = getSender(); // initiator
                neighbours.forEach(a -> a.tell(new Token(), getSelf()));
            })
            .match(Token.class, msg -> {
                counter++;
                if (parent == null) { // variant: if(counter == 1)
                    parent = getSender();
                    System.out.printf("Actor %s got informed by %s%n",
                        getSelf(), getSender());
                    neighbours.stream()
                        .filter(a -> a != parent)
                        .forEach(a -> a.tell(msg, getSelf()));
                }
                if (counter == neighbours.size()) {
                    parent.tell(msg, getSelf());
                }
            })
            .matchAny(msg -> unhandled(msg))
            .build();
    }
    public static void main(String[] args) throws Exception {
        ActorSystem as = ActorSystem.create();
        List < ActorRef > actors = IntStream.range(0, 8)
            .mapToObj(n -> as.actorOf(Props.create(EchoNode.class), "Node" + n))
            .collect(Collectors.toList());
        addEdge(actors, 0, 1);
        ...
        addEdge(actors, 7, 5);
        Timeout timeout = new Timeout(5, TimeUnit.SECONDS);
        Future < Object > f = Patterns.ask(actors.get(0), new Start(), timeout);
        Object result = Await.result(f, timeout.duration());
        System.out.println(result);
        as.terminate();
    }
}
```

## Distributed Election Algorithm

The idea of the election algorithm is to elect a leader among equal nodes for example to coordiante concurrency etc. For the alogrithm to work we need to assume that each node has a unique identifier that can be ordered. The node with the highest order is then the leader. At the end each node should know who the leader is.

Initially the value in each node is negative infinity.
Every node can start the election as long as it is not yet involved in an election, i.e. value is neg inf.
Upon start, a node stores its id number in the value field and sends this value to the next node.
If a message arrives, its value is compared with the stored one. If it is greater than the stored value, the value is updated and the message is
forwarded. If it is smaller, then the message is discarded.
A node is leader if it receives its own message. The leader then may inform the other nodes about the election / termination of
the algorithm.

```java
public class ElectionNode extends AbstractActor {
    private ActorRef next; // ring references
    private ActorRef initiator; // initiator of the election
    private final int id; // id of this actor
    private int master = Integer.MIN_VALUE; // id of elected node
    public ElectionNode(int id) {
        this.id = id;
    }
    @Override
    public Receive createReceive() {
        return receiveBuilder()
            .match(ActorRef.class, actor -> next = actor)
            .match(Start.class, value -> {
                if (master == Integer.MIN_VALUE) {
                    initiator = getSender();
                    master = id;
                    next.tell(new Token(master), getSelf());
                }
            })
            .match(Token.class, token -> {
                if (token.value > master) {
                    master = token.value;
                    next.tell(token, getSelf());
                } else if (token.value == id) {
                    System.out.println("hurray, I got elected " + getSelf());
                    next.tell(new Reset(id), getSelf());
                }
            })
            .match(Reset.class, token -> {
                master = Integer.MIN_VALUE;
                if (token.value == id) {
                    initiator.tell("" + id, getSelf());
                } else {
                    next.tell(token, getSelf());
                }
            })
            .matchAny(msg -> unhandled(msg))
            .build();
    }
}
```

## Distributed Hash Tables

### Chord Algorithm
