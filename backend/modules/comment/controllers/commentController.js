const commentService = require('../services/commentService');
const responseUtils = require('utils/responseUtils');

const commentController = {
  getAll: async (req, res) => {
    try {
      const comments = await commentService.getAllComments();
      return responseUtils.ok(res, comments);
    } catch (error) {
      return responseUtils.error(res, error.message);
    }
  },
  create: async (req, res) => {
    try {
      console.log("Request body:", req.body); // Kiểm tra dữ liệu nhận được từ client
      const comment = await commentService.createComment(req.body);
      return responseUtils.created(res, comment);
    } catch (error) {
      console.error("Error:", error); // Log chi tiết lỗi
      return responseUtils.error(res, "Internal server error"); // Sửa lại để trả đúng thông báo
    }
  }
  
};

module.exports = commentController;
