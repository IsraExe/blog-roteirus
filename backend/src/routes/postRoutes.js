import express from 'express';
import { create, showAll, exclude, getOne, edit } from '../controllers/postController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/showAll', showAll);
router.get('/getOne/:slug', getOne);
router.post('/create', auth, create);
router.post('/edit', edit);
router.delete('/exclude/:id', auth, exclude)

export { router as postRoutes };