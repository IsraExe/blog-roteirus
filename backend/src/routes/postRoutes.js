import express from 'express';
import { create, showAll } from '../controllers/postController.js'

const router = express.Router();

router.get('/showAll', showAll)
router.post('/create', create);
// router.post('/update', updatePost);

export default router;