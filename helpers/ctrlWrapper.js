const ctrlWrapper = (ctrl) => {
  const func = async (req, rews, next) => {
    try {
      await ctrl(req, rews, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.exports = ctrlWrapper;
