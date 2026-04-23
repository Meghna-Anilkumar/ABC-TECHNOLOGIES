import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { container } from 'tsyringe';

import connectDB from './config/db';

import { UserRepository } from './repositories/UserRepository';
import { ServiceRepository } from './repositories/ServiceRepository';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


container.register('IUserRepository', { useClass: UserRepository });
container.register('IServiceRepository', { useClass: ServiceRepository });


const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// Routes
import authRoutes from './routes/authRoutes';
import serviceRoutes from './routes/serviceRoutes';

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'ABC Technologies API is running',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});


app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`📡 Frontend allowed: ${allowedOrigins.join(', ')}`);
    });
  } catch (error) {
    console.error('Server failed to start:', error);
    process.exit(1);
  }
};

startServer();