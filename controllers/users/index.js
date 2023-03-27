const {
  getAllUsers,
  getUserById,
  getUserByToken,
} = require("./usersController");
const verificationsController = require('./verificationsController');

module.exports = {
  getAllUsers,
  getUserById,
  getUserByToken,
  verificationsController,
};
