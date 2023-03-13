const { login } = require("../services/schemas/authService");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const token = await login(email, password);

  res.json({ status: "success", token });
};

module.exports = loginController;
