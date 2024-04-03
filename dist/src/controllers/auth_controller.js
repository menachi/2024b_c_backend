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
exports.authMiddleware = void 0;
const user_model_1 = __importDefault(require("../models/user_model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    if (email === undefined || password === undefined) {
        return res.status(400).send("Email and password are required");
    }
    try {
        const user = yield user_model_1.default.findOne({ email: email });
        if (user) {
            return res.status(400).send("User already exists");
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const newUser = yield user_model_1.default.create({ email: email, password: hashedPassword });
        return res.send(newUser);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get email & pwd
    const email = req.body.email;
    const password = req.body.password;
    if (email === undefined || password === undefined) {
        return res.status(400).send("Email and password are required");
    }
    // get user from DB
    try {
        const user = yield user_model_1.default.findOne({ email: email });
        if (user == null) {
            return res.status(400).send("User doesnot exists");
        }
        // compare pwd
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Invalid credentials");
        }
        // generate token
        const token = jsonwebtoken_1.default.sign({ "_id": user._id }, process.env.TOKEN_SECRET, { expiresIn: "1h" });
        return res.status(200).send({ "token": token });
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("logout");
});
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, data) => {
        if (err) {
            return res.sendStatus(401);
        }
        const id = data._id;
        req.user = { _id: id };
        return next();
    }); // as { _id: string };
});
exports.authMiddleware = authMiddleware;
exports.default = { register, login, logout, authMiddleware: exports.authMiddleware };
//# sourceMappingURL=auth_controller.js.map