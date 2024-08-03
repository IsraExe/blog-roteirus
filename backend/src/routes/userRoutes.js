import express from 'express';
import { create, update, read, exclude, login, logout } from '../controllers/userController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', auth, read);
router.post('/create', create);
router.put('/update', auth, update);
router.delete('/delete', auth, exclude);
router.post('/login', login);
router.get('/logout', logout)

export default router;