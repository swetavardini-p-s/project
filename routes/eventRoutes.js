import express from 'express';
import mongoose from 'mongoose';
import Event from '../models/Event.js'; // Ensure file name matches in /models
const router = express.Router();

// 📌 Get All Events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({ success: true, data: events });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// 📌 Get Event by ID
router.get('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid Event ID' });
        }
        
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

        res.status(200).json({ success: true, data: event });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// 📌 Create a New Event
router.post('/', async (req, res) => {
    try {
        const { name, date, location } = req.body;

        if (!name || !date || !location) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const newEvent = new Event({ name, date, location, attendees: [] });
        await newEvent.save();

        res.status(201).json({ success: true, message: 'Event created successfully!', data: newEvent });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// 📌 Book an Event
router.post('/book', async (req, res) => {
    try {
        const { userId, eventId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({ success: false, message: 'Invalid User ID or Event ID' });
        }

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

        // Check if user already booked
        if (event.attendees.includes(userId)) {
            return res.status(400).json({ success: false, message: 'User already booked this event' });
        }

        event.attendees.push(userId);
        await event.save();

        res.status(200).json({ success: true, message: 'Event booked successfully!', data: event });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// 📌 Delete an Event
router.delete('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid Event ID' });
        }

        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

        res.status(200).json({ success: true, message: 'Event deleted successfully!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

export default router;
