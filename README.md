# Comment System

To add and remove comments on media. Build created from scratch. 

## JavaScript Technologies I Will Use:

* TypeScript
* Node.js w/Express
* MongoDB w/Mongoose
* GraphQL
* Mocha w/Supertest

### Tech Set-Up
- [X] Server compiles to TypeScript.
- [X] Server runs using Nodemon.
- [X] Using *concurrently*, TypeScript --watch and Nodemon runs at the same time, successfully compiling TypeScript and running server.
- [X] Test Hello World GraphQl implementation functional.
- [X] Add testing suite with working /graphql example using mocha, chai, and supertest.
- [X] Testing suite watches all src and test files and updates automatically.
- [X] Connect to local MongoDB with Mongoose.
- [X] Get basic passing test for GraphQL

### Create Mongoose/GraphQL API using buildSchema
#### Get passing test on...
- [X] A new comment will be added to the database and returned.
- [X] If no _id is included in the new comment record, a uuid will be created for it.
- [X] A single comment can be retrieved by _id.
- [X] All comments may be requested from the database.

### Create Mongoose/GraphQL API using GraphQLSchema
#### Per [this advice](https://stackoverflow.com/a/53987189/4339638), get passing test on...
- [X] A new comment will be added to the database and returned.
- [X] If no _id is included in the new comment record, a uuid will be created for it.
- [X] A single comment can be retrieved by _id.
- [X] All comments may be requested from the database.