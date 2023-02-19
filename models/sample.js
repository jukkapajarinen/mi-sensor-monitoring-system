const { Sequelize } = require("sequelize");
const db = require("./db.js");
const { DataTypes } = Sequelize;

const sample = db.define('samples', {
  battery: { type: DataTypes.INTEGER },
  temperature: { type: DataTypes.FLOAT },
  humidity: { type: DataTypes.FLOAT }
}, {
  freezeTableName: true
});

module.exports = sample;