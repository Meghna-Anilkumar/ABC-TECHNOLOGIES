import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const user = await UserRepository.findByEmail(email);
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email,
        role: user.role 
      },
      process.env.JWT_SECRET as string,    
      { 
        expiresIn: process.env.JWT_EXPIRES_IN || '7d' 
      }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error' 
    });
  }
};