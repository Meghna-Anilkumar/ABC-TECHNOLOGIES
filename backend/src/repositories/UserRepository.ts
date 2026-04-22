import { BaseRepository } from './BaseRepository';
import User, { IUser } from '../models/User';
import { Types } from 'mongoose';

class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email: email.toLowerCase() });
  }

  async findAdmin(): Promise<IUser | null> {
    return User.findOne({ role: 'admin' });
  }

  async findById(id: string): Promise<IUser | null> {
    return super.findById(id);
  }
}

export default new UserRepository();