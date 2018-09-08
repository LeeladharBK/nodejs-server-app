//During the test the env variable is set to test
process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();
const { KEYS } = require("../config/db_env");

chai.use(chaiHttp);

//parent block
describe("Stores", () => {
  /*
    * Test the /GET AllStores route with invalid API KEY
    */
  describe("/GET Get All Stores: invalid API_KEY", () => {
    it("Response Should throw HTTP 401 ERROR", done => {
      chai
        .request(server)
        .get("/api/stores/user/2Z1GVO2EZJPPO2WPETPF952M6W1B0S77")
        // .set('x-api-key', KEYS)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  /*
    * Test the /GET AllStores route with valid UserUid
    */
  describe("/GET Get All Stores with valid UserUid", () => {
    it("Should return all the active stores", done => {
      chai
        .request(server)
        .get("/api/stores/user/2Z1GVO2EZJPPO2WPETPF952M6W1B0S77")
        .set("x-api-key", KEYS.API_KEY)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.list.should.be.a("array");
          res.body.list.length.should.be.eql(54);
          done();
        });
    });
  });

  /*
    * Test the /GET AllStores route with invalid UserUid
    */
  describe("/GET Get All Stores with invalid UserUid", () => {
    it("Response Should throw HTTP 400 ERROR", done => {
      chai
        .request(server)
        .get("/api/stores/user/2Z1GVO2EZJPPO2WPETPF")
        .set("x-api-key", KEYS.API_KEY)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  /*
    * Test the /GET AllStores route with invalid API endpoint
    */
  describe("/GET Get All Stores: wrong API endpoint", () => {
    it("Response Should throw HTTP 404 ERROR", done => {
      chai
        .request(server)
        .get("/api/stores/2Z1GVO2EZJPPO2WPETPF952M6W1B0S77")
        .set("x-api-key", KEYS.API_KEY)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
