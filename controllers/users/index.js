const {
  getAllUsers,
  getUserById,
  getUserByToken,
} = require("./usersController");
const verificationController = require("./verificationsController");
const verifyController = require("./verifyController");

module.exports = {
  getAllUsers,
  getUserById,
  getUserByToken,
  verificationController,
  verifyController,
};
