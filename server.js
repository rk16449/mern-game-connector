const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// Connect to the database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/game", require("./routes/api/game"));
app.use("/api/components", require("./routes/api/builds"));
app.use("/api/products", require("./routes/api/products"));

//app.use("/api/dialogflow", require("./routes/api/dialogflow"));

// Serve the static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  // get anything aside from the api routes up there
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// Look for an environment variable called port or use 5000
const PORT = process.env.PORT || 5000;

// listen to the port
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
