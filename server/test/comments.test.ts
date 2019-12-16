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
                expect(res.body.data.createOrUpdateComment._id).to.equal("4");
                expect(res.body.data.createOrUpdateComment.author).to.equal("Brian");
                expect(res.body.data.createOrUpdateComment.text).to.equal("This is my favorite video of all time.");
                done();
            });
    });

    it("can adds comment and if no _id is provided, a uuid will be filled in automatically ", (done) => {
        const query: string = `mutation {
            createOrUpdateComment(input: {author: "Brian", text: "This is my favorite video of all time."}) {
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
                const uuidRegEx = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/i;
                 // tslint:disable-next-line: no-unused-expression
                expect(uuidRegEx.test(res.body.data.createOrUpdateComment._id)).to.be.true;
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
                expect(res.body.data.comment[0]._id).to.equal("104");
                expect(res.body.data.comment[0].author).to.equal("Deborah");
                expect(res.body.data.comment[0].text).to.equal("JavaScript is the greatest language.");
                done();
            });
    });

    it("should retrieve all records from database", (done) => {

        const query: string = `query {
            comment { _id author text }
          }`;

        request(app)
            .post("/comments")
            .send({query})
            .expect(200)
            .end((err, res) => {
                if (err) { return done(err); }
                expect(res.body.data.comment).to.have.lengthOf(arrayOfNewElements.length);
                res.body.data.comment.sort((a: IComment, b: IComment) => parseInt(a._id, 10) - parseInt(b._id, 10));
                expect(res.body.data.comment).to.deep.equal(arrayOfNewElements);
                done();
            });
    });

});
