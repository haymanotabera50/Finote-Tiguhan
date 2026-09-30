export type Language = 'am' | 'en';

export interface Department {
  id: string;
  nameAm: string;
  nameEn: string;
  descAm: string;
  descEn: string;
  category: 'leadership' | 'education' | 'service' | 'creative';
  subSectionsAm: string[];
  subSectionsEn: string[];
  icon: string;
  color: string;
}

export interface Course {
  id: string;
  titleAm: string;
  titleEn: string;
  targetAm: string;
  targetEn: string;
  descAm: string;
  descEn: string;
  scheduleAm: string;
  scheduleEn: string;
  topicsAm: string[];
  topicsEn: string[];
  level: 'children' | 'youth' | 'adult';
}

export interface Mezmur {
  id: string;
  titleAm: string;
  titleEn: string;
  artistAm: string;
  artistEn: string;
  categoryAm: string;
  categoryEn: string;
  duration: string;
  audioSrc: string;
  lyricsAm: string[];
  lyricsEn: string[];
}

export interface CalendarFeast {
  dayOfMonth: number;
  saintAm: string;
  saintEn: string;
  significanceAm: string;
  significanceEn: string;
  color: string;
}

export interface ChurchEvent {
  id: string;
  titleAm: string;
  titleEn: string;
  dateAm: string;
  dateEn: string;
  timeAm: string;
  timeEn: string;
  locationAm: string;
  locationEn: string;
  descAm: string;
  descEn: string;
  category: 'worship' | 'study' | 'charity' | 'celebration';
}

export interface NewsItem {
  id: string;
  titleAm: string;
  titleEn: string;
  dateAm: string;
  dateEn: string;
  summaryAm: string;
  summaryEn: string;
  image: string;
  categoryAm: string;
  categoryEn: string;
}

