import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';      
import chatRouter from './routes/chatRoutes.js';      
 import messageRouter from './routes/messageRoutes.js'; 
import creditRouter from './routes/creditRoutes.js';
import { stripeWebHooks } from './controllers/webhooks.js';

dotenv.config();

// // Debug environment variables
// console.log('🔍 Environment Variables Debug:');
// console.log('IMAGEKIT_PUBLIC_KEY:', `"${process.env.IMAGEKIT_PUBLIC_KEY}"`);
// console.log('IMAGEKIT_PRIVATE_KEY:', `"${process.env.IMAGEKIT_PRIVATE_KEY}"`);
// console.log('IMAGEKIT_URL_ENDPOINT:', `"${process.env.IMAGEKIT_URL_ENDPOINT}"`);

const app = express();

await connectDB();

app.post('/api/stripe', express.raw({type: 'application/json'}),stripeWebHooks)

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/user', userRouter);      
app.use('/api/chat', chatRouter);      
app.use('/api/message', messageRouter); 
app.use('/api/credit', creditRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});