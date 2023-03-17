const express = require("express");

const router = express.Router();

const UploadController = require("../controllers/UploadController");
const uploadMiddleware = require("../middlewares/uploadMiddleware");

router.post("/", uploadMiddleware.single("avatar"), UploadController.upload);

module.exports = router;
