const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { NotAuthorisedError } = require("./errors");

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
    const newUser = new User({ email, password });
    newUser.setPassword(password);

    newUser.save();

    return response.status(201).json({
      status: "success",
      code: 201,
      data: {
        message: "User created successfully",
      },
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

  try {
    const { _id: id } = user;

    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("login-token", token);
    return response.status(200).json({
      status: "OK",
      code: 200,
      data: { token },
    });
  } catch (error) {
    console.log(error.message);
  }
};

const logout = async (id) => {
  const user = await User.findOne({ id });

  if (!user) {
    return response.status(401).json({
      status: "error",
      code: 401,
      message: "Not authorized",
    });
  }
  try {
    user.token = null;
    return response.status(202).json({
      message: "No content",
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  registration,
  login,
  logout,
};
