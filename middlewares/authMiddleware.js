const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const { NotAuthorizedError } = require("../services/schemas/errors");

const authMiddleware = async (req, res, next) => {
  try {
    const { tokenType, token } = require.headers["authorization"].split(" ");
    console.log(tokenType, token);

    if (!token) {
      next(new NotAuthorizedError("Please provide a valid token"));
    }

    const user = jwt.decode(token, process.env.JWT_SECRET);
    const u = await User.findById(user.id);

    if (!u) next(new NotAuthorizedError("Invalid token"));
    if (u.token !== token) next(NotAuthorizedError("Invalid token"));

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    next(new NotAuthorizedError("Invalid token"));
  }
};
module.exports = { authMiddleware };
