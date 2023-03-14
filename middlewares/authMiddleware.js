// const jwt = require("jsonwebtoken");
// const { User } = require("../models/userModel");
// const { NotAuthorisedError } = require("../services/schemas/errors");

// const authMiddleware = async (req, res, next) => {
//   try {
//     const { tokenType, token } = require.headers["authorization"].split(" ");
//     console.log(tokenType, token);

//     if (!token) {
//       next(new NotAuthorisedError("Please provide a valid token"));
//     }

//     const user = jwt.decode(token, process.env.JWT_SECRET);
//     const u = await User.findById(user.id);

//     if (!u) next(new NotAuthorisedError("Invalid token"));
//     if (u.token !== token) next(NotAuthorisedError("Invalid token"));

//     req.user = user;
//     req.token = token;
//     next();
//   } catch (error) {
//     next(new NotAuthorisedError("Invalid token"));
//   }
// };
// module.exports = { authMiddleware };
