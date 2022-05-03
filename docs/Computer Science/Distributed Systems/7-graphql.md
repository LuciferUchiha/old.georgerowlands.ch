---
title: GraphQL
description: GraphQL
tags: [distributed systems, graphql]
---

## Problems with REST

REST can be a very quick and easy way to setup an API but it does have some problems. When Roy Fielding released his PHD on REST
it didn't define a standard it merely explained the concept. This means it can be difficult to design a good system and leaves a
lot up for interpretation for example the difference between the two methods PUT and PATCH.

REST works best for APIs that only need CRUD operations but if some model specific operation has to be done then the POST is most
commonly used/misused.

A further downside is you have to add documentation yourself, it is not self documenting unlike other API architectures. This is
then most commonly done using OpenAPI with Swagger.

However REST's major problems are under or overfetching. Imagine you have the following API for a news agency

| Method | Endpoint        | Description             |
| ------ | --------------- | ----------------------- |
| GET    | /posts?limit=10 | Query 10 latests posts  |
| POST   | /posts          | Create a new post       |
| GET    | /posts/{id}     | Query a particular post |
| DELETE | /posts/{id}     | Delete a post           |
| PUT    | /posts/{id}     | Update a post           |
| GET    | /users?q=…      | Search for users        |
| POST   | /users          | Create a new user       |
| GET    | /users/{id}     | Get a particular user   |
| DELETE | /users/{id}     | Delete a user           |
| PUT    | /users/{id}     | Update a user           |

and wanted to show the 10 latest posts and the authors name and avatar next to the post. You would then have to make 11 separate
requests as you would first make one for the 10 latest posts and then using the author ids you get in that response get the names and avatars.
This would be a case of underfetching. An example of overfetching would be if in the response containing the posts we would also get the like
count for each post but not actually show it and therefore are getting more data then we actually need.

A possible solution to this problem would be to create a special endpoint like `/newsfeed` however this would make the frontend and backend
tightly coupled.

## Introduction

GraphQL is just like REST an API specification that was developed and open-soured by facebook in 2015.

The core idea of GraphQL is to solve the above mentioned problems, especially the documentation and over/underfetching issues. It does this by shaping the queries for the data just like the data that it will return, this is called declarative data fetching. This allows GraphQL to be much more flexible and efficient in comparison to REST.

Unlike REST that exposes lots of endpoints, a GraphQL API only exposes one which responds to queries, often `/graphql`. These queries that are sent to a singular endpoint with a POST describe what to do or how the data should look. For the above example the request and response could look something like this

```graphql title="GraphQL Query"
query {
    posts(limit: 10, offset: 0) {
        id
        title
        content
        author {
            name,
            avatar
        }
    }
}
```

```graphql title="GraphQL Respone"
{ 
  "data" : {
    "posts" : [
        {
            "id" : 1,
            "title": "BaselOne",
            "content": "Great Talks!",
            "author" : {
                "name": "Dominik Berger",
                "avatar": "/avatars/10.png"
            },

        },
        … 9 other posts
    ]}
}
```

## Schema Definition language - SDL

The SDL is used to define the data schema behind a GraphQL API. It includes some syntax and primitive types that can be used to define custom types.

### Types

#### Scalars

- Int (32 bit)
- Float (double IEEE754)
- String (UTF 8 character sequence)
- Boolean
- ID (unique identifier, serialized as a string)

#### Enums

Just like in many other languages you can define enums which are restricted to a particular set of values.

```graphql
enum Episode {
  NEWHOPE
  EMPIRE
  JEDI
}
```

#### Objects

Object types represent a kind of object you can fetch from your service, and what fields it has.

By adding an `!` at the end you can mark any attribute to be required/non-null. All scalars or object types can also be used to create lists/arrays by adding squared brackets around the attribute. You can also establish relations between types

```graphql
type Book {
    id: ID!
    title: String
    authors: Author!
}
type Author {
    id: ID!
    name: String
    books: [Book!]!
}
```

##### Arguments

Because fields of objects are conceptually just functions that return values they can also have arguments. These arguments are name-type pairs and can be required or optional. They can also define a default value which in the case below would be `METER`.

```graphql
type Starship {
  id: ID!
  name: String!
  length(unit: LengthUnit = METER): Float
}

type Query {
  rollDice(numDice: Int!, numSides: Int): [Int]
}
```

#### Interfaces

Just like in many other languages you can define interfaces. An Interface is an abstract type that includes a certain set of fields that a type must include to implement it. A type can implement multiple interfaces.

```graphql
interface Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
}
type Human implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  starships: [Starship]
  totalCredits: Int
}

type Droid implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  primaryFunction: String
}
```

You can see that both types have all of the fields from the interface, but also have their own.

#### Unions

Unions can represent one object from a list of object types, but provide no guarantee of common fields like interfaces.

```graphql
union SearchResult = Human | Droid | Starship
```

Wherever a SearchResult is used we might get a Human, a Droid, or a Starship. Important to note is that members of a union type need to be concrete objects, you can't create a union type out of interfaces or other unions.

### Schemas

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
TODOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

## Query language

The query language is used to interact with the API. A query which describes the structure of the result is sent and a response in form of a JSON document is sent back.

A query consists of one or more operations and one or more patters which are matched against the big graph containing all the data to describe the data returned.

Operations:

- query, a read-only fetch
- mutation, a write followed by a fetch
- subscription, a long lasting request most commonly used for notifications

By default a request is a query operation so it can be omitted.

### Arguments

When working with a REST API you can only pass a single set of arguments - the query parameters and URL segments in your request. But in GraphQL every field can get its own arguments which can prevent having to make multiple API fetches. You can also pass arguments into scalar fields for data transformations on the server instead of on every client.

```graphql title="GraphQL Query"
query {
    human(id: "1000") {
        name
        height(unit: FOOT)
    }
}
```

```graphql title="GraphQL Response"
{
    "data": {
        "human": {
            "name": "Luke Skywalker",
            "height": 5.6430448
        }
    }
}
```

### Aliases

With aliases you can rename the result of a field to anything you want. This also allows you to query the same field multiple times but with different arguments.

```graphql title="GraphQL Query"
{
    empireHero: hero(episode: EMPIRE) {
        name
    }
    jediHero: hero(episode: JEDI) {
        name
    }
}
```

```graphql title="GraphQL Response"
{
    "data": {
        "empireHero": {
            "name": "Luke Skywalker"
        },
        "jediHero": {
            "name": "R2-D2"
        }
    }
}
```

### Operation names and variables

Although you can omit writing query in production apps it's useful to write it to make your code less ambiguous. You can also add an operation name which is only required in multi-operation documents, but it is encouraged because it is very helpful for documentation, debugging and server-side logging.

Arguments for queries should be dynamic depending on the input which is what variables can be used for, just like in other programming languages this avoid redundancy, magic words/numbers and hard coding. Variables can be defined with `$variableName: value`. Just with fragments you can also define a default value.

```graphql title="GraphQL Query"
query HeroNameAndFriends($episode: Episode = JEDI) {
    hero(episode: $episode) {
        name
        friends {
            name
        }
    }
}
```

```graphql title="GraphQL Response"
{
    "data": {
        "hero": {
            "name": "R2-D2",
            "friends": [
                { "name": "Luke Skywalker" },
                { "name": "Han Solo" },
                { "name": "Leia Organa" }
            ]
        }
    }
}
```

### Fragments

Fragments are very similar to views in SQL, they allow you to create reusable units to save on repeatedly typing the same query. Fragments let you construct sets of fields, and then include them in queries where you need to. For example if we wanted to create a page to compare two heroes side by side, along with their friends you would need to repeat the fields at least once. In this case a Fragment could be used to avoid duplication and allow it to also be used somewhere else if necessary.

```graphql title="GraphQL Query"
{
    leftComparison: hero(episode: EMPIRE) {
        ...comparisonFields
    }
    rightComparison: hero(episode: JEDI) {
        ...comparisonFields
    }
}

fragment comparisonFields on Character {
    name
    appearsIn
    friends {
        name
    }
}
```

```graphql title="GraphQL Response"
{
    "data": {
        "leftComparison": {
            "name": "Luke Skywalker",
            "appearsIn": [
                "NEWHOPE",
                ...more
            ],
            "friends": [
                { "name": "Han Solo" },
                ...more
            ]
        },
        "rightComparison": {
            "name": "R2-D2",
            "appearsIn": [
                "NEWHOPE",
                ...more
            ],
            "friends": [
                { "name": "Han Solo" },
                ...more
            ]
        }
    }
}
```

#### Inline Fragments

If you are querying a field that returns an interface or a union, you will need inline fragments to access data on the underlying concrete type which work similiar to a switch case with casts to the type.

```graphql title="GraphQL Query"
query HeroForEpisode($ep: Episode!) {
    hero(episode: $ep) {
        name
        ... on Droid {
            primaryFunction
        }
        ... on Human {
            height
        }
    }
}
```

```graphql title="GraphQL Response"
{
    "data": {
        "hero": {
            "name": "R2-D2",
            "primaryFunction": "Astromech"
        }
    }
}
```

### Mutations

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
TODOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

### Subscriptions

Subscriptions are basically the observer pattern. They are used to get data from the server when a certain event is triggered. The request specifies the data to be sent from the server to the client when the event is triggered however GraphQL does not define any technology of how this should be done this is open to implementation. Typically
they are however implemented using WebSockets and the the graphql-ws subprotocol. In the majority of cases you shouldn't use subscriptions to stay up to date with your backend. Instead, you should poll intermittently with queries, or re-execute queries when a user performs a relevant action. However you should use subscriptions for small, incremental changes to large objects like just a like counter or when you need real-time updates like in a chat app.

### Introspection

Introspection is useful to ask a GraphQL schema for information about what queries and types it supports. Keywords for introspection start with double underscore `__` for example `__Schema, __Type, __TypeKind, __Field, __InputValue, __EnumValue, __Directive`.

```graphql title="GraphQL Query"
{
    __type(name: "Droid") {
        name
        kind
    }
}
```

```graphql title="GraphQL Response"
{
    "data": {
        "__type": {
            "name": "Droid",
            "kind": "OBJECT"
        }
    }
}
```

## Using with Java

You can find the Java implementation [here](https://github.com/graphql-java/graphql-java) and the matching [documentation](https://www.graphql-java.com/documentation/getting-started). When working with GraphQL in Java there are lots options with the most common one being spring boot. You can create your models with decorator annotations just like many other things when working with spring.

```java
@Data
@AllArgsConstructor
public class Customer {
    private String id;
    private String name;
}
@Data
@AllArgsConstructor
public class Product {
    private String id;
    private String title;
    private String description;
    private String imageUrl;
}
@Data
@AllArgsConstructor
public class Rating {
    private String id;
    private Product product;
    private Customer customer;
    private int score;
    private String comment;
}
```

The common pattern is then to have a Repository??? and resolvers???

## Tools

Some common tools to use when working with GraphQL:

- GraphiQL, a graphical interactive in-browser GraphQL IDE
- Voyager, Represent any GraphQL Schema as an interactive graph
- Altair, feature rich GraphQL client

## Disadvantages

Because GraphQL uses only POST requests there is no automatic caching system. And because the typical response to all requests is 200 OK it's also very hard to handle errors.
