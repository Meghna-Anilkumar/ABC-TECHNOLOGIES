import { Model, Document, UpdateQuery } from "mongoose";

type Query<T> = Partial<Record<keyof T, unknown>>;

export abstract class BaseRepository<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findAll(filter: Query<T> = {}): Promise<T[]> {
    return this.model.find(filter).sort({ order: 1, createdAt: -1 });
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }

  async count(filter: Query<T> = {}): Promise<number> {
    return this.model.countDocuments(filter);
  }
}