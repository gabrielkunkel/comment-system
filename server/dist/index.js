"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const graphql_1 = require("graphql");
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
const app = express_1.default();
const port = 8080;
app.get("/", (req, res) => {
    res.send("Hello world! Hello mars!");
});
app.use("/graphql", express_graphql_1.default({
    graphiql: true,
    rootValue,
    schema,
}));
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
    console.log(`GraphQL api at /graphql`);
});
//# sourceMappingURL=index.js.map