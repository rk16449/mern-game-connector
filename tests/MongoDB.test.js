const mongoose = require("mongoose");
const User = require("../models/User");

const userData = {
  email: "Test@Test.com",
  password: "123456",
  name: "Test",
  avatar: "test",
  date: Date.now,
};


describe("User model test", () =>{
    beforeAll(async => {
        await mongoose.connect(
            global.__MONGO_URI__,
            {
                useNewUrlParser: true, useCreateIndex: true
            },
            (err) => {
                if(err) {
                    console.error(err);
                    process.exit(1);
                }
            }
        )
    });

    it("create & save user successfully", async () => {
        const validUser = new User(user);
        const savedUser = await validUser.save();

        expect(savedUser._id).toBeDefined();
        expected(savedUser.name).toBe(userData.name);
        expected(savedUser.email).toBe(userData.email);
        expected(savedUser.password).toBe(userData.password);
        expected(savedUser.avatar).toBe(userData.avatar);
        expected(savedUser.date).toBe(userData.date);
    })
})

describe('Get /api/users', function() {
    it('Responded with user list', function(done){
        request(app)
        .get('/api/users')
        .set('Content-Type', 'application/json')
        .expect(200)
        .end(function(err, res){
            if(err) return done(err);
            done();
        })
    })
})