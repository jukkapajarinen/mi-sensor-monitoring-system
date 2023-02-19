const { Sequelize } = require("sequelize");
const db = require("./db");
const sample = require("./sample");
const { DataTypes } = Sequelize;

const sensor = db.define('sensors', {
  name: { type: DataTypes.STRING },
  mac: { type: DataTypes.STRING }
}, {
  freezeTableName: true
});

sensor.hasMany(sample, {
  onDelete: 'cascade',
  foreignKey: {
    field: 'sensorId',
    allowNull: false,
}});

module.exports = sensor;