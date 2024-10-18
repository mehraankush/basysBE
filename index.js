import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
connectDB();

import entryRoute from './routes/index.js';
import connectDB from './config/db.js';

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors())
app.use(express.json());


app.use('/api', entryRoute);

// server listening
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
