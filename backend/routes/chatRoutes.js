import express from 'express';
import { protect } from '../middlewares/auth.js';
import { createChat } from '../controllers/chatController.js';
import { getChats } from '../controllers/chatController.js';
import { deleteChat } from '../controllers/chatController.js';

const chatRouter = express.Router();

chatRouter.get('/create',protect, createChat)
chatRouter.get('/get',protect, getChats)
chatRouter.delete('/delete/:id',protect, deleteChat)

export default chatRouter;