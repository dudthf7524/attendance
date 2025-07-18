const { DataTypes } = require('sequelize');
const auth = require('./auth');

module.exports = (sequelize) => {
    const userInfo = sequelize.define('user_info', {
        user_info_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        country_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        department_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        education_level_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_nickname: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        user_hire_date: {
            type: DataTypes.STRING, // 날짜를 'YYYY-MM-DD' 형식의 문자열로 저장
            allowNull: false,
            defaultValue: "2000-01-01",
        },
        user_position: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '사원', // 기본값을 '사원'으로 설정
        },
        user_birth_date: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        user_annual_leave: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        user_blood_type: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        user_phone: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        user_postcode: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        user_address_basic: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        user_address_detail: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
    }, {
        underscored: true,
        tableName: 'user_info',
    });

    // 관계 설정
    userInfo.associate = (models) => {
        userInfo.belongsTo(models.user, {
            foreignKey: 'user_code',
            targetKey: 'user_code',
        });
    };

    return userInfo;
};
