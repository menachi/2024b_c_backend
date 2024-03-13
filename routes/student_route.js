const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/student_controller");

router.get("/", StudentController.getStudent);
router.get("/:id", StudentController.getStudent);

//post
router.post("/", StudentController.postStudent);

//put
router.put("/", StudentController.putStudent);

//delete
router.delete("/", StudentController.deleteStudent);

module.exports = router;
