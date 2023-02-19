const dotenv = require("dotenv");
const mysql = require('mysql');
const express = require('express');

dotenv.config();
const connection = mysql.createConnection({
  host: process.env.MARIADB_HOST,
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE
});
connection.connect(err =>
  err ? console.error('error connecting: ' + err.stack) :
  console.log('connected as id ' + connection.threadId)
);

const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname);

app.get('/', function(req, res) {
  res.render('views/index', {
    greeting: "Hello! 👋",
    db_name: process.env.MARIADB_DATABASE,
    db_conn: connection.threadId ? "connected" : "not connected"
  });
});

app.listen(8080);
console.log('Server is listening on port 8080');