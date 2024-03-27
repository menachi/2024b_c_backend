"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const student_route_1 = __importDefault(require("./routes/student_route"));
const post_route_1 = __importDefault(require("./routes/post_route"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const init = () => {
    const promise = new Promise((resolve) => {
        const db = mongoose_1.default.connection;
        db.on("error", (error) => console.error(error));
        db.once("open", () => console.log("connected to database"));
        mongoose_1.default.connect(process.env.DATABASE_URL);
        app.use(body_parser_1.default.urlencoded({ extended: true }));
        app.use(body_parser_1.default.json());
        app.use("/student", student_route_1.default);
        app.use("/post", post_route_1.default);
        resolve(app);
    });
    return promise;
};
exports.default = init;
//# sourceMappingURL=App.js.map