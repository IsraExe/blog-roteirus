import express from 'express';
import { auth, google } from '../controllers/authController.js';
import { authenticateGoogle, googleCallback } from '../middlewares/google.js';

const router = express.Router();

router.get('/', auth);
router.get('/google/callback', googleCallback, google);
router.get('/google', authenticateGoogle);

export { router as authRoutes };