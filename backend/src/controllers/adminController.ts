import { Response } from 'express';
import User from '../models/User';
import Challenge from '../models/Challenge';
import Submission from '../models/Submission';
import asyncHandler from '../middleware/asyncHandler';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

// @desc    Get all users (Admin)
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  // TODO: Add pagination
  const users = await User.find({}).select('-passwordHash'); // Exclude password
  res.json(users);
});

// @desc    Get user by ID (Admin)
// @route   GET /api/admin/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = await User.findById(req.params.id).select('-passwordHash');
  if (user) {
    // Fetch user submissions for a more complete profile from admin view
    const submissions = await Submission.find({ user: user._id })
      .populate('challenge', 'title type')
      .sort({ submittedAt: -1 });
    res.json({ user, submissions });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user (e.g., promote to admin, change details) (Admin)
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;
    // Password changes should go through a separate, more secure route if needed
    // or ensure that if passwordHash is provided, it's a new plain password to be re-hashed by the pre-save hook.
    // For now, not allowing direct passwordHash update here to avoid accidental direct hash setting.

    // If allowing password update:
    // if (req.body.password) {
    //   user.passwordHash = req.body.password; // This will trigger the pre-save hook to hash it
    // }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Delete user (Admin)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin && (req.user?._id.toString() === user._id.toString())) {
      res.status(400);
      throw new Error('Admin users cannot delete themselves.');
    }
    // TODO: What to do with user's submissions or other associated data?
    // For now, direct deletion of user. Other data remains.
    // await Submission.deleteMany({ user: user._id }); // Example of deleting related submissions
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get platform statistics (Admin Dashboard)
// @route   GET /api/admin/stats
// @access  Private/Admin
const getPlatformStats = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const totalUsers = await User.countDocuments();
  const totalChallenges = await Challenge.countDocuments();
  const totalSubmissions = await Submission.countDocuments();
  const correctSubmissions = await Submission.countDocuments({ isCorrect: true });

  // More stats can be added: e.g., user activity, challenge popularity etc.
  res.json({
    totalUsers,
    totalChallenges,
    totalSubmissions,
    correctSubmissions,
    submissionAccuracy: totalSubmissions > 0 ? (correctSubmissions / totalSubmissions) * 100 : 0,
  });
});

export { getAllUsers, getUserById, updateUser, deleteUser, getPlatformStats }; 