"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const graphqlHTTP = require("express-graphql");
const graphql_1 = require("graphql");
const mongoose = require("mongoose");
const comments_1 = __importDefault(require("./comments"));
mongoose.connect("mongodb://localhost:27017/graphqlcomments", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// create schema for graphql
const schema = graphql_1.buildSchema(`
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
app.get("/", (req, res) => {
    res.send("Hello world! Hello mars!");
});
app.use("/graphql", graphqlHTTP({
    graphiql: true,
    rootValue,
    schema,
}));
app.use("/comments", comments_1.default);
if (!module.parent) {
    app.listen(port, () => {
        console.log(`server started at http://localhost:${port}`);
    });
}
exports.default = app;
//# sourceMappingURL=index.js.map