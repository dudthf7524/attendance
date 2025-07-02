const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const companyType = sequelize.define('company_type', {
        company_type_code: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        company_type_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'company_type',
        timestamps: false,
    });

    // 관계 설정
    companyType.associate = (models) => {
        // auth.hasMany(models.user, {
        //     foreignKey: 'auth_code',
        //     sourceKey: 'auth_code',
        // });

    };

    return companyType;
};
