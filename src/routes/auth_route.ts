import express from "express";
const router = express.Router();
import AuthController from "../controllers/auth_controller";

router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

router.get("/refresh", AuthController.refresh);

router.get("/logout", AuthController.logout);

export default router;
