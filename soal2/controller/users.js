const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();
const prisma = new PrismaClient();

const SECRET_KEY = process.env.SECRET_KEY;

// Middleware untuk cek token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Akses ditolak" });

  try {
    const verified = jwt.verify(token.split(" ")[1], SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

// register
router.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  // cek email
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ error: "Email already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
    },
  });

  res.send({
    data: user,
    message: "User created successfully",
  });
});

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ error: "User not found" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: "Invalid password" });

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });
  res.json({ token, message: "Login successful" });
});

// edit
router.put("/:id", verifyToken, async (req, res) => {
  const userId = req.params.id;
  const { name, email, password, confirmPassword } = req.body;

  try {
    let updatedData = { name, email };

    if (password) {
      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: updatedData,
    });
    res.send({ data: user, message: `${name} has been updated` });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// get
router.get("/", verifyToken, async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true },
    orderBy: [{ name: "asc" }],
  });
  res.send(users);
});

// select
router.get("/:id", verifyToken, async (req, res) => {
  const userId = req.params.id;
  try {
    const userData = await prisma.user.findUnique({
      select: { id: true, name: true, email: true },
      where: { id: userId },
    });
    res.send(userData);
  } catch (error) {
    console.error(error);
  }
});

// delete
router.delete("/:id", verifyToken, async (req, res) => {
  const userId = req.params.id;
  try {
    await prisma.user.delete({ where: { id: userId } });
    res.send(`User ${userId} has been deleted`);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
