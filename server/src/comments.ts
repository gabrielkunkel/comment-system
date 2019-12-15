import graphqlHTTP = require("express-graphql");
import { buildSchema } from "graphql";
import { model, models, Schema } from "mongoose";
import uuidv4 = require("uuid/v4");

// Comment Interface
interface IComment {
    _id?: string;
    author: string;
    text: string;
}

// mongoose schema
const CommentSchema = new Schema({
    _id: String,
    author: String,
    text: String
}, {
    timestamps: true
});

export const Comment = models.Comment || model("Comment", CommentSchema);

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
        getComment(_id: String): Comment
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
    getComment: ({_id}: {_id: string}) => {
        return {
            _id,
            author: "random author",
            text: "random text"
        };
    }
};

export default graphqlHTTP({
    graphiql: true,
    rootValue: root,
    schema
});
