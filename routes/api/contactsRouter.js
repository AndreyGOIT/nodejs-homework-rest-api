const express = require("express");

const router = express.Router();

const { auth } = require("../../middlewares");
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

router.post("/", auth, asyncHandler(createContact));

router.delete("/:id", auth, asyncHandler(delContact));

router.put("/:id", auth, asyncHandler(updateCont));

router.patch("/:contactId/favorite", asyncHandler(updateStatus));

module.exports = router;
