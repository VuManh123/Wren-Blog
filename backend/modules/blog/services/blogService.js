const db = require("models");
const Blog = db.Blog;

const blogService = {
  createBlog: async (blogData) => {
    return await Blog.create(blogData);
  },

  getAllBlogs: async () => {
    return await Blog.findAll({
      include: { model: db.User, as: 'author', attributes: ['username'] },
    });
  },

  getAllBlogsRequired: async () => {
    return await db.Blog.findAll({
      include: [
        {
          model: db.BlogContent,
          as: 'contents', // Sử dụng alias 'contents' đã định nghĩa
          attributes: ['id', 'title', 'language_id', 'introduction', 'main_content'],
          include: [
            {
              model: db.Language,
              as: 'language', // Sử dụng alias 'language' đã định nghĩa
              attributes: ['id', 'name']
            }
          ]
        },
        {
          model: db.Category,
          as: 'category', // Sử dụng alias 'category' đã định nghĩa
          attributes: ['id', 'name']
        },
        {
          model: db.User,
          as: 'author', // Sử dụng alias 'author' đã định nghĩa
          attributes: ['id', 'name', 'profileImage']
        }
      ],
      attributes: [
        'id',
        'title',
        'slug',
        'excerpt',
        'image',
        'content',
        'created_at',
        'updated_at',
        'category_id'
      ]
    });
  },
  
  

  getBlogById: async (id) => {
    return await Blog.findByPk(id, {
      include: { model: db.User, as: 'author', attributes: ['username'] },
    });
  },

  updateBlog: async (id, blogData) => {
    const blog = await Blog.findByPk(id);
    if (!blog) {
      throw new Error('Blog not found');
    }
    return await blog.update(blogData);
  },

  deleteBlog: async (id) => {
    const blog = await Blog.findByPk(id);
    if (!blog) {
      throw new Error('Blog not found');
    }
    await blog.destroy();
  },

  getBlogByUserId: async (id) => {
    
  }
};

module.exports = blogService;
