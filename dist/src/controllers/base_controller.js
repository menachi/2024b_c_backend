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
Object.defineProperty(exports, "__esModule", { value: true });
class BaseController {
    constructor(model) {
        this.model = model;
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.id != null) {
                    const students = yield this.model.findById(req.params.id);
                    return res.status(200).send(students);
                }
                else {
                    if (req.query.name != null) {
                        const students = yield this.model.find({ name: req.query.name });
                        return res.status(200).send(students);
                    }
                    else {
                        const students = yield this.model.find();
                        return res.status(200).send(students);
                    }
                }
            }
            catch (err) {
                res.status(500).send(err.message);
            }
        });
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = req.body;
            try {
                const newStudent = yield this.model.create(student);
                res.status(201).json(newStudent);
            }
            catch (err) {
                res.status(500).send(err.message);
            }
        });
    }
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = req.body;
            try {
                const updatedStudent = yield this.model.findByIdAndUpdate(student._id, student, { new: true });
                res.status(200).json(updatedStudent);
            }
            catch (err) {
                res.status(500).send(err.message);
            }
        });
    }
    delete(req, res) {
        //const student = req.body;
        try {
            //await this.model.findByIdAndDelete(student._id);
            res.status(200).send();
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
}
exports.default = BaseController;
//# sourceMappingURL=base_controller.js.map