"use strict";

const path = require("path");
const fs = require("fs");
const { Sequelize } = require("sequelize");

const db = {};
const dir = path.join(__dirname, "/model");
const basename = path.basename(__filename);

let sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  null,
  null,
  {
    replication: {
      read: [
        { host: process.env.SLAVE_DATABASE_HOST, port:process.env.SLAVE_DATABASE_PORT, username: process.env.SLAVE_DATABASE_USERNAME, password: process.env.SLAVE_DATABASE_PASSWORD  }
      ],
      write: { host: process.env.MASTER_DATABASE_HOST,port:process.env.MASTER_DATABASE_PORT, username: process.env.MASTER_DATABASE_USERNAME, password: process.env.MASTER_DATABASE_PASSWORD }
    },
    dialect: "mysql",
    pool: {
      max: 100,
      min: 10,
      acquire: 30000,
      idle: 10000
    }
  }
);

fs.readdirSync(dir)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(dir, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
