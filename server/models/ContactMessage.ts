import mongoose, { Schema, Document } from 'mongoose';

export interface IContactMessage extends Document {
  name: string;
  contactInfo: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: Date;
}

const ContactMessageSchema: Schema = new Schema({
  name: { type: String, required: true },
  contactInfo: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['unread', 'read', 'replied'], default: 'unread' },
  createdAt: { type: Date, default: Date.now }
});

export const ContactMessage = mongoose.models.ContactMessage || 
  mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema);
