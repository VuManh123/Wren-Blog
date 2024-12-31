const db = require('models'); // Đảm bảo rằng db đã được import đúng

const commentService = {
  getAllComments: async () => {
    return await db.Comment.findAll({
      attributes: ['content', 'created_at', 'blog_id'],  // Chọn các trường cần thiết từ bảng Comments
      include: [{
        model: db.User,
        as: 'user',
        attributes: ['name', 'profileImage'],  // Chọn các trường cần thiết từ bảng Users
      }],
      order: [['created_at', 'ASC']]  // Có thể sắp xếp theo ngày tạo (tuỳ theo yêu cầu)
    });
  },
  createComment: async (data) => {
    return await db.Comment.create(data);
  }
};

module.exports = commentService;
