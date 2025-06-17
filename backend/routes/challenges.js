const express = require('express');
const Challenge = require('../models/Challenge');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

// @desc    Get all challenges (empty - challenges handled on frontend)
// @route   GET /api/challenges
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Challenges are now handled on frontend
    // This endpoint exists for compatibility but returns empty data
    res.json({
      success: true,
      count: 0,
      total: 0,
      data: [],
      message: 'Challenges are handled on frontend'
    });
  } catch (error) {
    console.error('Get challenges error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get single challenge
// @route   GET /api/challenges/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const challenge = await Challenge.findOne({ 
      id: req.params.id, 
      isActive: true 
    }).select('-flag');

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    res.json({
      success: true,
      data: challenge
    });

  } catch (error) {
    console.error('Get challenge error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Create new challenge
// @route   POST /api/challenges
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const challenge = await Challenge.create(req.body);

    res.status(201).json({
      success: true,
      data: challenge
    });

  } catch (error) {
    console.error('Create challenge error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Challenge ID already exists' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update challenge
// @route   PUT /api/challenges/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const challenge = await Challenge.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    res.json({
      success: true,
      data: challenge
    });

  } catch (error) {
    console.error('Update challenge error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Delete challenge
// @route   DELETE /api/challenges/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const challenge = await Challenge.findOneAndDelete({ id: req.params.id });

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    res.json({
      success: true,
      message: 'Challenge deleted'
    });

  } catch (error) {
    console.error('Delete challenge error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 