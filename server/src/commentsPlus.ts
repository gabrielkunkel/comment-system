import graphqlHTTP = require("express-graphql");
import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import uuidv4 = require("uuid/v4");
import { Comment, IComment } from "./commentModel";

const commentType = new GraphQLObjectType({
    name: "comment",
    fields: () => {
        return {
            _id: {
                type: GraphQLString
            },
            author: {
                type: GraphQLString
            },
            text: {
                type: GraphQLString
            }
        };
    }
});

const queryType = new GraphQLObjectType({
    name: "Query",
    fields: () => {
        return {
            comments: {
                type: new GraphQLList(commentType),
                resolve: () => {
                    const comments = Comment.find({}).exec();
                    if (!comments) {
                        throw new Error("Error: No comments!");
                    }
                    return comments;
                }
            },
            comment: {
                type: commentType,
                args: {
                    _id: {
                        name: "_id",
                        type: GraphQLString
                    }
                },
                resolve: (root, params: { _id?: string }) => {
                    const comment = Comment.findById(params._id).exec();
                    if (!comment) {
                        throw new Error("There is no comment with that id!");
                    }
                    return comment;
                }
            }
        };
    }
});

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: () => {
        return {
            createOrUpdateComment: {
                type: commentType,
                args: {
                    _id: {
                        type: GraphQLString
                    },
                    author: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    text: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: (root, params: IComment) => {
                    let commentToProcess: IComment;
                    if (!params._id) {
                        commentToProcess = Object.assign({}, { _id: uuidv4() }, params);
                    } else {
                        commentToProcess = params;
                    }

                    return Comment.findOneAndUpdate(
                        { _id: commentToProcess._id},
                        commentToProcess,
                        // @ts-ignore
                        { new: true, useFindAndModify: false, upsert: true }).exec();
                }
            }
        };
    }
});

const schema = new GraphQLSchema({query: queryType, mutation });

export default graphqlHTTP({
    graphiql: true,
    rootValue: global,
    schema
});
