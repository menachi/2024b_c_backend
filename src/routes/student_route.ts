import express from "express";
const router = express.Router();
import StudentController from "../controllers/student_controller";

router.get("/", StudentController.get.bind(StudentController));
router.get("/:id", StudentController.get.bind(StudentController));

//post
router.post("/", StudentController.post.bind(StudentController));

//put
router.put("/", StudentController.put.bind(StudentController));

//delete
router.delete("/", StudentController.delete.bind(StudentController));

export default router;
