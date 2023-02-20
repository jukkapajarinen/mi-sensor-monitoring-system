import express from "express";

const router = express.Router();

router.get("/dashboard", async (req, res) => {
  res.render("views/dashboard", {
    greeting: "Hello! 👋",
    sensorsData: JSON.stringify([]),
  });
});

export default router;
