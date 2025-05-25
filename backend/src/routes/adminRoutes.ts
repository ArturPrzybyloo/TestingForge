import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getPlatformStats,
} from '../controllers/adminController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

// All admin routes are protected and require admin privileges
router.use(protect);
router.use(admin);

// User management routes
router.route('/users').get(getAllUsers);
router.route('/users/:id').get(getUserById).put(updateUser).delete(deleteUser);

// Platform statistics route
router.route('/stats').get(getPlatformStats);

// Potentially other admin routes for managing challenges directly (if not solely through /api/challenges with admin checks)
// or managing badges, site settings etc.

export default router; 