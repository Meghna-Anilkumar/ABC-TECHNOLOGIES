import bcrypt from 'bcryptjs';
import UserRepository from '../repositories/UserRepository';

const seedAdmin = async () => {
  const existingAdmin = await UserRepository.findAdmin();
  if (existingAdmin) return;

  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  await UserRepository.create({
    name: 'Admin',
    email: 'admin@abctech.com',
    password: hashedPassword,
    role: 'admin'
  });

  console.log('✅ Default Admin Created: admin@abctech.com / admin123');
};

export default seedAdmin;