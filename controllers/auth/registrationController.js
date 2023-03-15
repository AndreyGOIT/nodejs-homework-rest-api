const { registration } = require("../../services/authService");

const registrationController = async (req, res) => {
  const { email, password } = req.body;

  await registration(email, password);

  return res.json({ status: "success" });
};

module.exports = registrationController;
