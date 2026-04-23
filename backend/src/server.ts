// backend/src/server.ts
import 'reflect-metadata';                    // ← Must be first line
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { container } from 'tsyringe';

import connectDB from './config/db';

// Import Repositories
import { UserRepository } from './repositories/UserRepository';
import { ServiceRepository } from './repositories/ServiceRepository';

// Register dependencies with correct token names
container.register('IUserRepository', { useClass: UserRepository });
container.register('IServiceRepository', { useClass: ServiceRepository });

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());

// Routes
import authRoutes from './routes/authRoutes';
import serviceRoutes from './routes/serviceRoutes';

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'ABC Technologies API is running 🚀' });
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();