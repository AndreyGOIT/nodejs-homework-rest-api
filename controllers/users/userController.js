const userController = async (req, res, next) => {
  try {
    res.json({ succes: true, user: req.user });
  } catch (error) {
    next(error);
  }
};

module.exports = userController;
