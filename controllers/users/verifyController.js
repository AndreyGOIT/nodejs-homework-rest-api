const verify = (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.json({ status: 400, message: "missing required field email" });
  }
};

module.exports = verify;
