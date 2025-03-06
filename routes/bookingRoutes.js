import express from "express";
import Parking from "../models/Parking.js";
import Booking from "../models/Booking.js";  // Import Booking model
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Book a Parking Slot
router.post("/book", authMiddleware, async (req, res) => {
  try {
    const { slotId, date, time, duration } = req.body;
    const userId = req.user.userId;

    // Ensure required fields are provided
    if (!slotId || !date || !time || !duration) {
      return res.status(400).json({ error: "❌ Missing booking details" });
    }

    const slot = await Parking.findById(slotId);
    if (!slot) return res.status(404).json({ error: "❌ Parking slot not found" });
    if (!slot.available) return res.status(400).json({ error: "❌ Parking slot is already booked" });

    // Create a new booking entry
    const newBooking = new Booking({
      userId,
      slotId,
      date,
      time,
      duration,
      status: "booked",
    });

    await newBooking.save();

    // Update Parking slot availability
    slot.available = false;
    slot.bookedBy = userId;
    await slot.save();

    res.json({ message: `✅ Parking booked successfully by User: ${userId}`, booking: newBooking });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ error: "❌ Booking failed" });
  }
});

// ✅ Simulated Payment API
router.post("/pay", authMiddleware, async (req, res) => {
  try {
    const { slotId, paymentMethod } = req.body;

    if (!slotId || !paymentMethod) {
      return res.status(400).json({ error: "❌ Missing payment details" });
    }

    const slot = await Parking.findById(slotId);
    if (!slot) return res.status(404).json({ error: "❌ Parking slot not found" });

    res.json({ message: `✅ Payment successful via ${paymentMethod} for slot ${slotId}` });
  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({ error: "❌ Payment failed" });
  }
});

export default router;