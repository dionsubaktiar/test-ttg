const express = require("express");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const db = require("../config/db");

const router = express.Router();

//post
router.post("/", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Password tidak cocok" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = uuidv4();

  db.query(
    "INSERT INTO users (id, name, email,password) VALUES (?, ?, ?, ?)",
    [userId, name, email, hashedPassword],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "User created successfully", id: userId });
    }
  );
});

// get
router.get("/", (req, res) => {
  db.query(
    "SELECT id, name, email FROM users ORDER BY name ASC",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

// select
router.get("/:id", (req, res) => {
  db.query(
    "SELECT id, name, email FROM users WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.length === 0)
        return res.status(404).json({ error: "User not found" });
      res.json(result[0]);
    }
  );
});

// update
router.put("/:id", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  let updatedData = { name, email };

  if (password) {
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    updatedData.password = await bcrypt.hash(password, 10);
  }

  db.query(
    "UPDATE users SET name=?, email=?, password=IFNULL(?, password) WHERE id=?",
    [updatedData.name, updatedData.email, updatedData.password, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "User updated successfully" });
    }
  );
});

// delete
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM users WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User deleted successfully" });
  });
});

module.exports = router;
