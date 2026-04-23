import { IServiceRepository } from '../interfaces/repositories/IServiceRepository';
import Service, { IService } from '../models/Service';
import { BaseRepository } from './BaseRepository';

export class ServiceRepository extends BaseRepository<IService> implements IServiceRepository {
  constructor() {
    super(Service);
  }

  async findActiveServices(): Promise<IService[]> {
    return this.model.find({ isActive: true }).sort({ order: 1 });
  }

  async reorderServices(serviceIds: string[]): Promise<void> {
    const bulkOps = serviceIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { order: index } }
      }
    }));
    await this.model.bulkWrite(bulkOps);
  }
}