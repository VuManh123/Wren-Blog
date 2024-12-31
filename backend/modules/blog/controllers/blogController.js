const blogService = require("../services/blogService"); // Nhập blogService
const responseUtils = require("utils/responseUtils");

const blogController = {
  create: async (req, res) => {
    try {
      const blogData = {
        ...req.body,
        user_id: req.user.id // Lấy ID của Blog Owner từ JWT
      };
      const blog = await blogService.createBlog(blogData);
      return responseUtils.ok(res, blog);
    } catch (error) {
      return responseUtils.error(res, error.message);
    }
  },

  // Lấy tất cả bài viết
  getAllRequire: async (req, res) => {
    try {
      const blogs = await blogService.getAllBlogsRequired();
  
      // Định dạng lại dữ liệu để trả về
      const formattedBlogs = blogs.map(blog => ({
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        image: blog.image,
        content: blog.content,
        createdAt: blog.created_at,
        updatedAt: blog.updated_at,
        category: blog.category ? {
          id: blog.category.id,
          name: blog.category.name
        } : null,
        author: blog.author ? {
          id: blog.author.id,
          name: blog.author.name,
          profileImage: blog.author.profileImage
        } : null,
        blogContent: blog.contents?.map(content => ({
          id: content.id,
          title: content.title,
          introduction: content.introduction,
          mainContent: content.main_content,
          language: content.language ? {
            id: content.language.id,
            name: content.language.name
          } : null
        })) || []
      }));
  
      return responseUtils.ok(res, formattedBlogs);
    } catch (error) {
      return responseUtils.error(res, error.message);
    }
  },
  

  getAll: async (req, res) => {
    try {
      const blogs = await blogService.getAllBlogs();
      return responseUtils.ok(res, blogs);
    } catch (error) {
      return responseUtils.error(res, error.message);
    }
  },

  getById: async (req, res) => {
    try {
      const blog = await blogService.getBlogById(req.params.id);
      if (!blog) {
        return responseUtils.notFound(res);
      }
      return responseUtils.ok(res, blog);
    } catch (error) {
      return responseUtils.error(res, error.message);
    }
  },

  update: async (req, res) => {
    try {
      const blog = await blogService.updateBlog(req.params.id, req.body);
      return responseUtils.ok(res, blog);
    } catch (error) {
      if (error.message === 'Blog not found') {
        return responseUtils.notFound(res);
      }
      return responseUtils.error(res, error.message);
    }
  },

  delete: async (req, res) => {
    try {
      await blogService.deleteBlog(req.params.id);
      return responseUtils.noContent(res);
    } catch (error) {
      if (error.message === 'Blog not found') {
        return responseUtils.notFound(res);
      }
      return responseUtils.error(res, error.message);
    }
  },

  
};
module.exports = blogController;