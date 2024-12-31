const postService = require('../services/postService');

class PostController {
  // Tạo bài viết mới
  static async createPost(req, res) {
    try {
      const { title, category, languageId, content, excerpt, userId, image } = req.body;
      if (!title || !category || !languageId || !content || !excerpt || userId === 0) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required and must be valid!',
        });
      }
      
      const newPost = await postService.createPost({
        title,
        category,
        languageId,
        content,
        excerpt,
        userId,
        image,
      });
      
      return res.status(201).json({
        success: true,
        message: 'Post created successfully!',
        data: newPost,
      });
    } catch (error) {
      console.error('Error creating post:', error);
      return res.status(500).json({
        success: false,
        message: 'Error creating post',
        error: error.message,
      });
    }
  }

  static async deletePost(req, res) {
    try {
      const { id } = req.params;  // Lấy ID bài viết từ URL params

      // Kiểm tra nếu ID không hợp lệ
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Post ID is required',
        });
      }

      // Gọi service để xóa bài viết
      const result = await postService.deletePost(id);

      // Nếu không tìm thấy bài viết
      if (!result) {
        return res.status(404).json({
          success: false,
          message: 'Post not found',
        });
      }

      // Trả về thông báo thành công
      return res.status(200).json({
        success: true,
        message: 'Post deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      return res.status(500).json({
        success: false,
        message: 'Error deleting post',
        error: error.message,
      });
    }
  }

  static async addBlogContent(req, res) {
    try {
      const blog_id = req.params.blog_id;
      const { language_id, main_content, title } = req.body;

      // Kiểm tra đầu vào
      if (!language_id || !main_content || !title) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required!',
        });
      }

      // Gọi service để thêm BlogContent
      const newContent = await postService.addBlogContent({
        blog_id,
        language_id,
        main_content,
        title,
      });

      return res.status(201).json({
        success: true,
        message: 'Blog content added successfully!',
        data: newContent,
      });
    } catch (error) {
      console.error('Error adding blog content:', error);
      return res.status(500).json({
        success: false,
        message: 'Error adding blog content',
        error: error.message,
      });
    }
  }

  static async getBlogContents(req, res) {
    try {
      const { blog_id } = req.params; // Lấy blog_id từ URL params
  
      if (!blog_id) {
        return res.status(400).json({
          success: false,
          message: 'Blog ID is required!',
        });
      }
  
      const blogContents = await postService.getBlogContentsByBlogId(blog_id);
  
      return res.status(200).json({
        success: true,
        message: 'Blog contents retrieved successfully!',
        data: blogContents,
      });
    } catch (error) {
      console.error('Error retrieving blog contents:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Error retrieving blog contents',
        error: error.message,
      });
    }
  }
  
  static async updateBlogContent(req, res) {
    try {
      const { blog_id, content_id } = req.params; 
      const { main_content, title } = req.body; 
  
      if (!blog_id || !content_id) {
        return res.status(400).json({
          success: false,
          message: 'Blog ID and Content ID are required!',
        });
      }
  
      const updatedContent = await postService.updateBlogContent({
        blog_id,
        content_id,
        main_content,
        title,
      });
  
      return res.status(200).json({
        success: true,
        message: 'Blog content updated successfully!',
        data: updatedContent,
      });
    } catch (error) {
      console.error('Error updating blog content:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Error updating blog content',
        error: error.message,
      });
    }
  }
  
}


module.exports = PostController;
