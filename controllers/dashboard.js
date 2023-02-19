const express = require('express');
const sensor = require('../models/sensor');
const sample = require('../models/sample');
const router = express.Router();

router.get('/dashboard', async (req, res) => {
  res.render('views/dashboard', {
    greeting: "Hello! 👋",
    sensorsData: JSON.stringify(
      await sensor.findAll({include: 'samples'})
    )
  });
});

module.exports = router;