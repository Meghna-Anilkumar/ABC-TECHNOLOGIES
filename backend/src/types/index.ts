export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

export interface IService {
  _id?: string;
  title: string;
  description: string;
  icon?: string;
  order: number;
  isActive: boolean;
}