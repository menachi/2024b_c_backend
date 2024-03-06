const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("get student");
});

//post
router.post("/", (req, res) => {
  res.send("post student");
});

//put
router.put("/", (req, res) => {
  res.send("put student");
});

//delete
router.delete("/", (req, res) => {
  res.send("delete student");
});

module.exports = router;
