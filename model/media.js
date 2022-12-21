const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize)  => {
    const Media = sequelize.define(
        "media",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            mediaType:DataTypes.STRING,
            // mediaType:{ 
            //     type: DataTypes.ENUM,
            //     values: ['IMAGE', 'VIDEO', 'DOCUMENT', 'BLOB', 'AUDIO'],
            //      } ,
            fileName: DataTypes.STRING,
            fileType: DataTypes.STRING,
            fileExtension: DataTypes.STRING,
            fileData: DataTypes.BLOB,
            fileString: DataTypes.TEXT,
            fileLink: { type: DataTypes.STRING, allowNull: true}
        },
        { tableName: "media" }
    );
    return Media;
};
