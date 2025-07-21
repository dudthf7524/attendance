const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const department = sequelize.define('department', {
    department_code: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    department_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'department',
    timestamps: false,
  });

  // 관계 설정
  department.associate = (models) => {
    department.hasMany(models.userInfo, {
      foreignKey: 'department_code',
      sourceKey: 'department_code',
    });

  };

  return department;
};
