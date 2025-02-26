const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const router = express.Router();
const prisma = new PrismaClient();

//post
router.post("/", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
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
    message: "created successfully",
  });
});

//edit
router.put("/:id", async (req, res) => {
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
    res.send({
      data: user,
      message: name + " has been updated",
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// Get
router.get("/", async (req, res) => {
  const user = await prisma.user.findMany({ orderBy: [{ name: "asc" }] });
  res.send(user);
});

//select
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const userData = await prisma.user.findUnique({
      where: { id: userId },
    });
    res.send(userData);
  } catch (error) {
    console.error(error);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    res.send("Data " + userId + " has been deleted");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
