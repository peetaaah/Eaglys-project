const chai = require("chai");
const chaiHttp = require("chai-http");
const http = require("http");
const app = require("../server");
const should = chai.should();

chai.use(chaiHttp);
chai.request(app);

let server;

before((done) => {
  server = http.createServer(app);
  server.listen(done);
});

after((done) => {
  server.close(done);
  console.log('server done here')
  done();
});

it("it should modify SQL and return the modified SQL and column map", () => {
  describe("API Tests", async () => {
    console.log("Starting test...");

    const sqlQuery = "SELECT name, age FROM users WHERE id = 1";

    console.log("Sending request...");

    chai
      .request(server)
      .post("/api/modify-sql")
      .send({ sqlQuery })
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("modifiedSql").to.be.a("string");
        res.body.should.have.property("columnMap").to.be.a("object");
        done();
      })
      .catch((error) => {
        console.error("Error in request:", error);
        done(error);
      });
  });
});
