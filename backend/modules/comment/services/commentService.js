const db = require('models'); // Đảm bảo rằng db đã được import đúng

const commentService = {
  getAllComments: async () => {
    try {
      return await db.Comment.findAll({
        attributes: ['content', 'created_at', 'blog_id'],
        include: [{
          model: db.User,
          as: 'user',
          attributes: ['name', 'profileImage'],
        }],
        order: [['created_at', 'ASC']]
      });
    } catch (error) {
      throw new Error('Error fetching comments: ' + error.message);
    }
  },
  
  createComment: async (data) => {
    if (!data.content || !data.blog_id) {
      throw new Error("Content and blog_id are required");
    }
    
    try {
      return await db.Comment.create(data);
    } catch (error) {
      throw new Error('Error creating comment: ' + error.message);
    }
  }
};

module.exports = commentService;

