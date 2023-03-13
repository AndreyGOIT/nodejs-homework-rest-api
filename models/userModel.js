const { model, Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

const users = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
});

users.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

users.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = model("user", users);
