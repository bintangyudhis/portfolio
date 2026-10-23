import { Experience, Profile, Project } from "./types";

export const profile: Profile = {
  name: "Bintang Yudhistira",
  tagline: "Software Developer",
  roles: [
    "Software Developer",
    "AI & Tech Enthusiast",
    "Exploring Machine Learning",
    "Exploring Computer Vision",
  ],
  university: "Telkom University Purwokerto",
  location: "Purwokerto, Indonesia",
  github: "https://github.com/bintangyudhis",
  linkedin: "https://www.linkedin.com/in/bintang-yudhistira-278448289/",
  about:
    "Informatics student at Telkom University Purwokerto who loves turning ideas into working software. I build full-stack web apps, mobile apps, and backend APIs — mostly with Laravel, Vue.js, and Flutter. Lately I've been diving deep into Machine Learning and Computer Vision, exploring how AI can solve real-world problems. When I'm not coding, I'm probably experimenting with a new model or automating something with a Telegram bot.",
  skills: [
    { name: "PHP / Laravel", level: 90, category: "Backend" },
    { name: "MySQL", level: 85, category: "Backend" },
    { name: "JavaScript / Vue.js", level: 80, category: "Frontend" },
    { name: "Tailwind CSS", level: 85, category: "Frontend" },
    { name: "Dart / Flutter", level: 75, category: "Mobile" },
    { name: "Python", level: 70, category: "AI / Data" },
    { name: "Git & GitHub", level: 85, category: "Tools" },
    { name: "REST API Design", level: 85, category: "Backend" },
    { name: "Machine Learning", level: 55, category: "AI / Data" },
    { name: "Computer Vision", level: 50, category: "AI / Data" },
  ],
};

const now = Date.now();

export const seedProjects: Project[] = [
  {
    id: "seed-dompetku",
    title: "DompetKu — Personal Finance Web App",
    description:
      "Personal finance tracker: income and expense logging with quick shortcuts, per-category analytics, monthly budgets with warnings, recurring income, and CSV import/export. Also serves as the REST API and account server for its companion Flutter app.",
    tech: ["Next.js", "TypeScript", "Prisma", "Supabase"],
    githubUrl: "https://github.com/bintangyudhis/dompetku-web",
    liveUrl: "https://dompetku.bintangyudhis.my.id",
    featured: true,
    year: "2026",
    createdAt: now - 1,
  },
  {
    id: "seed-pendekin",
    title: "Pendekin — URL Shortener & Click Analytics",
    description:
      "URL shortener with custom slugs, click logging on every redirect, and an owner dashboard with per-link statistics and QR codes. Link creation is rate-limited and SSRF-protected.",
    tech: ["Next.js", "TypeScript", "Prisma", "Supabase"],
    githubUrl: "https://github.com/bintangyudhis/pendekin",
    liveUrl: "https://pendekin-nine.vercel.app",
    featured: true,
    year: "2026",
    createdAt: now - 2,
  },
  {
    id: "seed-saas-menu",
    title: "SaaS Digital Menu — Multi-Store",
    description:
      "Multi-tenant SaaS platform for digital menus and ordering, serving multiple stores from a single codebase. Features store management, menu builder, and order flow per tenant.",
    tech: ["Laravel 12", "Blade", "MySQL", "Multi-tenancy"],
    githubUrl: "https://github.com/bintangyudhis/SaaS-Menu-Digital-Multi-Toko-Laravel-12",
    featured: true,
    year: "2026",
    createdAt: now - 3,
  },
  {
    id: "seed-laundry",
    title: "LaundryApp — Mobile + Backend",
    description:
      "Full-stack laundry management system: Flutter mobile app for customers and couriers, backed by a Laravel REST API handling orders, pricing, and tracking.",
    tech: ["Flutter", "Dart", "Laravel", "REST API"],
    githubUrl: "https://github.com/bintangyudhis/Flutter-Frontend-LaundryApp",
    featured: true,
    year: "2026",
    createdAt: now - 4,
  },
  {
    id: "seed-studio",
    title: "Studio Photo — Company Profile & Reservation",
    description:
      "Company profile website for a photo studio with an integrated reservation/booking system for photo sessions.",
    tech: ["Laravel", "Blade", "MySQL"],
    githubUrl:
      "https://github.com/bintangyudhis/Website-Company-Profile-dan-Sistem-Reservasi-Studio-Foto",
    featured: true,
    year: "2026",
    createdAt: now - 5,
  },
  {
    id: "seed-tiket",
    title: "Web Kelola Tiket",
    description:
      "Ticket management web app with a Laravel API backend and a Vue.js frontend for creating, tracking, and managing tickets.",
    tech: ["Laravel", "Vue.js", "REST API"],
    githubUrl: "https://github.com/bintangyudhis/Web-Kelola-Tiket",
    featured: false,
    year: "2025",
    createdAt: now - 6,
  },
  {
    id: "seed-kasir",
    title: "Kasir Warung Yamien 12K",
    description:
      "Point-of-sale cashier system built for a small food stall — handles menus, transactions, and daily sales reports.",
    tech: ["PHP", "MySQL", "Bootstrap"],
    githubUrl: "https://github.com/bintangyudhis/Project-Kasir-Warung-Yamien-12-K",
    featured: false,
    year: "2026",
    createdAt: now - 7,
  },
  {
    id: "seed-evoting",
    title: "E-Voting Website",
    description:
      "Online voting platform for student organizations — secure ballot casting and real-time result recaps.",
    tech: ["PHP", "MySQL", "HTML/CSS"],
    githubUrl: "https://github.com/bintangyudhis/Website-e-voting",
    featured: false,
    year: "2025",
    createdAt: now - 8,
  },
];

export const seedExperience: Experience[] = [
  {
    id: "seed-edu",
    role: "B.Sc. Informatics",
    organization: "Telkom University Purwokerto",
    type: "education",
    startDate: "2023",
    endDate: "Present",
    description:
      "Studying Informatics with a focus on software engineering, algorithms, and databases. Building real projects alongside coursework — from SaaS platforms to mobile apps — and currently exploring Machine Learning and Computer Vision.",
    createdAt: now - 1,
  },
];
