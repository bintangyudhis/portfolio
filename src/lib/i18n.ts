// Internationalization: locale handling + UI dictionary.
// Content translations live in ./content.ts; this file holds interface copy.

export const LOCALES = ["id", "en", "jp"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "id";
export const LANG_COOKIE = "pb-lang";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "id" || value === "en" || value === "jp";
}

/** A string translated into all three locales. */
export type Localized = Record<Locale, string>;

export const pick = (text: Localized, locale: Locale): string => text[locale];

const ui = {
  navAbout: { id: "Tentang", en: "About", jp: "私について" },
  navExperience: { id: "Pengalaman", en: "Experience", jp: "経歴" },
  navProjects: { id: "Proyek", en: "Projects", jp: "プロジェクト" },
  navSkills: { id: "Keahlian", en: "Skills", jp: "スキル" },
  navContact: { id: "Kontak", en: "Contact", jp: "お問い合わせ" },
  languageLabel: { id: "Bahasa", en: "Language", jp: "言語" },

  heroProjects: { id: "Lihat proyek", en: "See projects", jp: "プロジェクトを見る" },
  heroContact: { id: "Hubungi saya", en: "Contact me", jp: "お問い合わせ" },

  experienceIntro: {
    id: "Pekerjaan, organisasi, pendidikan, dan kontribusi terbuka.",
    en: "Work, organizations, education, and open contributions.",
    jp: "職務、組織、教育、オープンな貢献の略歴。",
  },
  projectsIntro: {
    id: "Perangkat lunak yang sudah jadi dan bisa dibuka — setiap entri punya tautan ke repo dan versi live-nya.",
    en: "Finished software you can open — every entry links to its repository and live version.",
    jp: "公開中の完成したソフトウェア。各項目にリポジトリとライブ版へのリンクがあります。",
  },
  projectFeatured: { id: "Unggulan", en: "Featured", jp: "注目" },
  projectAll: { id: "Semua proyek", en: "All projects", jp: "全プロジェクト" },
  codeLink: { id: "Kode", en: "Code", jp: "コード" },
  liveLink: { id: "Live", en: "Live", jp: "ライブ" },

  skillsIntro: {
    id: "Dikelompokkan menurut bidang, dengan tingkat berupa kata — bukan angka persen.",
    en: "Grouped by field, with levels in words — not percentages.",
    jp: "分野別に整理し、レベルはパーセントではなく言葉で表しています。",
  },
  levelAdvanced: { id: "Mahir", en: "Advanced", jp: "上級" },
  levelProficient: { id: "Terampil", en: "Proficient", jp: "中級" },
  levelExploring: { id: "Sedang didalami", en: "Exploring", jp: "学習中" },
  certificationsTitle: { id: "Sertifikasi", en: "Certifications", jp: "資格・認定" },
  credentialIdLabel: { id: "ID kredensial", en: "Credential ID", jp: "認定ID" },

  kindWork: { id: "Pekerjaan", en: "Work", jp: "職務" },
  kindOrganization: { id: "Organisasi & komunitas", en: "Organization & community", jp: "組織・コミュニティ" },
  kindEducation: { id: "Pendidikan", en: "Education", jp: "教育" },
  kindOpenSource: { id: "Open source", en: "Open source", jp: "オープンソース" },

  focusTitle: {
    id: "Yang saya kerjakan",
    en: "What I work on",
    jp: "取り組んでいること",
  },

  contactTitle: { id: "Mari terhubung.", en: "Let's connect.", jp: "つながりましょう。" },
  contactIntro: {
    id: "Terbuka untuk proyek menarik, kolaborasi, atau sekadar ngobrol soal teknologi. Tulis lewat formulir di bawah ini, atau langsung ke email saya.",
    en: "Open to interesting projects, collaborations, or just a good tech conversation. Write through the form below, or straight to my email.",
    jp: "面白いプロジェクト、コラボレーション、技術についての雑談も歓迎します。下のフォームか、直接メールでご連絡ください。",
  },
  formName: { id: "Nama", en: "Name", jp: "お名前" },
  formEmail: { id: "Email", en: "Email", jp: "メールアドレス" },
  formSubject: { id: "Subjek", en: "Subject", jp: "件名" },
  formMessage: { id: "Pesan", en: "Message", jp: "メッセージ" },
  formSend: { id: "Kirim pesan", en: "Send message", jp: "送信する" },
  formSending: { id: "Mengirim…", en: "Sending…", jp: "送信中…" },
  formSent: {
    id: "Pesan terkirim. Terima kasih — saya akan membalas secepatnya.",
    en: "Message sent. Thank you — I'll reply as soon as I can.",
    jp: "送信しました。ありがとうございます。できるだけ早く返信します。",
  },
  formError: {
    id: "Pesan gagal terkirim. Coba lagi sebentar, atau kirim langsung ke email saya.",
    en: "The message could not be sent. Please try again in a moment, or email me directly.",
    jp: "送信できませんでした。少し待ってからもう一度お試しいただくか、直接メールでご連絡ください。",
  },

  footerTagline: {
    id: "Mahasiswa Informatika — Telkom University Purwokerto.",
    en: "Informatics student — Telkom University Purwokerto.",
    jp: "情報学専攻の学生 — テルコム大学プルウォケルト校。",
  },
  backToTop: { id: "Kembali ke atas", en: "Back to top", jp: "トップへ戻る" },
} satisfies Record<string, Localized>;

export type UiKey = keyof typeof ui;
export const t = (key: UiKey, locale: Locale): string => ui[key][locale];
