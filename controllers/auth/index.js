const registration = require("./registrationController");
const verify = require("./verify");
const resendEmail = require("./resendEmail");
const login = require("./loginController");
const logout = require("./logoutController");
const updateAvatar = require("./updateAvatarController");

module.exports = {
  registration,
  login,
  logout,
  updateAvatar,
  verify,
  resendEmail,
};
