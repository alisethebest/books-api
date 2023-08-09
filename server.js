const express = require("express");
const mongoose = require("mongoose");
const booksController = require("./controllers/booksController");

const app = express();

// Database connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/booksAPI"; // default to local if not set
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());

// Use the books controller when the path starts with /books
app.use("/books", booksController);

// Root route for testing purposes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
