const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const workPlace = sequelize.define('work_place', {
        work_place_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location_latitude: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        location_hardness: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        radius: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        company_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'work_place',
        timestamps: false,
    });

    // 관계 설정
    workPlace.associate = (models) => {
        workPlace.belongsTo(models.company, {
            foreignKey: 'company_code',
            targetKey: 'company_code',
        });
    };

    return workPlace;
};
