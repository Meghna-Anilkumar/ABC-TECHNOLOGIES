// backend/src/controllers/authController.ts
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UserService } from '../services/UserService';
import { MESSAGES } from '../constants/messages';

const userService = container.resolve(UserService);

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    const result = await userService.login(email, password);

    // Set HttpOnly Cookie
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: false,                    // Set true in production
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json(result);
  } catch (error: any) {
    res.status(401).json({ 
      success: false, 
      message: error.message || MESSAGES.AUTH.INVALID_CREDENTIALS 
    });
  }
};