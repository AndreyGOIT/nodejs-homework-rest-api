const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { NotAuthorisedError } = require("../services/errors");

const registration = async (email, password) => {
  const user = new User({ email, password: await bcrypt.hash(password, 10) });

  await user.save();
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotAuthorisedError(`User with email ${email} not found`);
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorisedError("Invalid password");
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  return token;
};

module.exports = {
  registration,
  login,
};
