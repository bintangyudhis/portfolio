export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  year: string;
  createdAt: number;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  type: "work" | "education" | "organization";
  startDate: string;
  endDate: string; // "Present" jika masih berjalan
  description: string;
  createdAt: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  ip: string;
  createdAt: number;
  read: boolean;
}

export interface Profile {
  name: string;
  tagline: string;
  roles: string[];
  university: string;
  location: string;
  github: string;
  linkedin: string;
  about: string;
  skills: { name: string; level: number; category: string }[];
}
