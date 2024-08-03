import express from 'express';

import { auth } from '../controllers/authController.js';

const router = express.Router();

router.get('/', auth);

export default router;