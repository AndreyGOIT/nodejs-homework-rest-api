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
      message: "User already exists",
      data: "Conflict",
    });
  }
  try {
    const newUser = new User({ email, password, subscription: "starter" });
    newUser.setPassword(password);

    await newUser.save();
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
