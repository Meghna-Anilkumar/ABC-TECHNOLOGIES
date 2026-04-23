// backend/src/services/UserService.ts
import { injectable, inject } from 'tsyringe';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../interfaces/repositories/IUserRepository';
import { MESSAGES } from '../constants/messages';

@injectable()
export class UserService {
  constructor(
    @inject('IUserRepository') private userRepository: IUserRepository
  ) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error(MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error(MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    // ✅ Correct JWT signing
    // Alternative safe JWT signing
const token = jwt.sign(
  {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  },
  process.env.JWT_SECRET!,     // Non-null assertion (recommended)
  { expiresIn: '7d' }          // Hardcode for now to avoid type issues
);

    return {
      success: true,
      token,
      message: MESSAGES.AUTH.LOGIN_SUCCESS,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}