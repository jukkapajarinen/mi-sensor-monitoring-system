const dotenv = require("dotenv");
const express = require('express');
const db = require('./models/db');
const dashboardController = require('./controllers/dashboard');

dotenv.config();

console.log('::: Mi Sensor Monitoring System :::');

db.authenticate().then(() => {
  console.log('Connection has been established successfully.');
  db.sync();
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname);
app.use('/', dashboardController);
app.get('*', (req, res) => res.redirect('/dashboard'));
app.listen(process.env.NODE_DOCKER_PORT,
  console.log('Listening on port:', process.env.NODE_LOCAL_PORT)
);