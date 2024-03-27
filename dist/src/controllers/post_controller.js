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
const post_model_1 = __importDefault(require("../models/post_model"));
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.id != null) {
            const posts = yield post_model_1.default.findById(req.params.id);
            res.status(200).send(posts);
        }
        else {
            const posts = yield post_model_1.default.find();
            res.status(200).send(posts);
        }
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});
const post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = req.body;
    try {
        const newPost = yield post_model_1.default.create(post);
        res.status(201).json(newPost);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});
const put = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = req.body;
    try {
        const updatedPost = yield post_model_1.default.findByIdAndUpdate(post._id, post, {
            new: true,
        });
        res.status(200).json(updatedPost);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = req.body;
    try {
        yield post_model_1.default.findByIdAndDelete(post._id);
        res.status(200).send();
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});
exports.default = {
    get,
    post,
    put,
    deletePost,
};
//# sourceMappingURL=post_controller.js.map