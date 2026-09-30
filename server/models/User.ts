import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: 'leadership' | 'dept_admin' | 'student';
  departmentId?: string;
  departmentNameAm?: string;
  departmentNameEn?: string;
  studentId?: string;
  christianName?: string;
  phone?: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, default: 'orthodox1983' },
  role: { 
    type: String, 
    enum: ['leadership', 'dept_admin', 'student'], 
    default: 'student', 
    required: true 
  },
  departmentId: { type: String },
  departmentNameAm: { type: String },
  departmentNameEn: { type: String },
  studentId: { type: String },
  christianName: { type: String },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const User: mongoose.Model<IUser> = 
  (mongoose.models.User as mongoose.Model<IUser>) || 
  mongoose.model<IUser>('User', UserSchema);
