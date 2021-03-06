// Libraries
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// Routes
import authRouter from './routes/auth.js';
import usersRouter from './routes/users.js';
import hotelsRouter from './routes/hotels.js';
import roomsRouter from './routes/rooms.js';

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('MongoDB Connected 🍃');
  } catch (error) {
    throw error;
  }
};

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/rooms', roomsRouter);

app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMsg = error.message || 'Something went wrong!';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMsg,
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  connect();
  console.log(`Server is Running On Port ${port} 🐨`);
});
