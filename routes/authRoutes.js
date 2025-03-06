import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

// ✅ User Registration Route
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(username, email, password);

        // Check if user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: "User already exists" });

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save New User
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ msg: "User registered successfully", user });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ msg: "Server Error" });
    }
});

// ✅ User Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

        // Validate Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

        // Generate Token
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, "yourSecretKey", { expiresIn: "2h" });

        res.json({ token, user });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ msg: "Server Error" });
    }
});

export default router;