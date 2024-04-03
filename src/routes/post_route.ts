import express from "express";
const router = express.Router();
import PostController from "../controllers/post_controller";
import { authMiddleware } from "../controllers/auth_controller";

router.get("/", PostController.get.bind(PostController));
router.get("/:id", PostController.get.bind(PostController));

//post
router.post("/", authMiddleware, PostController.post.bind(PostController));

//put
router.put("/", PostController.put.bind(PostController));

//delete
router.delete("/", PostController.delete.bind(PostController));

export default router;
