// import mongoose from "mongoose";

// const ParkingSlotSchema = new mongoose.Schema({
//     name: { type: String, required: true }, // Parking area name
//     type: { type: String, required: true }, // Type (public, private)
//     location: { type: String, required: true }, // Address or area
//     totalSlots: { type: Number, required: true }, // Total slots
//     isAvailable: { type: Boolean, required: true }, // Free slots
//     status: { type: String, enum: ["available", "full"], default: "available" }, // Parking status
//     pricePerHour: { type: Number, required: true }, // Parking cost per hour
//     isNoParkingZone: { type: Boolean, default: false }, // No parking flag
//     bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "parking_slots", default: null } // User who booked it
// });

// const ParkingSlot = mongoose.model("parking_slots", ParkingSlotSchema);
// export default ParkingSlot;