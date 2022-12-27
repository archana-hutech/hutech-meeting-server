const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize)  => {
    const Organization = sequelize.define(
        "organizations",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            name: DataTypes.STRING,
            email: { type: DataTypes.STRING, allowNull: false, unique: true },
            website: { type: DataTypes.STRING, allowNull: false },
            phone: { type: DataTypes.STRING, allowNull: false },
            isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
            city: {type:DataTypes.STRING, allowNull:false},
            state: {type:DataTypes.STRING, allowNull:false},
            country:{type:DataTypes.STRING, defaultValue: "INDIA"},
            coordinates: {
                type: DataTypes.JSONB,
                defaultValue:{ north: 28.7041, east: 77.1025 }, },
            pin: {type:DataTypes.STRING, allowNull:false},
        },
        { tableName: "organizations" }
    );
    return Organization;
};
