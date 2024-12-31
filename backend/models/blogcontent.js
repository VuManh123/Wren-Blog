'use strict';

module.exports = (sequelize, DataTypes) => {
  const BlogContent = sequelize.define('BlogContent', {
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Blogs',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    introduction: DataTypes.STRING,
    main_content: DataTypes.TEXT,
    language_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Languages',
        key: 'id'
      }
    },
    root: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    tableName: 'BlogContents', // Đảm bảo tên bảng khớp với tên trong migration
    underscored: true,        // Dùng underscore cho tên cột
    timestamps: true          // Tự động xử lý created_at và updated_at
  });

  BlogContent.associate = function(models) {
    // BlogContent belongs to a Blog
    BlogContent.belongsTo(models.Blog, { foreignKey: 'blog_id', as: 'blog' });

    // BlogContent belongs to a Language
    BlogContent.belongsTo(models.Language, { foreignKey: 'language_id', as: 'language' });
  };

  return BlogContent;
};
