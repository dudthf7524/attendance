const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const company = sequelize.define('company', {
        company_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        company_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company_count: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company_ceo_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company_ceo_phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'company',
        underscored: true,
    });

    // 관계 설정
    company.associate = (models) => {
        company.hasMany(models.user, {
            foreignKey: 'company_code',
            sourceKey: 'company_code',
        });
        company.hasMany(models.workPlace, {
            foreignKey: 'company_code',
            sourceKey: 'company_code',
        });
        company.hasMany(models.vacation, {
            foreignKey: 'company_code',
            sourceKey: 'company_code',
        });
    };

    return company;
};
