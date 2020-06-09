const mongoose = require("mongoose");

// get strings from default.json
const config = require("config");

// get the mongodb url
const db = config.get("mongoURI");

// connect to the db

// we'll be using asynch await with a try catch block
const connectDB = async () => {
  try {
    // because mongoose.connect returns a promise, we want to await it
    await mongoose.connect(db, {
      // remove warnings here
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(`Failed to connect to MongoDB ${err.message}`);
    // Exit process with failiure
    process.exit(1);
  }
};

module.exports = connectDB;
