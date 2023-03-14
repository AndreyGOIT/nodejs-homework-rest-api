const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { NotAuthorisedError } = require("../services/errors");

const registration = async (email, password) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return response.status(409).json({
      status: "error",
      code: 409,
      message: "Email in use",
      data: "Conflict",
    });
  }
  try {
    const newUser = new User({ email, password, subscription: "starter" });
    newUser.setPassword(password);

    response.status(201).json({
      status: "success",
      code: 201,
      data: {
        message: "User created successfully",
      },
      user: newUser,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return response.status(400).json({
      status: "error",
      code: 400,
      message: "Invalid login or password",
      data: "Bad Request",
    });
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorisedError("Invalid password");
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return response.status(200).json({
    status: "OK",
    code: 200,
    data: { token },
  });
};

module.exports = {
  registration,
  login,
};
