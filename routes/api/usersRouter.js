const express = require("express");

const router = express.Router();

const asyncHandler = require("express-async-handler");

const { getAllUsers, getUserById } = require("../../controllers/users/index");

router.get("/", asyncHandler(getAllUsers));
router.get("/:id", asyncHandler(getUserById));
// router.put("/:id", auth, asyncHandler(updateUserById));

module.exports = router;
