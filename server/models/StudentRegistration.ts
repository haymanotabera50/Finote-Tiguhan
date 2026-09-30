import mongoose, { Schema, Document } from 'mongoose';

export interface IStudentRegistration extends Document {
  regCode: string;
  fullName: string;
  christianName?: string;
  age: number;
  gender: 'male' | 'female';
  phone: string;
  email?: string;
  address: string;
  category: 'children' | 'adult' | 'choir' | 'volunteer';
  departmentId?: string;
  status: 'pending' | 'approved' | 'enrolled' | 'rejected';
  notes?: string;
  registeredAt: Date;
}

const StudentRegistrationSchema: Schema = new Schema({
  regCode: { type: String, required: true, unique: true, index: true },
  fullName: { type: String, required: true, trim: true },
  christianName: { type: String, trim: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, lowercase: true, trim: true },
  address: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['children', 'adult', 'choir', 'volunteer'], 
    default: 'children', 
    required: true 
  },
  departmentId: { type: String, default: 'children', index: true },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'enrolled', 'rejected'], 
    default: 'pending',
    required: true,
    index: true
  },
  notes: { type: String, default: '' },
  registeredAt: { type: Date, default: Date.now }
});

export const StudentRegistration: mongoose.Model<IStudentRegistration> = 
  (mongoose.models.StudentRegistration as mongoose.Model<IStudentRegistration>) || 
  mongoose.model<IStudentRegistration>('StudentRegistration', StudentRegistrationSchema);
