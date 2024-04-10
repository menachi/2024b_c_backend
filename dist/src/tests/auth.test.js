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
const user_model_1 = __importDefault(require("../models/user_model"));
const user = {
    "email": "test@test.com",
    "password": "1234"
};
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, App_1.default)();
    console.log("Before all");
    yield user_model_1.default.deleteMany({ "email": user.email });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe("Register Tests", () => {
    test("Register", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/auth/register").send(user);
        expect(res.statusCode).toEqual(200);
    }));
    test("Login", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/auth/login").send(user);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("accessToken");
        expect(res.body).toHaveProperty("refreshToken");
        user.accessToken = res.body.accessToken;
        user.refreshToken = res.body.refreshToken;
    }));
    test("Middleware", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/student").send();
        expect(res.statusCode).not.toEqual(200);
        const res2 = yield (0, supertest_1.default)(app).get("/student").set("Authorization", "Bearer " + user.accessToken).send();
        expect(res2.statusCode).toEqual(200);
        yield (0, supertest_1.default)(app).post("/post").set("Authorization", "Bearer " + user.accessToken).send({
            "title": "Post Title",
            "message": "Post Content",
            "owner": "12345"
        });
        expect(res2.statusCode).toEqual(200);
    }));
    jest.setTimeout(10000);
    test("Refresh Token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield new Promise(r => setTimeout(r, 6000));
        const res = yield (0, supertest_1.default)(app).get("/student").set("Authorization", "Bearer " + user.accessToken).send();
        expect(res.statusCode).not.toEqual(200);
        const res2 = yield (0, supertest_1.default)(app).get("/auth/refresh")
            .set("Authorization", "Bearer " + user.refreshToken)
            .send();
        expect(res2.statusCode).toEqual(200);
        expect(res2.body).toHaveProperty("accessToken");
        expect(res2.body).toHaveProperty("refreshToken");
        user.accessToken = res2.body.accessToken;
        user.refreshToken = res2.body.refreshToken;
        const res3 = yield (0, supertest_1.default)(app).get("/student").set("Authorization", "Bearer " + user.accessToken).send();
        expect(res3.statusCode).toEqual(200);
    }));
    test("Refresh Token hacked", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/auth/refresh")
            .set("Authorization", "Bearer " + user.refreshToken)
            .send();
        expect(res.statusCode).toEqual(200);
        const newRefreshToken = res.body.refreshToken;
        const res2 = yield (0, supertest_1.default)(app).get("/auth/refresh")
            .set("Authorization", "Bearer " + user.refreshToken)
            .send();
        expect(res2.statusCode).not.toEqual(200);
        const res3 = yield (0, supertest_1.default)(app).get("/auth/refresh")
            .set("Authorization", "Bearer " + newRefreshToken)
            .send();
        expect(res3.statusCode).not.toEqual(200);
    }));
    test("Logout", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/auth/login").send(user);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("accessToken");
        expect(res.body).toHaveProperty("refreshToken");
        user.accessToken = res.body.accessToken;
        user.refreshToken = res.body.refreshToken;
        const res2 = yield (0, supertest_1.default)(app).get("/auth/logout")
            .set("Authorization", "Bearer " + user.refreshToken)
            .send();
        expect(res2.statusCode).toEqual(200);
        const res3 = yield (0, supertest_1.default)(app).get("/auth/refresh")
            .set("Authorization", "Bearer " + user.refreshToken)
            .send();
        expect(res3.statusCode).not.toEqual(200);
    }));
});
//# sourceMappingURL=auth.test.js.map