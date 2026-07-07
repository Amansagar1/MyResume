export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  githubUsername: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

export interface ProjectItem {
  title: string;
  description: string;
  highlights: string[];
  technologies: string[];
  link?: string;
}

export interface Skills {
  languages: string[];
  frontend: string[];
  backend: string[];
  database: string[];
  tools: string[];
  other: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  details: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: Skills;
  certifications: string[];
  education: EducationItem[];
  mongodb_status?: string;
  mongodb_error?: string;
}
