const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  // attendees: { type: Number, default: 0 },
});

export default mongoose.model('Event', EventSchema);