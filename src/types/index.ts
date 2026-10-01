export type Language = 'am' | 'en';

export interface DepartmentTaskItem {
  id: string;
  titleAm: string;
  titleEn?: string;
  subUnitAm?: string;
  subUnitEn?: string;
  status: 'planned' | 'in_progress' | 'completed';
  articleRef?: string;
  descriptionAm?: string;
}

export interface SubUnitDetailed {
  nameAm: string;
  nameEn: string;
  dutiesAm: string[];
}

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
  articleRef: string;
  objectiveAm: string;
  objectiveEn?: string;
  tasksAm: string[];
  subUnitsDetailed?: SubUnitDetailed[];
  defaultActionTasks?: DepartmentTaskItem[];
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

export interface FrontEndContent {
  heroDailyVerseAm: string;
  heroDailyVerseEn: string;
  heroWelcomeAm: string;
  heroWelcomeEn: string;
  heroTitleAm: string;
  heroTitleEn: string;
  heroSubtitleAm: string;
  heroSubtitleEn: string;
  heroDescriptionAm: string;
  heroDescriptionEn: string;
  announcementEnabled: boolean;
  announcementBadgeAm: string;
  announcementBadgeEn: string;
  announcementTextAm: string;
  announcementTextEn: string;
  newsHeadlineAm: string;
  newsHeadlineEn: string;
  featuredNoticeAm: string;
  featuredNoticeEn: string;
  themeMode: 'dark' | 'light';
  accentTheme: 'gold' | 'emerald' | 'amber';
  updatedAt: string;
  publishedBy: string;
}

export interface CustomizationChangeRequest {
  id: string;
  createdAt: string;
  updatedAt: string;
  submittedBy: string;
  departmentId: 'media';
  title: string;
  proposalNote: string;
  status: 'pending' | 'approved' | 'rejected';
  proposedContent: FrontEndContent;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewRemarks?: string;
}

