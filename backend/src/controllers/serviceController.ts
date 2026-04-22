import { Request, Response } from 'express';
import ServiceRepository from '../repositories/ServiceRepository';

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await ServiceRepository.findActiveServices();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services' });
  }
};

export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await ServiceRepository.findAll();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services' });
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    const service = await ServiceRepository.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error creating service' });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const service = await ServiceRepository.update(id, req.body);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error updating service' });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const service = await ServiceRepository.delete(id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service' });
  }
};