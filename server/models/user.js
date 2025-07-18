const { DataTypes } = require('sequelize');
const auth = require('./auth');

module.exports = (sequelize) => {
  const user = sequelize.define('user', {
    user_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    auth_code: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "A3",
    },
   
    company_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    underscored: true,
    tableName: 'user',
  });
  // 관계 설정
  user.associate = (models) => {
    user.belongsTo(models.auth, {
      foreignKey: 'auth_code',
      targetKey: 'auth_code',
    });
    user.belongsTo(models.company, {
      foreignKey: 'company_code',
      targetKey: 'company_code',
    });
    user.hasOne(models.time, {
      foreignKey: 'user_code',
      sourceKey: 'user_code',
    });
    user.hasMany(models.attendance, {
      foreignKey: 'user_code',
      sourceKey: 'user_code',
    });
    user.hasMany(models.vacation, {
      foreignKey: 'user_code',
      sourceKey: 'user_code',
    });
    user.hasOne(models.userInfo, {
      foreignKey: 'user_code',
      sourceKey: 'user_code',
    });

  };
  return user;
};
