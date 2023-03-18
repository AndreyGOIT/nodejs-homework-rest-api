const createError = require("http-errors");
const express = require("express");
const path = require("path");
const fs = require("fs").promises;
const cors = require("cors");
const multer = require("multer");
const uploadDir = path.join(process.cwd(), "uploads");
const storeImage = path.join(process.cwd(), "images");

require("colors");
require("dotenv").config();

const connectDB = require("./database/connection");
// const auth = require("./middlewares/auth");

const app = express();
// parse application/json
app.use(express.json());
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("picture"), async (req, res, next) => {
  const { description } = req.body;
  const { path: temporaryName, originalname } = req.file;
  const fileName = path.join(storeImage, originalname);
  try {
    await fs.rename(temporaryName, fileName);
  } catch (error) {
    await fs.unlink(temporaryName);
    return next(createError(500));
  }
  res.json({
    description,
    message: "Image uploaded successfully",
    status: 200,
  });
});

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

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

app.listen(PORT, async () => {
  createFolderIsNotExist(uploadDir);
  createFolderIsNotExist(storeImage);
  console.log("db connecting...".bgGray.bold.italic);
  await connectDB();
  console.log(
    `Database connection successful on port: ${PORT}`.bgGreen.bold.italic
  );
});
