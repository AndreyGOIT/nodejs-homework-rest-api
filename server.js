const express = require("express");
const cors = require("cors");

require("colors");
require("dotenv").config();

const connectDB = require("./database/connection");
// const auth = require("./middlewares/auth");

const app = express();
// parse application/json
app.use(express.json());

require("./config/config-passport");

const PORT = process.env.PORT || 5050;

// cors
app.use(cors());

const contactsRouter = require("./routes/api/contactsRouter");
const authRouter = require("./routes/api/authRouter");
const usersRouter = require("./routes/api/usersRouter");
app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);
app.use("/api/users", usersRouter);

// catch 404 and forward to error handler
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

// error handler
app.use((err, req, res, next) => {
  console.log("status 500");
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
  next();
});

app.listen(PORT, async () => {
  console.log("db connecting...".bgGray.bold.italic);
  await connectDB();
  console.log(
    `Database connection successful on port: ${PORT}`.bgGreen.bold.italic
  );
});
