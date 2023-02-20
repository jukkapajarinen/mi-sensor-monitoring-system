import express from "express";

const router = express.Router();

router.get("/sensors", async (req, res) => {
  res.render("views/sensors");
});

export default router;
