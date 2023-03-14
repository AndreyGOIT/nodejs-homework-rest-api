const express = require("express");

const router = express.Router();

// const { authMiddleware } = require("../middleware/authMiddleware");
const asyncHandler = require("express-async-handler");

const {
  getAllConts,
  getContById,
  createContact,
  delContact,
  updateCont,
  updateStatus,
} = require("../../controllers/contacts/index");

// router.use(authMiddleware);

router.get("/", asyncHandler(getAllConts));

router.get("/:id", asyncHandler(getContById));

router.post("/", asyncHandler(createContact));

router.delete("/:id", asyncHandler(delContact));

router.put("/:id", asyncHandler(updateCont));

router.patch("/:contactId/favorite", asyncHandler(updateStatus));

module.exports = router;
