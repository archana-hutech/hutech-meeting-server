const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSERNAME,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    dialect: "postgres",
    operatorsAliases: 0,
    logging: false,
    reconnect: {
      max_retries: 5,
      onRetry: function (count) {
        console.log("connection lost, trying to reconnect (" + count + ")");
      },
    },
    pool: {
      max: 5,
      min: 0,
    },
  }
);
const db = {
  sequelize,
  Sequelize,
  Organizations: require('../model/organization')(sequelize, Sequelize),
  Addresses: require('../model/address')(sequelize, Sequelize),
  Employees: require('../model/employee')(sequelize, Sequelize),
  Permission: require('../model/permission')(sequelize, Sequelize),
  Meeting: require('../model/meeting')(sequelize, Sequelize)
};

db.Organizations.hasMany(db.Employees, {
      foreignKey: 'orgId',
      targetKey: 'id'
});

db.Organizations.hasMany(db.Permission,{
    foreignKey: 'orgId',
    targetKey: 'id'
});

db.Permission.hasMany(db.Employees, {
      foreignKey: 'permissionId',
      targetKey: 'id'
});



module.exports = db;
