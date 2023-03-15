const { logout } = require("../../services/authService");

const logoutController = async (req, res) => {
  const { id } = req.body;

  await logout(id);

  return res.json({ status: "success" });
};

module.exports = logoutController;
