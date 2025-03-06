// import express from "express";
// import { createUser, loginUser } from "../controllers/userController.js";
// import User from "../models/user.js"; // ✅ Import User model

// const router = express.Router();

// // 📝 Register Route
// router.post("/register", createUser);

// // 🔑 Login Route
// router.post("/login", loginUser);

// // 🧑‍💻 Get all users
// router.get("/", async (req, res) => {
//     try {
//         const users = await User.find(); // ✅ Fetch all users from MongoDB
//         res.json(users);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ msg: "Server Error" });
//     }
// });

// export default router;


import express from "express";
import { createUser, loginUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js"; // ✅ Import authentication middleware
import User from "../models/user.js";
import Booking from "../models/Booking.js"; // ✅ Import Booking model
import Parking from "../models/Parking.js"; // ✅ Import Parking model

const router = express.Router();

// 📝 Register Route
router.post("/register", createUser);

// 🔑 Login Route
router.post("/login", loginUser);

// 🧑‍💻 Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
});

// 🚗 **Parking Slot Booking Route**
router.post("/book", authMiddleware, async (req, res) => {
    try {
        const { slotId, date, time, duration } = req.body;
        const userId = req.user.userId;

        if (!slotId || !date || !time || !duration) {
            return res.status(400).json({ error: "❌ Missing booking details" });
        }

        const slot = await Parking.findById(slotId);
        if (!slot) return res.status(404).json({ error: "❌ Parking slot not found" });
        if (!slot.available) return res.status(400).json({ error: "❌ Parking slot is already booked" });

        const newBooking = new Booking({
            userId,
            slotId,
            date,
            time,
            duration,
            status: "booked",
        });

        await newBooking.save();

        slot.available = false;
        slot.bookedBy = userId;
        await slot.save();

        res.json({ message: `✅ Parking booked successfully`, booking: newBooking });
    } catch (error) {
        console.error("Booking Error:", error);
        res.status(500).json({ error: "❌ Booking failed" });
    }
});

export default router;
