// models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profileImage: DataTypes.STRING,
    bio: DataTypes.TEXT,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    underscored: false,  // Sử dụng camelCase cho tên các trường (ví dụ: createdAt, updatedAt)
    timestamps: false     // Không sử dụng các trường createdAt và updatedAt mặc định của Sequelize
  });

  User.associate = (models) => {
    User.hasMany(models.Blog, { foreignKey: 'user_id', as: 'blogs' });
  };

  return User;
};
