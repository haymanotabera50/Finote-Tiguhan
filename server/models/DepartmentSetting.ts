import mongoose, { Schema, Document } from 'mongoose';

export interface IDepartmentSetting extends Document {
  deptId: string;
  mottoAm: string;
  mottoEn: string;
  meetingTimeAm: string;
  meetingTimeEn: string;
  announcementAm: string;
  announcementEn: string;
  contactPersonAm: string;
  contactPersonEn: string;
  contactPhone: string;
  updatedAt: Date;
}

const DepartmentSettingSchema: Schema = new Schema({
  deptId: { type: String, required: true, unique: true, index: true },
  mottoAm: { type: String, default: '' },
  mottoEn: { type: String, default: '' },
  meetingTimeAm: { type: String, default: '' },
  meetingTimeEn: { type: String, default: '' },
  announcementAm: { type: String, default: '' },
  announcementEn: { type: String, default: '' },
  contactPersonAm: { type: String, default: '' },
  contactPersonEn: { type: String, default: '' },
  contactPhone: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now }
});

export const DepartmentSetting: mongoose.Model<IDepartmentSetting> = 
  (mongoose.models.DepartmentSetting as mongoose.Model<IDepartmentSetting>) || 
  mongoose.model<IDepartmentSetting>('DepartmentSetting', DepartmentSettingSchema);
