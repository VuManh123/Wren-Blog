const commentService = require('../services/commentService');
const responseUtils = require('utils/responseUtils');

const commentController = {
  getAll: async (req, res) => {
    try {
      const comments = await commentService.getAllComments();
      return responseUtils.ok(res, comments);
    } catch (error) {
      console.error("Error fetching comments:", error);  // Log chi tiết lỗi
      return responseUtils.error(res, error.message || "Internal server error");
    }
  },
  
  create: async (req, res) => {
    try {
      console.log("Request body:", req.body);  // Kiểm tra dữ liệu nhận được từ client
      const comment = await commentService.createComment(req.body);
      return responseUtils.created(res, comment);
    } catch (error) {
      console.error("Error creating comment:", error);  // Log chi tiết lỗi
      return responseUtils.error(res, error.message || "Internal server error");
    }
  }
};

module.exports = commentController;
