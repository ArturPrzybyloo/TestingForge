import { Request, Response } from 'express';
import Challenge, { IChallengeDocument } from '../models/Challenge';
import User from '../models/User'; // Needed for checking completed challenges
import asyncHandler from '../middleware/asyncHandler';
import { AuthenticatedRequest } from '../middleware/authMiddleware'; // For req.user

// @desc    Get all challenges (publicly accessible, with filtering/pagination later)
// @route   GET /api/challenges
// @access  Public
const getAllChallenges = asyncHandler(async (req: Request, res: Response) => {
  // TODO: Add filtering by difficulty, type, tags and pagination
  const challenges = await Challenge.find({}).select('-flag -solution'); // Exclude flag and solution from public listing
  res.json(challenges);
});

// @desc    Get a single challenge by ID (details for authenticated users)
// @route   GET /api/challenges/:id
// @access  Private (User must be logged in to see details, flag/solution still hidden)
const getChallengeById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const challenge = await Challenge.findById(req.params.id).select('-flag -solution');

  if (challenge) {
    // Optionally, check if user has completed this challenge to show/hide hints differently or mark as completed
    // const user = await User.findById(req.user?._id);
    // if (user && user.progress.completedChallenges.includes(challenge._id)) { ... }
    res.json(challenge);
  } else {
    res.status(404);
    throw new Error('Challenge not found');
  }
});

// @desc    Create a new challenge
// @route   POST /api/challenges
// @access  Private/Admin
const createChallenge = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const {
    title,
    description,
    type,
    difficulty,
    points,
    flag,
    content,
    hints,
    solution,
    prerequisites,
    unlocks,
    tags,
  } = req.body;

  // Basic validation
  if (!title || !description || !type || !difficulty || !points || !flag || !content) {
    res.status(400);
    throw new Error('Missing required fields for challenge creation');
  }

  const challenge: IChallengeDocument = new Challenge({
    title,
    description,
    type,
    difficulty,
    points,
    flag, // Flag should be stored securely, consider hashing if it's simple/guessable
    content,
    hints: hints || [],
    solution: solution || '',
    prerequisites: prerequisites || [],
    unlocks: unlocks || [],
    tags: tags || [],
    // createdBy: req.user?._id // Optional: track who created the challenge
  });

  const createdChallenge = await challenge.save();
  res.status(201).json(createdChallenge);
});

// @desc    Update an existing challenge
// @route   PUT /api/challenges/:id
// @access  Private/Admin
const updateChallenge = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const challenge = await Challenge.findById(req.params.id);

  if (!challenge) {
    res.status(404);
    throw new Error('Challenge not found');
  }

  const {
    title,
    description,
    type,
    difficulty,
    points,
    flag,
    content,
    hints,
    solution,
    prerequisites,
    unlocks,
    tags,
  } = req.body;

  challenge.title = title || challenge.title;
  challenge.description = description || challenge.description;
  challenge.type = type || challenge.type;
  challenge.difficulty = difficulty || challenge.difficulty;
  challenge.points = points || challenge.points;
  challenge.flag = flag || challenge.flag;
  challenge.content = content || challenge.content;
  challenge.hints = hints !== undefined ? hints : challenge.hints;
  challenge.solution = solution !== undefined ? solution : challenge.solution;
  challenge.prerequisites = prerequisites !== undefined ? prerequisites : challenge.prerequisites;
  challenge.unlocks = unlocks !== undefined ? unlocks : challenge.unlocks;
  challenge.tags = tags !== undefined ? tags : challenge.tags;

  const updatedChallenge = await challenge.save();
  res.json(updatedChallenge);
});

// @desc    Delete a challenge
// @route   DELETE /api/challenges/:id
// @access  Private/Admin
const deleteChallenge = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const challenge = await Challenge.findById(req.params.id);

  if (challenge) {
    // TODO: Consider implications: what happens to users who completed it? Submissions related?
    // For now, direct deletion. Might need soft delete or archival later.
    await challenge.deleteOne(); // Mongoose 5+deleteOne()
    res.json({ message: 'Challenge removed' });
  } else {
    res.status(404);
    throw new Error('Challenge not found');
  }
});

export {
  getAllChallenges,
  getChallengeById,
  createChallenge,
  updateChallenge,
  deleteChallenge,
}; 