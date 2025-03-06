import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: 'parking_slots' },
  date: String,
  time: String,
  duration: Number,
  status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' },
});


export default mongoose.model('Booking', BookingSchema);