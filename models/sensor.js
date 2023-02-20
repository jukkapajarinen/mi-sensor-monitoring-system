import { DataTypes } from "sequelize";
import db from "./db.js";
import sample from "./sample.js";

const sensor = db.define(
  "sensors",
  {
    name: { type: DataTypes.STRING },
    mac: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
  }
);

sensor.hasMany(sample, {
  onDelete: "cascade",
  foreignKey: {
    field: "sensorId",
    allowNull: false,
  },
});

export default sensor;
