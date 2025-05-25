import { Request, Response } from 'express';
import User, { IUserDocument } from '../models/User';
import asyncHandler from '../middleware/asyncHandler';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error('Please provide all required fields: username, email, password');
  }

  const userExists = await User.findOne({ $or: [{ email }, { username }] });

  if (userExists) {
    res.status(400);
    const field = userExists.email === email ? 'Email' : 'Username';
    throw new Error(`${field} already exists`);
  }

  // In the User model, the pre-save hook handles password hashing.
  // So, we pass the plain password to the passwordHash field for the hook to process.
  const user: IUserDocument = new User({
    username,
    email,
    passwordHash: password, // Will be hashed by pre-save hook
  });

  await user.save();

  if (user) {
    const token = user.generateAuthToken();
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
      // progress: user.progress, // Optionally send progress
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate user & get token (Login)
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    const token = user.generateAuthToken();
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
      // progress: user.progress, // Optionally send progress
    });
  } else {
    res.status(401); // Unauthorized
    throw new Error('Invalid email or password');
  }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private (requires token)
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  // User should be attached to req object by auth middleware
  // For now, assuming auth middleware will populate req.user
  // const user = await User.findById((req as any).user._id).select('-passwordHash'); // Example

  // This is a placeholder until auth middleware is implemented
  // Typically, req.user would be populated by the authentication middleware
  const userId = (req as any).user?._id; // Placeholder for user ID from token

  if (!userId) {
    res.status(401); // Unauthorized
    throw new Error('Not authorized, no token or user ID found');
  }

  const user = await User.findById(userId).select('-passwordHash');

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      progress: user.progress,
      createdAt: user.createdAt,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { registerUser, loginUser, getUserProfile }; 