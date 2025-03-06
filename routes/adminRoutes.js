import express from "express";
import Admin from "../models/Admin.js";
import User from "../models/user.js";

const router = express.Router();

// ✅ Admin Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ error: "❌ Invalid admin credentials" });
    }

    res.json({ message: "✅ Admin logged in successfully", admin });
  } catch (error) {
    res.status(500).json({ error: "❌ Admin login failed" });
  }
});

// ✅ Admin Can See All Users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "❌ Error fetching users" });
  }
});

export default router;