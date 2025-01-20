import express, { Router } from "express";
const router = Router();

import {
    register,
    login,
    currentUser
} from "../controller/auth.controller"

router.post('/register', register);
router.post('/login', login);
router.get('/currentUser', currentUser);

export default router;