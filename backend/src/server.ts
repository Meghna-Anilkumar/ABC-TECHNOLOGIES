import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db';

import authRoutes from './routes/authRoutes';
import serviceRoutes from './routes/serviceRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173', // Vite default
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'ABC Technologies API is running 🚀',
    version: '1.0.0'
  });
});

const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 API Documentation: http://localhost:${PORT}`);
  });
};

startServer();