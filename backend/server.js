import express from "express";
import cors from "cors";
import db from "./database.js";
import budgetRoutes from "./routes/budgetRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// ---------------------- SIGNUP ----------------------
app.post("/api/users", (req, res) => {
  const { email, password } = req.body;

  const checkEmail = "SELECT * FROM users WHERE email = ?";
  db.query(checkEmail, [email], (err, results) => {
    if (err) return res.status(500).send({ error: "Database error" });

    if (results.length > 0) {
      return res.status(409).send({ error: "Email already exists" });
    }

    const query = "INSERT INTO users (email, password) VALUES (?, ?)";
    db.query(query, [email, password], (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({
        message: "User added successfully",
        user: { id: result.insertId, email },
      });
    });
  });
});

// ---------------------- LOGIN ----------------------
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).send({ error: "Database error" });

    if (results.length > 0) {
      res.send({
        message: "Login successful",
        user: results[0], // contains id, email, password
      });
    } else {
      res.status(401).send({ error: "Invalid email or password" });
    }
  });
});

// ---------------------- BUDGET ROUTES ----------------------
app.use("/api/budget", budgetRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
