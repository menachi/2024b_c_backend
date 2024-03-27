const init = require("./App.js");

init().then((app) => {
  app.listen(process.env.PORT, () => {
    console.log(
      "Example app listening at http://localhost:" + process.env.PORT
    );
    // this is my comment
    console.log("Hello World");
    console.log("edited...9999");
  });
});
