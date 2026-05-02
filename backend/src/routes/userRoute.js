import express from 'express';  
const router = express.Router();
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { createUser, getUser, loginUser } from '../controllers/userController.js';
router.post('/create', createUser);
router.post('/login', loginUser);
router.get('/users', authMiddleware, getUser);

export default router;