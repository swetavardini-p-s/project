const mongoose = require('mongoose');
const { Schema } = mongoose;

const RewardSchema = new Schema({
  name: { type: String, required: true },
  points: { type: Number, required: true },
  redeemedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model('Reward', RewardSchema);