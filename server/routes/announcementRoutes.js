const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement'); // Adjust the path as necessary

// Create a new announcement
router.post('/api/announcements', async (req, res) => {
  try {
    const newAnnouncement = new Announcement(req.body);
    const savedAnnouncement = await newAnnouncement.save();
    res.json(savedAnnouncement);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all announcements
router.get('/api/announcements', async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single announcement by ID
router.get('/api/announcements/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const announcement = await Announcement.findById(id);
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.json(announcement);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update an announcement
router.put('/api/announcements/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedAnnouncement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.json(updatedAnnouncement);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an announcement
router.delete('/api/announcements/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(id);
    if (!deletedAnnouncement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.json({ message: 'Announcement deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;