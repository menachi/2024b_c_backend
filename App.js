const express = require("express");
const app = express();
const studentRoute = require("./routes/student_route");
const postRoute = require("./routes/post_route");
const { mongo } = require("mongoose");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/student", studentRoute);
app.use("/post", postRoute);

app.listen(process.env.PORT, () => {
  console.log("Example app listening at http://localhost:" + process.env.PORT);
});
