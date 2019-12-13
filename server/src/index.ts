import express = require("express");
import graphqlHTTP = require("express-graphql");
import { buildSchema } from "graphql";
import mongoose = require("mongoose");
import comments from "./comments";

mongoose.connect("mongodb://localhost:27017/graphqlcomments", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// create schema for graphql
const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

// create root for graphql
const rootValue = {
    hello: () => "Hello world!",
};

const app = express();
const port = 8080;

app.get( "/", ( req, res ): void => {
    res.send( "Hello world! Hello mars!" );
} );

app.use("/graphql", graphqlHTTP({
    graphiql: true,
    rootValue,
    schema,
}));

app.use("/comments", comments);

if (!module.parent) {
    app.listen(port, () => {
        console.log( `server started at http://localhost:${ port }` );
    });
}

export default app;
