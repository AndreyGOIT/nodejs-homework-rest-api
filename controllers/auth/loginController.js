const { login } = require("../../services/authService");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const token = await login(email, password);
  console.log(token);
  // return res.json({ status: "success", data: { token } });
  return res.json({
    status: "success",
    token: token,
  });
};

module.exports = loginController;
