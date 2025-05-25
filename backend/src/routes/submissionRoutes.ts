import express from 'express';
import {
  submitFlag,
  getUserSubmissions,
  getAllSubmissionsAdmin,
} from '../controllers/submissionController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

// Route for a user to get their own submissions (optionally filtered by challengeId in query)
router.route('/').get(protect, getUserSubmissions);

// Route for submitting a flag for a specific challenge
router.route('/:challengeId').post(protect, submitFlag);

// Admin route to get all submissions in the system
router.route('/all').get(protect, admin, getAllSubmissionsAdmin);

export default router; 