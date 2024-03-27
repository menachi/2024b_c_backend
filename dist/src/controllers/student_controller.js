"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_model_1 = __importDefault(require("../models/student_model"));
const base_controller_1 = __importDefault(require("./base_controller"));
const StudentController = new base_controller_1.default(student_model_1.default);
const getStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    StudentController.get(req, res);
});
const postStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    StudentController.post(req, res);
});
const putStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    StudentController.put(req, res);
});
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    StudentController.delete(req, res);
});
exports.default = {
    getStudent,
    postStudent,
    putStudent,
    deleteStudent,
};
//# sourceMappingURL=student_controller.js.map