const express = require('express');
const Challenge = require('../models/Challenge');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const router = express.Router();

// @desc    Submit flag for challenge (frontend-validated)
// @route   POST /api/submissions
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { challengeId, flag, points } = req.body;

    // Validation
    if (!challengeId || !flag) {
      return res.status(400).json({ 
        message: 'Please provide challengeId and flag' 
      });
    }

    // Get user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user already completed this challenge
    const alreadyCompleted = user.progress.completedChallenges.some(
      completion => completion.challengeId === challengeId
    );

    if (alreadyCompleted) {
      return res.status(400).json({ 
        message: 'Challenge already completed' 
      });
    }

    // Since frontend validates the flag, we trust the submission
    // Frontend should only call this endpoint after successful validation
    const challengePoints = points || getDefaultPointsForChallenge(challengeId);

    // Update user progress
    user.progress.completedChallenges.push({
      challengeId: challengeId,
      completedAt: new Date(),
      flag: flag.trim()
    });

    user.progress.totalPoints += challengePoints;

    // Update level based on total points
    if (user.progress.totalPoints >= 500) {
      user.progress.level = 'Expert';
    } else if (user.progress.totalPoints >= 200) {
      user.progress.level = 'Advanced';
    } else if (user.progress.totalPoints >= 50) {
      user.progress.level = 'Intermediate';
    }

    await user.save();

    console.log(`Flag submitted by ${user.username} for challenge ${challengeId}: +${challengePoints} pts (Total: ${user.progress.totalPoints})`);

    res.json({
      success: true,
      message: 'Congratulations! Flag submitted successfully!',
      pointsEarned: challengePoints,
      totalPoints: user.progress.totalPoints,
      newLevel: user.progress.level
    });

  } catch (error) {
    console.error('Submit flag error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get user submissions/progress
// @route   GET /api/submissions/my-progress
// @access  Private
router.get('/my-progress', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.json({
      success: true,
      data: {
        totalPoints: user.progress.totalPoints,
        level: user.progress.level,
        completedChallenges: user.progress.completedChallenges,
        totalCompleted: user.progress.completedChallenges.length
      }
    });

  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get leaderboard
// @route   GET /api/submissions/leaderboard
// @access  Public
router.get('/leaderboard', async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const topUsers = await User.find({})
      .select('username progress.totalPoints progress.level progress.completedChallenges')
      .sort({ 'progress.totalPoints': -1 })
      .limit(parseInt(limit));

    const leaderboard = topUsers.map((user, index) => ({
      rank: index + 1,
      username: user.username,
      totalPoints: user.progress.totalPoints,
      level: user.progress.level,
      challengesCompleted: user.progress.completedChallenges.length
    }));

    res.json({
      success: true,
      data: leaderboard
    });

  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper function for default points if not provided
function getDefaultPointsForChallenge(challengeId) {
  const pointsMap = {
    'disabled-button': 15,
    'console-flag': 10,  
    'edge-case-form': 20,
    'sequence-clicks': 25,
    'hidden-checkbox': 20,
    'attribute-flag': 15,
    'order-matters': 20,
    'accessibility-audit': 40,
    'network-timing': 35,
    'caesar-cipher': 30,
    'ui-bug': 35,
    'url-param': 25,
    'cookie-challenge': 30,
    'json-challenge': 35,
    'xhr-detective': 40,
    'css-debugger': 30,
    'cookie-hacker': 50,
    'localstorage-inspector': 35,
    'broken-dom': 40,
    'json-validator': 45,
    'element-highlighter': 25,
    'form-input-fuzzer': 50,
    'race-condition-tester': 55,
    'dom-mutation-observer': 45
  };
  
  return pointsMap[challengeId] || 20; // Default 20 points
}

module.exports = router; 