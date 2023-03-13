const { registration } = require("../services/schemas/authService");

const registrationController = async (req, res) => {
  const { email, password } = req.body;

  await registration(email, password);

  res.json({ status: "success" });
};

module.exports = registrationController;
