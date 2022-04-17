---
title: GraphQL
description: TO BE DONEEEEE
tags: [graphql]
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

``` title="GraphQL Query"
POST /graphql HTTP/1.1
    query {
        posts(limit: 10, offset: 0) {
        id
        title
        content
        author {
            name,
            avatar
        }
    reactions(limit: 10) { icon }
    }
}
```

``` title="GraphQL Respone"
{ "data" : {
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
    ]
}}
```

## Schema language

## Query language

## Using with Java

## GraphQL vs REST
