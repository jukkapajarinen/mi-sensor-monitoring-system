import dotenv from "dotenv";
import express from "express";
import db from "./models/db.js";
import dashboardController from "./controllers/dashboard.js";

dotenv.config();

const path = process.argv[1].replace("/app.js", "");
const app = express();

const main = async () => {
  console.log("::: Mi Sensor Monitoring System :::");

  try {
    await db.authenticate();
    db.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  app.set("view engine", "ejs");
  app.set("views", path);
  app.use("/", dashboardController);
  app.get("*", (req, res) => res.redirect("/dashboard"));
  app.listen(
    process.env.NODE_DOCKER_PORT,
    console.log("Listening on port:", process.env.NODE_LOCAL_PORT)
  );
};

main();
