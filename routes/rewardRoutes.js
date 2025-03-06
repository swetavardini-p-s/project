import express from 'express';
import Reward from '../models/Reward.js';  // ✅ Correct (with .js)
const router = express.Router();

// Get All Rewards
router.get('/', async (req, res) => {
    try {
        const rewards = await Reward.find();
        res.json(rewards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Redeem a Reward
router.post('/redeem', async (req, res) => {
    try {
        const { userId, rewardId } = req.body;
        const reward = await Reward.findById(rewardId);
        if (!reward) return res.status(404).json({ message: 'Reward not found' });

        reward.redeemedBy.push(userId);
        await reward.save();

        res.json({ message: 'Reward redeemed successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;