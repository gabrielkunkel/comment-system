import { expect } from "chai";
import request = require("supertest");
import app from "../src";

describe("graphQl test", () => {

    it("should respond with hello world", (done) => {

        request(app)
            .post("/graphql")
            .send({ query: "{ hello }"})
            .expect(200)
            .end((err, res) => {
                if (err) { return done(err); }
                expect(res.body.data.hello).equal("Hello world!");
                done();
            });
    });
});
