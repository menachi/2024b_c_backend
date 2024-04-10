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
const supertest_1 = __importDefault(require("supertest"));
const App_1 = __importDefault(require("../App"));
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = __importDefault(require("../models/student_model"));
const user_model_1 = __importDefault(require("../models/user_model"));
const testStudent = {
    _id: "12345",
    name: "John",
    age: 20,
};
const user = {
    "email": "testStudent@test.com",
    "password": "1234"
};
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, App_1.default)();
    console.log("Before all");
    yield student_model_1.default.deleteMany();
    yield user_model_1.default.deleteMany({ "email": user.email });
    yield (0, supertest_1.default)(app).post("/auth/register").send(user);
    const res = yield (0, supertest_1.default)(app).post("/auth/login").send(user);
    user.accessToken = res.body.accessToken;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe("Student Tests", () => {
    test("Test student get", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .get("/student")
            .set("Authorization", "Bearer " + user.accessToken);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([]);
    }));
    //test the post student api
    test("Test student post", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/student")
            .set("Authorization", "Bearer " + user.accessToken)
            .send(testStudent);
        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual(testStudent.name);
        expect(res.body.age).toEqual(testStudent.age);
        expect(res.body._id).toEqual(testStudent._id);
    }));
    //test the get student api
    test("Test student get by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .get("/student/" + testStudent._id)
            .set("Authorization", "Bearer " + user.accessToken);
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual(testStudent.name);
        expect(res.body.age).toEqual(testStudent.age);
        expect(res.body._id).toEqual(testStudent._id);
    }));
});
//# sourceMappingURL=student.test.js.map