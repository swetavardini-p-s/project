import jwt from "jsonwebtoken"; // Import JWT
import bcrypt from "bcryptjs";
import User from "../models/user.js";

// ✅ Login User with Token
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found. Please register." });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials. Try again." });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id, email: user.email }, "your_jwt_secret", {
      expiresIn: "1h"
    });

    res.status(200).json({ success: true, message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "Server Error. Please try again." });
  }
};
