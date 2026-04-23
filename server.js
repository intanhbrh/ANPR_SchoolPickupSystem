require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

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

// ✅ SENDGRID SETUP
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server is working");
});

// ✅ SEND OTP ROUTE
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email || !email.endsWith("@kl.his.edu.my")) {
    return res.status(400).json({ error: "Use school email only" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(404).json({ error: "Email not registered" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    db.query(
      "INSERT INTO otp_codes (email, otp_code, expires_at) VALUES (?, ?, ?)",
      [email, otp, expiresAt],
      async (err) => {
        if (err) return res.status(500).json({ error: "Failed to save OTP" });

        try {
          await sgMail.send({
            to: email,
            from: process.env.EMAIL_USER,
            subject: "Your ANPR Login Code",
            html: `
              <div style="font-family: Arial; max-width: 480px; margin: auto; padding: 32px; border: 1px solid #eeeeee; border-radius: 8px;">
                <h2 style="color: #00A389;">ANPR Vehicle Verification System</h2>
                <p>Your OTP code:</p>
                <h1 style="letter-spacing: 8px; color: #1A1A1A; background: #F5F5F5; padding: 16px; border-radius: 6px; text-align: center;">${otp}</h1>
                <p style="color: #666;">This code expires in <b>10 minutes</b>.</p>
              </div>
            `,
          });
          console.log("📧 OTP sent to " + email);
          res.json({ message: "OTP sent successfully" });
        } catch (error) {
          console.error("❌ SendGrid error:", error.response?.body || error.message);
          res.status(500).json({ error: "Failed to send email" });
        }
      }
    );
  });
});

// ✅ VERIFY OTP ROUTE
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  db.query(
    "SELECT * FROM otp_codes WHERE email = ? AND otp_code = ? AND is_used = FALSE AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1",
    [email, otp],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (results.length === 0) return res.status(400).json({ error: "Invalid or expired OTP" });

      db.query("UPDATE otp_codes SET is_used = TRUE WHERE id = ?", [results[0].id]);

      db.query("SELECT * FROM users WHERE email = ?", [email], (err, userResults) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({ message: "Login successful", user: userResults[0] });
      });
    }
  );
});

// ✅ PARENT LOGIN (no OTP, just email check)
app.post("/parent-login", (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email required" });

  // Block school emails - they must use OTP login
  if (email.toLowerCase().endsWith("@kl.his.edu.my")) {
    return res.status(400).json({ error: "Staff and students must use school email OTP login" });
  }

  // Check parent exists in users table
  db.query(
    "SELECT * FROM users WHERE LOWER(email) = LOWER(?)",
    [email],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (results.length === 0) return res.status(404).json({ error: "Email not registered. Please contact the school office." });

      // Return the parent user directly
      res.json({
        message: "Login successful",
        user: results[0],
        role: "parent",
      });
    }
  );
});

// ✅ GET CHILDREN FOR PARENT (from vehicles table)
app.get("/parent-children/:email", (req, res) => {
  const email = decodeURIComponent(req.params.email);

  db.query(
    "SELECT DISTINCT fullname, plate_number FROM vehicles WHERE LOWER(parent_email) = LOWER(?)",
    [email],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json(results);
    }
  );
});

// ✅ PARENT NOTIFY — emits socket to child's app
app.post("/parent-notify", (req, res) => {
  const { parentName, childName, lane } = req.body;

  if (!childName) return res.status(400).json({ error: "Child name required" });

  const io = req.app.get("io");
  if (io) {
    io.emit("parent_arrived", {
      parentName,
      childName,
      lane: lane || "the pickup zone",
      time: new Date().toLocaleTimeString(),
    });
    console.log(`📣 Parent notify sent: ${parentName} → ${childName} at ${lane}`);
  } else {
    console.warn("⚠️ Socket.io not available");
  }

  res.json({ message: "Notification sent" });
});

// ✅ CREATE HTTP SERVER + SOCKET.IO
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

// Store io instance so routes can access it
app.set("io", io);

io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("🔌 Client disconnected:", socket.id);
  });
});

// ✅ START SERVER
const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log("🚀 Server running on http://localhost:" + PORT);
});
