const language = require("./language");

module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    excerpt: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.STRING,
    status: DataTypes.STRING,
    language: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    created_at: {  // Dùng 'created_at' thay vì 'createdAt'
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {  // Dùng 'updated_at' thay vì 'updatedAt'
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    category_id: DataTypes.INTEGER
  }, {
    tableName: 'Blogs',  // Đảm bảo rằng tên bảng là 'Blogs'
    underscored: true,  // Bật 'underscored' để Sequelize tự động ánh xạ 'created_at' và 'updated_at'
    timestamps: true,  // Cho phép Sequelize tự động xử lý 'created_at' và 'updated_at'
  });

  Blog.associate = function(models) {
    Blog.belongsTo(models.User, { foreignKey: 'user_id', as: 'author' });
    Blog.hasMany(models.BlogContent, { foreignKey: 'blog_id', as: 'contents' });
    Blog.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
  };

  return Blog;
};
