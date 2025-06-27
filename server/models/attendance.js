const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const attendance = sequelize.define('attendance', {
        attendance_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        start_time: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        end_time: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        rest_start_time: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        rest_end_time: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        attendance_start_date: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        attendance_start_time: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        attendance_start_state: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        attendance_end_date: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },
        attendance_end_time: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },
        attendance_end_state: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },

    }, {
        timestamps: false,
        tableName: 'attendance',
    });

    // 관계 설정
    attendance.associate = (models) => {
        attendance.belongsTo(models.user, {
            foreignKey: 'user_code',
            targetKey: 'user_code',
        });
    };

    return attendance;
};
