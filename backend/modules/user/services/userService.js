// modules/user/services/userService.js
const { User } = require("models/user");

const userService = {
  createUser: async (data) => {
    return await User.create(data);
  },
  

  getAllUsers: async () => {
    return await User.findAll();
  },

  getUserById: async (id) => {
    return await User.findByPk(id);
  },

  updateUser: async (id, data) => {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    return await user.update(data);
  },

  deleteUser: async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    return await user.destroy();
  },
};

module.exports = userService;