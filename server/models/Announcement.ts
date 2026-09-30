import mongoose, { Schema, Document } from 'mongoose';

export interface IAnnouncement extends Document {
  enabled: boolean;
  textAm: string;
  textEn: string;
  badgeAm: string;
  badgeEn: string;
  updatedBy: string;
  updatedAt: Date;
}

const AnnouncementSchema: Schema = new Schema({
  enabled: { type: Boolean, default: true },
  textAm: { type: String, required: true },
  textEn: { type: String, required: true },
  badgeAm: { type: String, default: "አስቸኳይ ማስታወቂያ" },
  badgeEn: { type: String, default: "PARISH NOTICE" },
  updatedBy: { type: String, default: "ሥራ አመራር ክፍል" },
  updatedAt: { type: Date, default: Date.now }
});

export const Announcement: mongoose.Model<IAnnouncement> = 
  (mongoose.models.Announcement as mongoose.Model<IAnnouncement>) || 
  mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema);
