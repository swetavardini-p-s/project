import express from "express";
import Booking from "../models/Booking.js"; // Import Booking Model
import authMiddleware from "../middleware/authMiddleware.js"; // Middleware for authentication
import Parking from "../models/Parking.js";

const router = express.Router();

/* 🚀 Add a New Parking Slot */
router.post("/add", async (req, res) => {
    try {
        const { name, type, location, totalSlots, availableSlots, pricePerHour, isNoParkingZone } = req.body;

        if (!name || !location || !totalSlots || availableSlots === undefined || !pricePerHour) {
            return res.status(400).json({ msg: "❌ Missing required fields" });
        }

        const newSlot = new ParkingSlot({
            name,
            type,
            location,
            totalSlots,
            availableSlots,
            pricePerHour,
            isNoParkingZone
        });

        await newSlot.save();
        res.status(201).json({ msg: "✅ Parking slot added successfully", slot: newSlot });
    } catch (err) {
        console.error("Add Slot Error:", err);
        res.status(500).json({ msg: "❌ Server Error" });
    }
});
router.get("/available", async (req, res) => {
    try {
        const availableSlots = await Parking.find();
        res.json(availableSlots);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
});


// /* ✅ Get All Available Parking Slots */
// router.get("/available", async (req, res) => {
//     try {
//         const availableSlots = await ParkingSlot.find({ availableSlots: { $gt: 0 } });
//         res.json(availableSlots);
//     } catch (err) {
//         console.error("Fetch Slots Error:", err);
//         res.status(500).json({ msg: "❌ Server Error" });
//     }
// });

/* 🚫 Get All No-Parking Zones */
router.get("/no-parking", async (req, res) => {
    try {
        const noParkingZones = await ParkingSlot.find({ isNoParkingZone: true });
        res.json(noParkingZones);
    } catch (err) {
        console.error("Fetch No-Parking Zones Error:", err);
        res.status(500).json({ msg: "❌ Server Error" });
    }
});

/* 🔄 Book a Parking Slot */
router.post("/book/:id", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const slotId = req.params.id;
        const { date, time, duration } = req.body;

        if (!date || !time || !duration) {
            return res.status(400).json({ msg: "❌ Missing booking details" });
        }

        const slot = await ParkingSlot.findById(slotId);
        if (!slot) return res.status(404).json({ msg: "❌ Parking slot not found" });

        if (slot.availableSlots === 0) {
            return res.status(400).json({ msg: "❌ No available slots" });
        }

        // Create a Booking Record
        const newBooking = new Booking({
            userId,
            slotId,
            date,
            time,
            duration,
            status: "booked",
        });

        await newBooking.save();

        // Reduce available slots
        slot.availableSlots -= 1;
        if (slot.availableSlots === 0) slot.status = "full";

        await slot.save();

        res.json({ msg: `✅ Parking slot booked successfully`, booking: newBooking });
    } catch (err) {
        console.error("Booking Error:", err);
        res.status(500).json({ msg: "❌ Booking failed" });
    }
});

/* 🆓 Cancel a Booking */
router.put("/cancel/:id", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const booking = await Booking.findOneAndDelete({ userId, slotId: req.params.id });

        if (!booking) {
            return res.status(404).json({ msg: "❌ Booking not found" });
        }

        // Increase available slots
        const slot = await ParkingSlot.findById(req.params.id);
        slot.availableSlots += 1;
        slot.status = "available";
        await slot.save();

        res.json({ msg: "✅ Booking cancelled successfully", slot });
    } catch (err) {
        console.error("Cancellation Error:", err);
        res.status(500).json({ msg: "❌ Cancellation failed" });
    }
});

export default router;