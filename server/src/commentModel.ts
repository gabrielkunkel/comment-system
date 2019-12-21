import { model, models, Schema } from "mongoose";

// Comment Interface
export interface IComment {
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
