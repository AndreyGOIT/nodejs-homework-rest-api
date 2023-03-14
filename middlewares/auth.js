const passport = require("passport");

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    console.log("user", user);

    if (err || !user) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthurized",
      });
    }

    req.user = user;

    next();
  })(req, res, next);
};

module.exports = auth;
