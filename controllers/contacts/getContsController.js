const service = require("../../services/index");

const getConts = async (req, res, next) => {
  const { _id: userId } = req.user;
  let { skip = 0, limit = 10 } = req.query;

  skip = Number(skip);
  limit = Number(limit);

  try {
    const contacts = await service.getAllcontacts(userId);
    res.json({
      status: 200,
      data: contacts,
      skip,
      limit,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
    next(error);
  }
};

module.exports = getConts;
