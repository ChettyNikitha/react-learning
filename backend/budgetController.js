import db from "./database.js";

export const saveBudget = (req, res) => {
  const { user_id, salary, needs, wants, savings } = req.body;

  if (!user_id || !salary || !needs || !wants || !savings) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const sql = `
    INSERT INTO budget_results (user_id, salary, needs, wants, savings)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [user_id, salary, needs, wants, savings], (err) => {
    if (err) {
      console.error("❌ Error saving budget:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json({ message: "✅ Budget saved successfully!" });
  });
};
