const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "police_help_system"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed", err);
  } else {
    console.log("MySQL Connected");
  }
});

// Get all cities
app.get("/api/cities", (req, res) => {
  db.query("SELECT * FROM cities ORDER BY city_name", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Get police stations by city
app.get("/api/police-stations/:cityId", (req, res) => {
  const cityId = req.params.cityId;

  const sql = `
    SELECT ps.*, c.city_name
    FROM police_stations ps
    JOIN cities c ON ps.city_id = c.city_id
    WHERE ps.city_id = ?
  `;

  db.query(sql, [cityId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
