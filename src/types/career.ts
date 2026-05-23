export interface ReservationInfo {
  category: string;
  quota: string;
  relaxation?: string;
}

export interface EligibilityInfo {
  minMarks?: string;
  minMarksReserved?: string;
  ageLimit?: string;
  eligibility?: string;
  reservation?: ReservationInfo[];
}

export interface CourseDetails {
  about?: string;
  duration?: string;
  fees?: string;
  subjects?: string[];
  exams?: string[];
  colleges?: string[];
  jobs?: string[];
  eligibility?: EligibilityInfo;
}

export interface CareerNode {
  id: string;
  label: string;
  description?: string;
  details?: CourseDetails;
  children?: CareerNode[];
}
