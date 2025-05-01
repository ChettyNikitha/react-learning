


import express from "express";
import cors from "cors";
import db from "./database.js"; // ✅ Correct ES6 import

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/users", (req, res) => {
  const { email, password } = req.body;
  //first check if the email is existing in the users table , if not then create account for them 
  const checkEmail = "select * from users WHERE email = ?";
  db.query(checkEmail,[email],(err,results)=>{
    if (err) return res.status(500).send({ error: "Database error" });

    if (results.length > 0) {
      return res.status(409).send({ error: "Email already exists" });

  }

  const query = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(query, [email, password], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "User added successfully", userId: result.insertId });
  });
});
});

app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
