import { IUserRepository } from '../interfaces/repositories/IUserRepository';
import User, { IUser } from '../models/User';
import { BaseRepository } from './BaseRepository';

export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email: email.toLowerCase().trim() });
  }

  async findAdmin(): Promise<IUser | null> {
    return User.findOne({ role: 'admin' });
  }
}