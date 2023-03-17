const User = require("../models/userModel");

const { composeAvatar } = require("../../services/usersService");

const upload = (req, res, next) => {
  try {
    const user = new User(req.body);
    user.avatarURL = composeAvatar(req.file.path);

    user.save();
    return res.json({ status: 200 });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = upload;
