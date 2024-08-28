import express from "express";
import SampleModel from "../models/SampleModel.js";
import SensorModel from "../models/SensorModel.js";

class DashboardController extends express.Router {
  constructor() {
    super();

    this.samples = new SampleModel();
    this.sensors = new SensorModel();

    this.get("/dashboard", async (req, res) => {
      const sensors = await this.sensors.readAll();
      const samples = await this.samples.readAll();
      const sensorsWithSamples = sensors.map(sensor => {
        return {
          ...sensor,
          samples: samples.filter(sample => sample.sensor_id === sensor.id)
        }
      });

      res.render("views/dashboard", {
        dashboardData: sensorsWithSamples
      });
    });
  }
}

export default DashboardController;
