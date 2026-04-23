import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ServiceService } from '../services/ServiceService';
import { MESSAGES } from '../constants/messages';

const serviceService = container.resolve(ServiceService);

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await serviceService.getActiveServices();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: MESSAGES.COMMON.SERVER_ERROR });
  }
};

export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await serviceService.getAllServices();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: MESSAGES.COMMON.SERVER_ERROR });
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    const service = await serviceService.createService(req.body);
    res.status(201).json({
      success: true,
      message: MESSAGES.SERVICE.CREATED,
      data: service
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false,
      message: error.message || MESSAGES.COMMON.SERVER_ERROR 
    });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;    
    if (Array.isArray(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const service = await serviceService.updateService(id, req.body);
    
    res.json({
      success: true,
      message: MESSAGES.SERVICE.UPDATED,
      data: service
    });
  } catch (error: any) {
    const status = error.message?.includes('not found') ? 404 : 500;
    res.status(status).json({ 
      success: false,
      message: error.message || MESSAGES.COMMON.SERVER_ERROR 
    });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;                  
    if (Array.isArray(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    await serviceService.deleteService(id);
    
    res.json({
      success: true,
      message: MESSAGES.SERVICE.DELETED
    });
  } catch (error: any) {
    const status = error.message?.includes('not found') ? 404 : 500;
    res.status(status).json({ 
      success: false,
      message: error.message || MESSAGES.COMMON.SERVER_ERROR 
    });
  }
};