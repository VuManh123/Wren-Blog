'use strict';

module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define('Language', {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true // Đảm bảo mã ngôn ngữ không bị trùng lặp
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    flag: DataTypes.STRING
  }, {
    tableName: 'Languages',  // Tên bảng khớp với migration
    underscored: false,       // Sử dụng underscore cho tên cột
    timestamps: false         // Bật tự động xử lý created_at và updated_at
  });

  Language.associate = function(models) {
    // Language has many BlogContents
    Language.hasMany(models.BlogContent, { foreignKey: 'language_id', as: 'blogContents' });
  };

  return Language;
};
