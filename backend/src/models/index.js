const Sequelize = require("sequelize");
require("dotenv").config();

const config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || "mysql",
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User")(sequelize, Sequelize.DataTypes);
db.Store = require("./Store")(sequelize, Sequelize.DataTypes);
db.Rating = require("./Rating")(sequelize, Sequelize.DataTypes);

module.exports = db;
