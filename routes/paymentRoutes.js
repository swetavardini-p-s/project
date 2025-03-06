import express from "express";
import Stripe from "stripe";
import ParkingSlot from "../models/ParkingSlot.js";

const router = express.Router();
const stripe = new Stripe("your_stripe_secret_key");

// 💳 Payment API
router.post("/pay", async (req, res) => {
    try {
        const { slotId, userId, amount } = req.body;
        
        // Verify slot exists
        const slot = await ParkingSlot.findById(slotId);
        if (!slot) return res.status(404).json({ msg: "Parking slot not found" });

        // Create Stripe payment
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert to cents
            currency: "usd",
            payment_method_types: ["card"]
        });

        res.json({ clientSecret: paymentIntent.client_secret, msg: "Payment initiated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Payment Error" });
    }
});

export default router;