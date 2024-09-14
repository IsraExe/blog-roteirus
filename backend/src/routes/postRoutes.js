import express from 'express';
import { create, showAll, exclude, getOne } from '../controllers/postController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/showAll', showAll);
router.get('/getOne/:id', getOne);
router.post('/create', auth, create);
router.delete('/exclude/:id', auth, exclude)
// router.post('/update', updatePost);

export default router;