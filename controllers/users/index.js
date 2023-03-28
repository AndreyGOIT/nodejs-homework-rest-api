const {
  getAllUsers,
  getUserById,
  getUserByToken,
} = require("./usersController");
const verificationController = require("./verificationsController");

module.exports = {
  getAllUsers,
  getUserById,
  getUserByToken,
  verificationController,
};
