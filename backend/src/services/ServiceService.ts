// backend/src/services/ServiceService.ts
import { injectable, inject } from 'tsyringe';
import { IServiceRepository } from '../interfaces/repositories/IServiceRepository';
import { MESSAGES } from '../constants/messages';

@injectable()
export class ServiceService {
  constructor(
    @inject('IServiceRepository') private serviceRepository: IServiceRepository
  ) {}

  async getActiveServices() {
    return this.serviceRepository.findActiveServices();
  }

  async getAllServices() {
    return this.serviceRepository.findAll();
  }

  async createService(data: any) {
    return this.serviceRepository.create(data);
  }

  async updateService(id: string, data: any) {
    const service = await this.serviceRepository.update(id, data);
    if (!service) throw new Error(MESSAGES.SERVICE.NOT_FOUND);
    return service;
  }

  async deleteService(id: string) {
    const service = await this.serviceRepository.delete(id);
    if (!service) throw new Error(MESSAGES.SERVICE.NOT_FOUND);
    return service;
  }
}