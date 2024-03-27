"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const student_controller_1 = __importDefault(require("../controllers/student_controller"));
router.get("/", student_controller_1.default.getStudent);
router.get("/:id", student_controller_1.default.getStudent);
//post
router.post("/", student_controller_1.default.postStudent);
//put
router.put("/", student_controller_1.default.putStudent);
//delete
router.delete("/", student_controller_1.default.deleteStudent);
exports.default = router;
//# sourceMappingURL=student_route.js.map