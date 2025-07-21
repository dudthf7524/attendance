const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const educationLevel = sequelize.define('education_level', {
    education_level_code: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    education_level_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'education_level',
    timestamps: false,
  });

  // 관계 설정
  educationLevel.associate = (models) => {
    educationLevel.hasMany(models.userInfo, {
      foreignKey: 'education_level_code',
      sourceKey: 'education_level_code',
    });

  };

  return educationLevel;
};
