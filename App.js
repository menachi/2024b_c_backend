const express = require("express");
const app = express();
const studentRoute = require("./routes/student_route");
const postRoute = require("./routes/post_route");
const env = require("dotenv").config();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const init = () => {
  const promise = new Promise((resolve, reject) => {
    const db = mongoose.connection;
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log("connected to database"));
    mongoose.connect(process.env.DATABASE_URL).then(() => {
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());

      app.use("/student", studentRoute);
      app.use("/post", postRoute);
      resolve(app);
    });
  });
  return promise;
};

module.exports = init;
