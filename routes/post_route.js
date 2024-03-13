const express = require("express");
const router = express.Router();
const PostController = require("../controllers/post_controller");

router.get("/", PostController.get);
router.get("/:id", PostController.get);

//post
router.post("/", PostController.post);

//put
router.put("/", PostController.put);

//delete
router.delete("/", PostController.deletePost);

module.exports = router;
