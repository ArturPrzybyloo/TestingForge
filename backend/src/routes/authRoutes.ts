import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware'; // Assuming protect middleware handles AuthenticatedRequest

const router = express.Router();

// @route   POST /api/auth/register
router.post('/register', registerUser);

// @route   POST /api/auth/login
router.post('/login', loginUser);

// @route   GET /api/auth/profile
// The protect middleware will be applied here
router.get('/profile', protect, getUserProfile);

export default router; 