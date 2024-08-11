import express from 'express';
import { create } from '../controllers/postController.js'

const router = express.Router();

router.post('/create', create);
// router.post('/update', updatePost);

export default router;