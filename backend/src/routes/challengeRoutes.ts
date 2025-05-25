import express from 'express';
import {
  getAllChallenges,
  getChallengeById,
  createChallenge,
  updateChallenge,
  deleteChallenge,
} from '../controllers/challengeController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

// Public route to get all challenges
router.route('/').get(getAllChallenges);

// Admin route to create a new challenge
router.route('/').post(protect, admin, createChallenge);

// Private route for specific challenge details (for logged-in users)
// Admin routes for updating and deleting a specific challenge
router
  .route('/:id')
  .get(protect, getChallengeById) // User needs to be logged in to see a challenge
  .put(protect, admin, updateChallenge)
  .delete(protect, admin, deleteChallenge);

export default router; 