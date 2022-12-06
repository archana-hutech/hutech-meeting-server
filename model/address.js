const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define(
        "addresses",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            landmark: {type: DataTypes.STRING},
            city: {type: DataTypes.STRING, defaultValue: "Banglore"},
            state: {type: DataTypes.STRING, defaultValue: "Karnataka"},
            country: { type: DataTypes.STRING, defaultValue: "India"},
            coordinates: {
                type: DataTypes.JSONB,
                defaultValue: { north: 28.7041, east: 77.1025 },
            },
            pin: DataTypes.STRING,
        },
        { tableName: "addresses" }
    );
    return Address;
};
