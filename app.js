import dotenv from "dotenv";
import express from "express";
import bodyparser from "body-parser";
import helmet from "helmet";
import DashboardController from "./controllers/DashboardController.js";
import SensorsController from "./controllers/SensorsController.js";

dotenv.config();

const app = new express();

async function main() {
  console.log("::: Mi Sensor Monitoring System :::");
  app.set("view engine", "ejs");
  app.set("views", ".");
  app.use(helmet());
  app.use(bodyparser.urlencoded({extended:true}));
  app.use("/", new DashboardController());
  app.use("/", new SensorsController());
  app.get("*", (req, res) => res.redirect("/dashboard"));
  app.listen(
    process.env.NODE_DOCKER_PORT,
    console.log("Listening on port:", process.env.NODE_LOCAL_PORT)
  );
}

main();
