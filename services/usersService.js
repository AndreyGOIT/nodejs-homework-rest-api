const { User } = require("../models/userModel");

const RequestError = require("../helpers/RequestError");

const getUsers = async (req, res) => {
  try {
    console.log(User);
    const users = await User.find();
    if (!users) {
      throw RequestError(404, "Not found any users");
    }
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
  }
};

const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw RequestError(404, "Not found");
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
  }
};

const getOneUserByToken = async (req, res) => {
  try {
    const user = await User.findOne({ token: req.params.token });
    if (!user) {
      throw RequestError(404, "Not found");
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
  }
};

const composeAvatar = async (req, res) => {
  console.log(req.file.path);
  res.status(200).json();
};

module.exports = { getUsers, getOneUser, getOneUserByToken, composeAvatar };
