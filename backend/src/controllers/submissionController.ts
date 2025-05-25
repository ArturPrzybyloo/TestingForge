import { Response } from 'express';
import Submission from '../models/Submission';
import Challenge from '../models/Challenge';
import User from '../models/User';
import asyncHandler from '../middleware/asyncHandler';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

// @desc    Submit a flag for a challenge
// @route   POST /api/submissions/:challengeId
// @access  Private
const submitFlag = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { challengeId } = req.params;
  const { flag } = req.body;
  const userId = req.user?._id;

  if (!flag) {
    res.status(400);
    throw new Error('Flag submission is required');
  }

  if (!userId) {
    res.status(401); // Should be caught by protect middleware, but good to double check
    throw new Error('User not authenticated');
  }

  const challenge = await Challenge.findById(challengeId);
  if (!challenge) {
    res.status(404);
    throw new Error('Challenge not found');
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404); // Should not happen if protect middleware worked
    throw new Error('User not found');
  }

  // Check if user has already successfully completed this challenge
  if (user.progress.completedChallenges.includes(challenge._id)) {
    return res.status(400).json({ 
      message: 'Challenge already completed', 
      isCorrect: true, // Indicate it was correct previously
      details: {
        challengeTitle: challenge.title,
      } 
    });
  }

  const isCorrect = challenge.flag === flag; // Direct string comparison for now
  let pointsAwarded = 0;

  if (isCorrect) {
    pointsAwarded = challenge.points;
    user.progress.points += pointsAwarded;
    user.progress.completedChallenges.push(challenge._id);
    // Potentially unlock badges here based on completion or points
    await user.save();
  }

  const submission = await Submission.create({
    user: userId,
    challenge: challengeId,
    submittedFlag: flag,
    isCorrect,
    pointsAwarded,
  });

  if (isCorrect) {
    res.status(200).json({
      message: 'Flag submitted successfully! Correct!',
      isCorrect: true,
      pointsAwarded,
      submissionId: submission._id,
      challengeTitle: challenge.title,
      // Optionally return unlocked badges or next challenge info
    });
  } else {
    res.status(200).json({ // Still 200 as submission was processed, but flag incorrect
      message: 'Flag submitted. Incorrect.',
      isCorrect: false,
      pointsAwarded: 0,
      submissionId: submission._id,
      challengeTitle: challenge.title,
    });
  }
});

// @desc    Get all submissions for a user (or specific challenge for a user)
// @route   GET /api/submissions
// @route   GET /api/submissions?challengeId=<challengeId>
// @access  Private (for the logged-in user or admin)
const getUserSubmissions = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?._id;
  const { challengeId } = req.query;

  const query: any = { user: userId };
  if (challengeId) {
    query.challenge = challengeId as string;
  }

  const submissions = await Submission.find(query)
    .populate('challenge', 'title type difficulty') // Populate challenge details
    .sort({ submittedAt: -1 });

  res.json(submissions);
});

// @desc    Get all submissions (Admin only)
// @route   GET /api/submissions/all
// @access  Private/Admin
const getAllSubmissionsAdmin = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  // TODO: Add pagination and filtering (by user, by challenge, by correctness)
  const submissions = await Submission.find({})
    .populate('user', 'username email')
    .populate('challenge', 'title type')
    .sort({ submittedAt: -1 });
  res.json(submissions);
});

export { submitFlag, getUserSubmissions, getAllSubmissionsAdmin }; 