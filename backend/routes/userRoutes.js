import express from 'express';
import { registerUser, loginUser, userData } from '../controllers/userController.js';
import { protect } from '../middlewares/auth.js';
import { getPublishedImages } from '../controllers/messageController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser); 
userRouter.get('/data', protect, userData); 
userRouter.get('/published-images', protect, getPublishedImages);

export default userRouter;