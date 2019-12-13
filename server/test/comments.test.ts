import { expect } from "chai";
import request = require("supertest");
import app from "../src";

describe("graphQl comments test", () => {

    it("should add a comment", (done) => {

        const query = `mutation {
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
});
