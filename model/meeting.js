const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Meetings = sequelize.define(
        "meetings",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            title: DataTypes.STRING,
            inviteTo: DataTypes.ARRAY(DataTypes.STRING),
            date: { type: DataTypes.DATE, allowNull: false },
            time: { type: DataTypes.TIME, allowNull: false },
            meetLink: { type: DataTypes.STRING, allowNull: false },
        },
        { tableName: "meetings" }
    );
    return Meetings;
};
