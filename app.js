import dotenv from "dotenv";
import express from "express";
import dashboardController from "./controllers/dashboard.js";
import sensorsController from "./controllers/sensors.js";

dotenv.config();

const app = express();

async function main() {
  console.log("::: Mi Sensor Monitoring System :::");
  app.set("view engine", "ejs");
  app.set("views", ".");
  app.use("/", dashboardController);
  app.use("/", sensorsController);
  app.get("*", (req, res) => res.redirect("/dashboard"));
  app.listen(
    process.env.NODE_DOCKER_PORT,
    console.log("Listening on port:", process.env.NODE_LOCAL_PORT)
  );
};

main();
