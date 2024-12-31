const { Blog, BlogContent, Language ,Comment } = require('../../../models');  // Đảm bảo sử dụng model đúng

class PostService {
  static async createPost({ title, category, languageId, content, excerpt, userId, image }) {
    try {
      // Kiểm tra nếu languageId không có giá trị
      if (!languageId) {
        throw new Error('Language ID is required');
      }

      // Lấy tên của language từ bảng Language
      const language = await Language.findByPk(languageId);  // Sửa thành Language (chứ không phải Languages)
      if (!language) {
        throw new Error('Language not found');
      }

      // Kiểm tra nếu categoryId không hợp lệ
      if (!category) {
        throw new Error('Category ID is required');
      }

      // Tạo bài viết mới trong bảng Blogs
      const newPost = await Blog.create({
        title,
        excerpt,
        content,
        image,
        status: 'draft', // Nếu không có status từ người dùng, mặc định là 'draft'
        user_id: userId,
        category_id: category,  // Lưu trực tiếp categoryId vào bảng Blogs
        language: language.name,  // Sử dụng tên ngôn ngữ thay vì ID
      });

      // Tạo nội dung bài viết trong bảng BlogContents
      if (content) {
        await BlogContent.create({
          blog_id: newPost.id,
          title,
          main_content: content,
          language_id: languageId, // Lưu language_id vào bảng BlogContent
          root: true, // Có thể đặt root là true cho nội dung chính
        });
      }

      return newPost;
    } catch (error) {
      console.error('Error in creating post:', error);
      throw error;
    }
  }

  static async deletePost(postId) {
    try {
      // Kiểm tra bài viết có tồn tại trong cơ sở dữ liệu không
      const post = await Blog.findByPk(postId);
      if (!post) {
        return null;  // Nếu bài viết không tồn tại, trả về null
      }
      await Comment.destroy({
        where: {
          blog_id: postId,
        },
      });
      // Xóa nội dung bài viết (BlogContent)
      await BlogContent.destroy({
        where: {
          blog_id: postId,
        },
      });

      // Xóa bài viết từ bảng Blogs
      await post.destroy();

      return post;  // Trả về bài viết đã bị xóa
    } catch (error) {
      console.error('Error in deleting post:', error);
      throw error;
    }
  }

  static async addBlogContent({ blog_id, language_id, main_content, title }) {
    try {
      // Kiểm tra blog có tồn tại không
      const blog = await Blog.findByPk(blog_id);
      if (!blog) {
        throw new Error('Blog not found');
      }

      // Kiểm tra ngôn ngữ đã tồn tại cho blog này chưa
      const existingContent = await BlogContent.findOne({
        where: { blog_id, language_id },
      });
      if (existingContent) {
        throw new Error('This language already exists for this blog');
      }

      // Kiểm tra nếu ngôn ngữ hợp lệ
      const language = await Language.findByPk(language_id);
      if (!language) {
        throw new Error('Language not found');
      }

      // Thêm BlogContent mới
      const newContent = await BlogContent.create({
        blog_id,
        language_id,
        main_content,
        title,
        root: false,
      });

      return newContent;
    } catch (error) {
      console.error('Error in addBlogContent service:', error.message);
      throw error;
    }
  }

  static async getBlogContentsByBlogId(blog_id) {
    try {
      const contents = await BlogContent.findAll({
        where: { blog_id },
        include: [
          {
            model: Language,
            as: 'language', // Đảm bảo sử dụng alias 'as'
            attributes: ['id', 'name'], // Chỉ lấy các cột cần thiết
          },
        ],
      });
      return contents;
    } catch (error) {
      console.error('Error in getBlogContentsByBlogId service:', error.message);
      throw error;
    }
  }
  

  static async updateBlogContent({ content_id, blog_id, main_content, title }) {
    try {
      const blogContent = await BlogContent.findOne({
        where: { id: content_id, blog_id },
      });
  
      if (!blogContent) {
        throw new Error('Blog content not found for the specified blog and content ID');
      }
  
      // Cập nhật nội dung
      blogContent.main_content = main_content || blogContent.main_content;
      blogContent.title = title || blogContent.title;
  
      await blogContent.save();
  
      return blogContent;
    } catch (error) {
      console.error('Error in updateBlogContent service:', error.message);
      throw error;
    }
  }
  
}

module.exports = PostService;
