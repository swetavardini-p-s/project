import mongoose from 'mongoose';

const ParkingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true },
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', default: null },
  lat: { type: Number, required: true }, // Latitude field
  lng: { type: Number, required: true }  // Longitude field
});

export default mongoose.model('parking_slots', ParkingSchema);
