const Sequelize = require("sequelize");
const meeting = require("../model/meeting");
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
  Meeting: require('../model/meeting')(sequelize, Sequelize),
  Media: require('../model/media')(sequelize,Sequelize)
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
db.Employees.belongsTo(db.Permission)

db.Organizations.hasMany(db.Meeting, {
     foreignKey: 'orgId',
     targetKey: 'id'
});

db.Employees.hasMany(db.Meeting, {
  foreignKey: 'hostId',
  targetKey: 'id'
});

db.Employees.hasMany(db.Addresses, {
    foreignKey: 'employeeId',
    targetKey: 'id'
});

module.exports = db;
