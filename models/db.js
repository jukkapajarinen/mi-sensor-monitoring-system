const dotenv = require("dotenv");
const { Sequelize } = require('sequelize');

dotenv.config();

console.log(process.env);

const db = new Sequelize(
  process.env.MARIADB_DATABASE,
  process.env.MARIADB_USER,
  process.env.MARIADB_PASSWORD, {
    host: process.env.MARIADB_HOST,
    dialect: 'mariadb',
    sync: { force: true }
  }
);

module.exports = db;