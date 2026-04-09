require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());

// ✅ DATABASE CONNECTION
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("❌ DB Error:", err);
  } else {
    console.log("✅ MySQL Connected");
  }
});

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server is working");
});

// ✅ LOGIN ROUTE (IMPORTANT)
app.post("/login", (req, res) => {
  const { email } = req.body;

  console.log("📩 Login request:", email);

  if (!email || !email.endsWith("@kl.his.edu.my")) {
    return res.status(400).json({ message: "Use school email only" });
  }

  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    return res.json({
      message: "Login success",
      user: results[0],
    });
  });
});

// ✅ START SERVER (ONLY ONCE)
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
