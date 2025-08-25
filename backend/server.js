import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './configs/db.js';

dotenv.config();

const app = express();

await connectDB();

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

