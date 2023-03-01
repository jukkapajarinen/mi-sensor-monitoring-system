import express from "express";
import SensorModel from "../models/SensorModel.js";

class SensorsController extends express.Router {
  constructor() {
    super();

    this.sensors = new SensorModel();

    this.get("/sensors", async (req, res) =>
      res.render("views/sensors", {
        availableDevices: JSON.stringify([], null, 2),
        savedDevices: JSON.stringify(await this.sensors.readAll(), null, 2),
      })
    );
  }
}

export default SensorsController;
