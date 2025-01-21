import authMiddleware from '../middleware/auth.miiddleware';
import { Router } from 'express';
const router = Router();

import { register, login, currentUser } from '../controller/auth.controller';

router.post('/register', register);
router.post('/login', login);
router.get('/currentUser', authMiddleware, currentUser);

export default router;
