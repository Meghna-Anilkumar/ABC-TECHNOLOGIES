import api from './api';
import type { IService } from '../types';

export const serviceService = {
  getServices: async (): Promise<IService[]> => {
    const res = await api.get('/services');
    return res.data;
  },

  // Admin only
  getAllServices: async () => {
    const res = await api.get('/services/all');
    return res.data;
  },

  createService: async (data: Partial<IService>) => {
    const res = await api.post('/services', data);
    return res.data;
  },

  updateService: async (id: string, data: Partial<IService>) => {
    const res = await api.put(`/services/${id}`, data);
    return res.data;
  },

  deleteService: async (id: string) => {
    const res = await api.delete(`/services/${id}`);
    return res.data;
  },
};