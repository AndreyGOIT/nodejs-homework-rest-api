const {
  getUsers,
  getOneUser,
  getOneUserByToken,
} = require("../../services/usersService");

const getAllUsers = async (req, res, next) => {
  //   const { _id: userId } = req.user;
  //   let { skip = 0, limit = 10 } = req.query;

  //   skip = Number(skip);
  //   limit = Number(limit);

  try {
    const users = await getUsers();
    console.log(users);
    return res.json({
      status: "200",
      data: users,
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

const getUserByToken = async (req, res, next) => {
  try {
    const { token } = req.params;
    const userByToken = await getOneUserByToken(token);

    return res.json({
      status: 200,
      data: userByToken,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
    next(error);
  }
};

module.exports = { getAllUsers, getUserById, getUserByToken };
