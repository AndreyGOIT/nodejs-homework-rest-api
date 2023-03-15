const { getUsers, getOneUser } = require("../../services/usersService");

const getAllUsers = async (req, res, next) => {
  //   const { _id: userId } = req.user;
  //   let { skip = 0, limit = 10 } = req.query;

  //   skip = Number(skip);
  //   limit = Number(limit);

  try {
    const contacts = await getUsers();
    return res.json({
      status: 200,
      data: contacts,
      //   skip,
      //   limit,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userById = await getOneUser(id);

    return res.json({
      status: 200,
      data: userById,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
    next(error);
  }
};

module.exports = { getAllUsers, getUserById };
