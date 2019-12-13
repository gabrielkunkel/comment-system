"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphqlHTTP = require("express-graphql");
const graphql_1 = require("graphql");
// mongoose schema
// const CommentSchema = new Schema({
//     _id: String,
//     author: String,
//     text: String
// }, {
//     timestamps: true
// });
// const Comment = models.Comment || model("Comment", CommentSchema);
// gaphql schema
const schema = graphql_1.buildSchema(`
    input CommentInput {
        _id: String
        author: String
        text: String
    }
    type Comment {
        _id: String
        author: String
        text: String
    }
    type Query {
        getComment(_id: String): Comment
    }
    type Mutation {
        createOrUpdateComment(input: CommentInput): Comment
    }
`);
// rootValue
const root = {
    createOrUpdateComment: ({ input }) => {
        // let commentToProcess;
        // if (!input._id) {
        //     commentToProcess = Object.assign({}, { _id: uuidv4() }, input);
        // } else {
        //     commentToProcess = input;
        // }
        // console.log("commentToProcess: ", commentToProcess);
        // Comment.findOneAndUpdate(
        //     { _id: commentToProcess._id},
        //     commentToProcess,
        //     // @ts-ignore
        //     { new: true, useFindAndModify: false },
        //     (err: any, doc: IComment) => {
        //         return doc;
        //     });
        return {
            _id: "here is _id",
            author: input.author,
            text: input.text
        };
    },
    getComment: ({ _id }) => {
        return {
            _id,
            author: "random author",
            text: "random text"
        };
    }
};
exports.default = graphqlHTTP({
    graphiql: true,
    rootValue: root,
    schema
});
//# sourceMappingURL=comments.js.map