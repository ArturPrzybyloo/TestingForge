import express from 'express';
import { generateTestIdeas } from '../controllers/aiController';
import { protect } from '../middleware/authMiddleware'; // AI features might be for logged-in users

const router = express.Router();

// Example route for generating test ideas
// This route is protected, meaning only logged-in users can access it.
router.post('/generate-test-ideas', protect, generateTestIdeas);

// Add more AI-related routes as needed

export default router; 