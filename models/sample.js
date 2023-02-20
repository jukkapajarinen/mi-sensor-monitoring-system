import { DataTypes } from "sequelize";
import db from "./db.js";

const sample = db.define(
  "samples",
  {
    battery: { type: DataTypes.INTEGER },
    temperature: { type: DataTypes.FLOAT },
    humidity: { type: DataTypes.FLOAT },
  },
  {
    freezeTableName: true,
  }
);

export default sample;
