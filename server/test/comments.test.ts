import { expect } from "chai";
import request = require("supertest");
import app from "../src";
import { Comment, IComment } from "../src/comments";

describe("graphQl comments test", () => {

    const arrayOfNewElements: IComment[] = [
        {
            _id: "101",
            author: "Jimmy",
            text: "I am offended by this."
        },
        {
            _id: "102",
            author: "Richard",
            text: "This is my favorite of all time."
        },
        {
            _id: "103",
            author: "Leonard",
            text: "I want you to do one about GraphQL!"
        },
        {
            _id: "104",
            author: "Deborah",
            text: "JavaScript is the greatest language."
        },
    ];

    beforeEach((done) => {
        Comment.collection.insert(arrayOfNewElements);
        done();
    });

    afterEach((done) => {
        Comment.collection.deleteMany({});
        done();
    });

    it("can add comment", (done) => {

        const query: string = `mutation {
            createOrUpdateComment(input: {_id: "4", author: "Brian", text: "This is my favorite video of all time."}) {
              _id
              author
              text
            }
          }`;

        request(app)
            .post("/comments")
            .send({query})
            .expect(200)
            .end((err, res) => {
                if (err) { return done(err); }
                // tslint:disable-next-line: no-unused-expression
                expect(res.body.data.createOrUpdateComment._id).to.exist;
                expect(res.body.data.createOrUpdateComment.author).to.equal("Brian");
                expect(res.body.data.createOrUpdateComment.text).to.equal("This is my favorite video of all time.");
                done();
            });
    });

    it("should retrieve a record from database, by _id", (done) => {

        const query: string = `query {
            comment(_id: "104") {_id author text}
          }`;

        request(app)
            .post("/comments")
            .send({query})
            .expect(200)
            .end((err, res) => {
                if (err) { return done(err); }
                expect(res.body.data.comment._id).to.equal("104");
                expect(res.body.data.comment.author).to.equal("Deborah");
                expect(res.body.data.comment.text).to.equal("JavaScript is the greatest language.");
                done();
            });
    });

});
