const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const vacation = sequelize.define('vacation', {
        vacation_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        company_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        start_date: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        end_date: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        vacation_state: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0, // 대기 상태를 기본값으로 설정
        },
    }, {
        timestamps: false,
        tableName: 'vacation', 
    });

    // 관계 설정
    vacation.associate = (models) => {
        vacation.belongsTo(models.user, {
            foreignKey: 'user_code',
            targetKey: 'user_code',
        });
        vacation.belongsTo(models.company, {
            foreignKey: 'company_code',
            targetKey: 'company_code',
        });
    };

    return vacation;
};
