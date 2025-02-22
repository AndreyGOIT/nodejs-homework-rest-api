const express = require("express");
// const path = require("path");
const cors = require("cors");
// const multer = require("multer");
// const fs = require("fs/promises");
// const { nanoid } = require("nanoid");

require("colors");
require("dotenv").config();

// // const auth = require("./middlewares/auth");

const app = express();
// // cors
app.use(cors());
// // parse application/json
app.use(express.json());
app.use(express.static("public"));

// require("./config/config-passport");

const contactsRouter = require("./routes/api/contactsRouter");
const authRouter = require("./routes/api/authRouter");
const usersRouter = require("./routes/api/usersRouter");

app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);
app.use("/api/users", usersRouter);

// // catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log("404: Not found");
  res.status(404).json({
    status: "error",
    code: 404,
    message: `Use api on routes:
  /api/registration - registration user {username, email, password}
  /api/login - login {email, password}
  /api/list - get message if user is authenticated`,
    data: "Not found",
  });
  next();
});

// // error handler
app.use((err, req, res, next) => {
  const { status = 500 } = err;
  const message = status === 500 ? "Server error" : err.message;
  res.status(status).json({
    status: "fail",
    code: 500,
    message,
    data: "Internal Server Error",
  });
  next();
});

module.exports = app;
