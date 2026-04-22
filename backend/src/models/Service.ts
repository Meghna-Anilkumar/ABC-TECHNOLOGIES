import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  icon?: string;          
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  icon: { 
    type: String, 
    default: "cube" 
  },
  order: { 
    type: Number, 
    default: 0 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, {
  timestamps: true
});

export default mongoose.model<IService>('Service', ServiceSchema);