import express from "express";
import { signIn } from "../controllers/LoginController.js";

const router = express.Router();

router.post('/signIn', signIn );
// router.post('/update', updatePost);

export default router;