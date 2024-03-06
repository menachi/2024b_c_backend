const express = require("express");
const app = express();
const studentRoute = require("./routes/student_route");

app.use("/student", studentRoute);

app.listen(process.env.PORT, () => {
  console.log("Example app listening at http://localhost:" + process.env.PORT);
});
