const User = require("../models/userModel");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
  }
};

const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
  }
};

const getOneUserByToken = async (req, res) => {
  try {
    const user = await User.findOne({ token: req.params.token });
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { getUsers, getOneUser, getOneUserByToken };
