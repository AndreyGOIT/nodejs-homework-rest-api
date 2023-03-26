// const mongoose = require("mongoose");
// const request = require("supertest");
// require("dotenv").config();

// const express = require("express");
// const app = express();

// const { User } = require("../../models/userModel");

// const { DB_HOST, PORT } = process.env;

// describe("test auth routes", () => {
//   let server;
//   beforeAll(() => (server = app.listen(PORT)));
//   afterAll(() => server.close());

//   beforeEach((done) => {
//     mongoose.connect(DB_HOST).then(() => done());
//   });

//   afterEach((done) => {
//     mongoose.connection.db.dropCollection(() => {
//       mongoose.connection.close(() => done());
//     });
//   });

//   test("test login route", async () => {
//     const newUser = {
//       email: "testtest@mail.com",
//       password: "123qwe",
//     };

//     const user = await User.create(newUser);

//     /*
//         1. Проверить правильность получаемого ответа на
//         AJAX-запрос документации
//         2. Проверить что в базу записался нужный элемент.
//         */

//     const loginUser = {
//       email: "testtest@mail.com",
//       password: "123qwe",
//     };

//     const response = await request(app).post("/api/auth/login").send(loginUser);
//     expect(response.statusCode).toBe(200);
//     const { body } = response;
//     expect(body.token).toByTruthy();
//     const { token } = await User.findById(user._id);
//     expect(body.token).toBe(token);
//   });
// });
