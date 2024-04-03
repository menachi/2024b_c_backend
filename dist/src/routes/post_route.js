"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const post_controller_1 = __importDefault(require("../controllers/post_controller"));
const auth_controller_1 = require("../controllers/auth_controller");
router.get("/", post_controller_1.default.get.bind(post_controller_1.default));
router.get("/:id", post_controller_1.default.get.bind(post_controller_1.default));
//post
router.post("/", auth_controller_1.authMiddleware, post_controller_1.default.post.bind(post_controller_1.default));
//put
router.put("/", post_controller_1.default.put.bind(post_controller_1.default));
//delete
router.delete("/", post_controller_1.default.delete.bind(post_controller_1.default));
exports.default = router;
//# sourceMappingURL=post_route.js.map