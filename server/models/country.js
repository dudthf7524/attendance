const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const country = sequelize.define('country', {
    country_code: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    country_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'country',
    timestamps: false,
  });

  // 관계 설정
  country.associate = (models) => {
    // department.hasMany(models.user, {
    //   foreignKey: 'department_code',
    //   sourceKey: 'department_code',
    // });

  };

  return country;
};
