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
        },
        { tableName: "organizations" }
    );
    return Organization;
};
