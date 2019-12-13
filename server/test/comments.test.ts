import { expect } from "chai";
import request = require("supertest");
import app from "../src";

describe("graphQl comments test", () => {

    it("should add a comment", (done) => {

        const query = `mutation CreateComment($input: CommentInput) {
            createComment(input: $input) {
              _id
              author
              text
            }
          }`;

        const variables = {
              input: {
                  _id: "this is id",
                  author: "Brian",
                  text: "This is my favorite video of all time."
              }
          };

        console.log("stringified JSON:", JSON.stringify({ query, variables}));

        request(app)
            .post("/comments")
            .send(JSON.stringify({ query, variables}))
            .expect(200)
            .end((err, res) => {
                console.log("is there an err? ", err);
                if (err) { return done(err); }
                console.log("does this response get through? ", res);
                // tslint:disable-next-line: no-unused-expression
                expect(res.body.data.id).to.exist;
                expect(res.body.data.author).to.equal("Brian");
                expect(res.body.data.text).to.equal("This is my favorite video of all time.");
                done();
            });
    });
});
