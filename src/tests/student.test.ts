import request from "supertest";
import init from "../App";
import mongoose from "mongoose";
import Student from "../models/student_model";
import { App } from "supertest/types";

const testStudent = {
  _id: "12345",
  name: "John",
  age: 20,
};

let app: App;
beforeAll(async () => {
  app = await init();
  console.log("Before all");
  await Student.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Student Tests", () => {
  test("Test student get", async () => {
    const res = await request(app).get("/student");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  //test the post student api
  test("Test student post", async () => {
    const res = await request(app).post("/student").send(testStudent);
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toEqual(testStudent.name);
    expect(res.body.age).toEqual(testStudent.age);
    expect(res.body._id).toEqual(testStudent._id);
  });

  //test the get student api
  test("Test student get by id", async () => {
    const res = await request(app).get("/student/" + testStudent._id);
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual(testStudent.name);
    expect(res.body.age).toEqual(testStudent.age);
    expect(res.body._id).toEqual(testStudent._id);
  });
});
