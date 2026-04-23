import bcrypt from 'bcryptjs';
import UserRepository from '../repositories/UserRepository';

const seedAdmin = async () => {
  try {
    const existing = await UserRepository.findByEmail('admin@abctech.com');
    if (existing) return console.log('Admin already exists');

    const hashed = await bcrypt.hash('admin123', 12);
    
    await UserRepository.create({
      name: 'Super Admin',
      email: 'admin@abctech.com',
      password: hashed,
      role: 'admin'
    });

    console.log('✅ Default Admin Created:');
    console.log('Email: admin@abctech.com');
    console.log('Password: admin123');
  } catch (error) {
    console.error('Seed error:', error);
  }
};

export default seedAdmin;