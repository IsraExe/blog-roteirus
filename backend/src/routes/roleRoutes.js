import express from 'express';
import { create } from '../controllers/roleController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/create', auth, create);

export default router;