export interface IService {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  order: number;
  isActive: boolean;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}