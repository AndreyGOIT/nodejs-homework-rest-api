const { getOneUserByToken } = require("../../services/usersService");

const verification = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const user = await getOneUserByToken(verificationToken);

    user.verificationToken = null;
    user.token = true;
    user.save();

    return res.json({
      status: 200,
      message: "Verification successful",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
    next(error);
  }
};

module.exports = verification;
