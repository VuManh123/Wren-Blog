const db = require("models");
const User = db.User; // Nhập mô hình User
const responseUtils = require("utils/responseUtils");

const userController = {
  create: async (req, res) => {
    try {
      const userData = req.body;

      // Kiểm tra email đã tồn tại chưa
      const emailExists = await User.findOne({ where: { email: userData.email } });
      const nameExists = await User.findOne({ where: { username: userData.username } });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      if (nameExists) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Nếu không tồn tại, tiếp tục tạo tài khoản
      const user = await User.create(userData);
      return responseUtils.ok(res, user);
    } catch (error) {
      return responseUtils.error(res, error.message);
    }
  },

  getAll: async (req, res) => {
    try {
      const users = await User.findAll();
      return responseUtils.ok(res, users);
    } catch (error) {
      return responseUtils.error(res, error.message);
    }
  },

  getById: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return responseUtils.notFound(res);
      }
      return responseUtils.ok(res, user);
    } catch (error) {
      return responseUtils.error(res, error.message);
    }
  },

  update: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return responseUtils.notFound(res);
      }

      await user.update(req.body);
      return responseUtils.ok(res, user);
    } catch (error) {
      return responseUtils.error(res, error.message);
    }
  },

  delete: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return responseUtils.notFound(res);
      }

      await user.destroy();
      return responseUtils.noContent(res);
    } catch (error) {
      return responseUtils.error(res, error.message);
    }
  },
};

module.exports = userController;