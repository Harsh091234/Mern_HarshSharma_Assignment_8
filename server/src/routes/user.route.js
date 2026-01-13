import express from 'express';
import { getProfile, login, logout, register } from '../controllers/user.controller.js';
import { protectRoute } from "../middlewares/protectedRoute.js"


const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.post('/logout', protectRoute, logout);
router.get("/profile", protectRoute, getProfile);


export default router;