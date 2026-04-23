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


container.register('IUserRepository', { useClass: UserRepository });
container.register('IServiceRepository', { useClass: ServiceRepository });

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL, 
].filter(Boolean) as string[];


app.use(helmet());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS not allowed'));
    }
  },
  credentials: true,
}));

app.use(morgan('dev'));
app.use(express.json());


import authRoutes from './routes/authRoutes';
import serviceRoutes from './routes/serviceRoutes';

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'ABC Technologies API is running ' });
});


const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server failed to start:', error);
    process.exit(1);
  }
};

startServer();