import express from "express";
import SensorModel from "../models/SensorModel.js";

class SensorsController extends express.Router {
  constructor() {
    super();

    this.sensors = new SensorModel();

    this.get("/sensors", async (req, res) =>
      res.render("views/sensors", {
        savedSensors: await this.sensors.readAll(),
      })
    );

    this.post("/sensors", async (req, res) => {
      const action = req.body.action.split("_")[0];
      const id = req.body.action.split("_").pop();
      const name = req.body[`input_name_${id}`];
      const mac = req.body[`input_mac_${id}`];

      if (action === "create") {
        await this.sensors.create(name, mac);
      } else if (action === "edit") {
        await this.sensors.update(id, name, mac);
      } else if (action === "delete") {
        await this.sensors.delete(id);
      }

      res.render("views/sensors", {
        savedSensors: await this.sensors.readAll(),
      });
    });
  }
}

export default SensorsController;
