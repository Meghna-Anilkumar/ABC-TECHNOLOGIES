import { IService } from '../../models/Service';

export interface IServiceRepository {
  findAll(filter?: any): Promise<IService[]>;
  findActiveServices(): Promise<IService[]>;
  findById(id: string): Promise<IService | null>;
  create(data: Partial<IService>): Promise<IService>;
  update(id: string, data: Partial<IService>): Promise<IService | null>;
  delete(id: string): Promise<IService | null>;
  reorderServices(serviceIds: string[]): Promise<void>;
}