import graphqlHTTP = require("express-graphql");
import { buildSchema } from "graphql";
import uuidv4 = require("uuid/v4");
import { Comment, IComment } from "./commentModel";

// gaphql schema
const schema = buildSchema(`
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
        comment(_id: String): [Comment]
    }
    type Mutation {
        createOrUpdateComment(input: CommentInput): Comment
    }
`);

// rootValue
const root = {
    createOrUpdateComment: ({input}: { input: IComment }) => {
        let commentToProcess: IComment;
        if (!input._id) {
            commentToProcess = Object.assign({}, { _id: uuidv4() }, input);
        } else {
            commentToProcess = input;
        }

        return Comment.findOneAndUpdate(
            { _id: commentToProcess._id},
            commentToProcess,
            // @ts-ignore
            { new: true, useFindAndModify: false, upsert: true }).exec();
    },
    comment: ({_id}: {_id: string}) => {
        if (_id) {
            return Comment.findOne({_id}).exec().then((response) => {
                return [response];
            });
        } else {
            return Comment.find({}).exec().then((response) => {
                return response;
            });
        }
    }

};

export default graphqlHTTP({
    graphiql: true,
    rootValue: root,
    schema
});
