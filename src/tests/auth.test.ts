import request from "supertest";
import init from "../App";
import mongoose from "mongoose";
import { App } from "supertest/types";
import User from "../models/user_model";

type TestUser = {
  email: string,
  password: string,
  token?: string
}

const user: TestUser = {
  "email": "test@test.com",
  "password": "1234"
}

let app: App;
beforeAll(async () => {
  app = await init();
  console.log("Before all");
  await User.deleteMany({ "email": user.email });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Register Tests", () => {
  test("Register", async () => {
    const res = await request(app).post("/auth/register").send(user);
    expect(res.statusCode).toEqual(200);
  });

  test("Login", async () => {
    const res = await request(app).post("/auth/login").send(user);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    user.token = res.body.token;
  });


  test("Middleware", async () => {
    const res = await request(app).get("/student").send();
    expect(res.statusCode).not.toEqual(200);

    const res2 = await request(app).get("/student").set("Authorization", "Bearer " + user.token).send();
    expect(res2.statusCode).toEqual(200);

    await request(app).post("/post").set("Authorization", "Bearer " + user.token).send({
      "title": "Post Title",
      "message": "Post Content",
      "owner": "12345"
    });
    expect(res2.statusCode).toEqual(200);
  });


  test("Logout", async () => {
    const res = await request(app).get("/auth/logout").send();
    expect(res.statusCode).toEqual(200);
  });


});
