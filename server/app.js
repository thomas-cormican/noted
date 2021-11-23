require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const notesRoute = require("./routes/notes");
const path = require("path");

const port = process.env.PORT || 5000;

// config

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "../client/build")));

// database

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_SERVER_CREDENTIALS);
}

// routes

app.get("/api", (req, res) => {
  res.json({ message: "You have reached the api" });
});

app.use("/api/auth", authRoute);
app.use("/api/notes", notesRoute);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// error handler

app.use((req, res, next) => {
  const error = new Error("404 page not found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 505);
  res.json({ error: err, message: err.message });
});

app.listen(port, (req, res) => {
  console.log(`Server started on port ${port}`);
});
