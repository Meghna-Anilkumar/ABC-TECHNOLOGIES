import { BaseRepository } from './BaseRepository';
import Service, { IService } from '../models/Service';

class ServiceRepository extends BaseRepository<IService> {
  constructor() {
    super(Service);
  }

  async findActiveServices(): Promise<IService[]> {
    return this.model.find({ isActive: true }).sort({ order: 1 });
  }

async reorderServices(serviceIds: string[]): Promise<void> {
  const bulkOps = serviceIds.map((id: string, index: number) => ({
    updateOne: {
      filter: { _id: id as string },  // explicit cast
      update: { order: index }
    }
  }));
  await this.model.bulkWrite(bulkOps);
}
}

export default new ServiceRepository();