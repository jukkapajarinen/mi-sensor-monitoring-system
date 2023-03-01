import express from "express";
import SampleModel from "../models/SampleModel.js";
import SensorModel from "../models/SensorModel.js";

class DashboardController extends express.Router {
  constructor() {
    super();

    this.samples = new SampleModel();
    this.sensors = new SensorModel();

    this.get("/dashboard", async (req, res) => {
      res.render("views/dashboard", {
        sensorsData: JSON.stringify(await this.sensors.readAll(), null, 2),
        samplesData: JSON.stringify(await this.samples.readAll(), null, 2),
      });
    });
  }
}

export default DashboardController;
