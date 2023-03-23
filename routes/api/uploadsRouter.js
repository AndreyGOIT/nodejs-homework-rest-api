const express = require("express");

const router = express.Router();

const UploadController = require("../../controllers/users/uploadController");
// const uploadMiddleware = require("../middlewares/uploadMiddleware");

// router.post("/avatar", uploadMiddleware.single("avatar"), UploadController.upload);
router.post("/avatar", UploadController.upload);

module.exports = router;
