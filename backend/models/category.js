'use strict';

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true // Tên danh mục phải là duy nhất
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true // Slug phải là duy nhất
    },
    imageUrl: DataTypes.STRING,
    description: DataTypes.TEXT,
    articleCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0 // Giá trị mặc định cho số lượng bài viết
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'Categories',  // Đảm bảo tên bảng khớp với migration
    underscored: false,        // Sử dụng định dạng snake_case
    timestamps: false          // Bật tự động xử lý created_at và updated_at
  });

  Category.associate = function(models) {
    // Một Category có nhiều Blogs
    Category.hasMany(models.Blog, { foreignKey: 'category_id', as: 'blogs' });
  };

  return Category;
};
