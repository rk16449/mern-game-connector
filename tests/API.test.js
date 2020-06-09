describe("Get /api/users", function () {
  it("Responded with user list", function (done) {
    request(app)
      .get("/api/users")
      .set("Content-Type", "application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});
