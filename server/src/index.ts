import express from "express";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";

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

app.listen(port, () => {
    console.log( `server started at http://localhost:${ port }` );
    console.log( `GraphQL api at /graphql`);
} );
