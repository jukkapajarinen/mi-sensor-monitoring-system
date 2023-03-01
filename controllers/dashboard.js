import express from "express";
import SampleModel from "../models/SampleModel.js";
import SensorModel from "../models/SensorModel.js";

const router = express.Router();
const samples = new SampleModel();
const sensors = new SensorModel();

router.get("/dashboard", async (req, res) => {
  res.render("views/dashboard", {
    sensorsData: JSON.stringify(await sensors.readAll(), null, 2),
    samplesData: JSON.stringify(await samples.readAll(), null, 2),
  });
});

export default router;
