const express = require("express");

const router = express.Router();

const auth = require("../../middlewares/auth");
const asyncHandler = require("express-async-handler");

const {
  getAllUsers,
  getUserById,
  getUserByToken,
} = require("../../controllers/users/index");

router.get("/", asyncHandler(getAllUsers));
router.get("/:id", asyncHandler(getUserById));
router.post("/current", auth, asyncHandler(getUserByToken));
// router.put("/:id", auth, asyncHandler(updateUserById));

module.exports = router;
