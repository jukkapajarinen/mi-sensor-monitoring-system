import express from "express";
import sensor from "../models/sensor.js";

const router = express.Router();

router.get("/dashboard", async (req, res) => {
  res.render("views/dashboard", {
    greeting: "Hello! 👋",
    sensorsData: JSON.stringify(await sensor.findAll({ include: "samples" })),
  });
});

export default router;
