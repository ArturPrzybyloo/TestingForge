const express = require('express');
const Challenge = require('../models/Challenge');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const router = express.Router();

// @desc    Submit flag for challenge
// @route   POST /api/submissions
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { challengeId, flag } = req.body;

    // Validation
    if (!challengeId || !flag) {
      return res.status(400).json({ 
        message: 'Please provide challengeId and flag' 
      });
    }

    // Find challenge
    const challenge = await Challenge.findOne({ 
      id: challengeId, 
      isActive: true 
    });

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Get user
    const user = await User.findById(req.user.id);

    // Check if user already completed this challenge
    const alreadyCompleted = user.progress.completedChallenges.some(
      completion => completion.challengeId === challengeId
    );

    if (alreadyCompleted) {
      return res.status(400).json({ 
        message: 'Challenge already completed' 
      });
    }

    // Check if flag is correct (case-insensitive)
    const isCorrect = flag.trim().toLowerCase() === challenge.flag.toLowerCase();

    if (!isCorrect) {
      return res.status(400).json({ 
        message: 'Incorrect flag. Try again!' 
      });
    }

    // Update user progress
    user.progress.completedChallenges.push({
      challengeId: challengeId,
      completedAt: new Date(),
      flag: flag.trim()
    });

    user.progress.totalPoints += challenge.points;

    // Update level based on total points
    if (user.progress.totalPoints >= 500) {
      user.progress.level = 'Expert';
    } else if (user.progress.totalPoints >= 200) {
      user.progress.level = 'Advanced';
    } else if (user.progress.totalPoints >= 50) {
      user.progress.level = 'Intermediate';
    }

    await user.save();

    // Update challenge completion count
    challenge.completionCount += 1;
    await challenge.save();

    res.json({
      success: true,
      message: 'Congratulations! Flag submitted successfully!',
      pointsEarned: challenge.points,
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

    const completedChallengeIds = user.progress.completedChallenges.map(
      completion => completion.challengeId
    );

    // Get details of completed challenges
    const completedChallenges = await Challenge.find({
      id: { $in: completedChallengeIds },
      isActive: true
    }).select('id title category difficulty points');

    res.json({
      success: true,
      data: {
        totalPoints: user.progress.totalPoints,
        level: user.progress.level,
        completedChallenges: user.progress.completedChallenges,
        challengeDetails: completedChallenges,
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

module.exports = router; 