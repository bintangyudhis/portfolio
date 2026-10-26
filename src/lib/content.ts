// Curated portfolio content in three languages (ID / EN / JP).
//
// This file is the single source of truth for:
//   1. the seed script (scripts/db-setup.ts) that fills the Supabase tables, and
//   2. the render fallback used whenever the database is unreachable.
//
// Every fact here comes from data Yudhis himself provided (the previous CMS
// seed), his public GitHub profile/repos, his public LinkedIn profile
// (LINKEDIN-DATA.md, captured 2026-10-26), or his own project notes — see
// REDESIGN-NOTES.md section 2 for the source of each item.

import type { Localized } from "./i18n";

export type SkillLevel = "advanced" | "proficient" | "exploring";
export type ExperienceKind = "work" | "organization" | "education" | "open-source";

export interface FocusArea {
  title: Localized;
  description: Localized;
}

export interface LanguageItem {
  name: Localized;
  level: Localized;
}

export interface ProfileContent {
  name: string;
  role: Localized;
  location: Localized;
  university: string;
  heroLine: Localized;
  intro: Localized;
  about: Record<"id" | "en" | "jp", string[]>;
  focus: FocusArea[];
  languages: LanguageItem[];
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  discordUrl: string;
  /** Profile photo URL (set via the admin CMS; migration 0003). */
  photoUrl?: string;
}

export interface ExperienceItem {
  slug: string;
  kind: ExperienceKind;
  org: string;
  period: Localized;
  role: Localized;
  description: Localized;
  sort: number;
}

export interface ProjectItem {
  slug: string;
  title: string;
  year: string;
  tech: string[];
  description: Localized;
  repoUrl?: string;
  liveUrl?: string;
  /** Project image URL (set via the admin CMS; migration 0003). */
  imageUrl?: string;
  featured: boolean;
  sort: number;
}

export interface SkillGroup {
  slug: string;
  name: Localized;
  blurb: Localized;
  skills: { name: string; level: SkillLevel }[];
  sort: number;
}

export interface CertificationItem {
  slug: string;
  title: string;
  issuer: string;
  issued: Localized;
  credentialId?: string;
  sort: number;
}

export interface PortfolioContent {
  profile: ProfileContent;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  skillGroups: SkillGroup[];
  certifications: CertificationItem[];
}

export const fallbackContent: PortfolioContent = {
  profile: {
    name: "Bintang Yudhistira",
    role: {
      id: "Pengembang Perangkat Lunak",
      en: "Software Developer",
      jp: "ソフトウェア開発者",
    },
    location: {
      id: "Purwokerto, Indonesia",
      en: "Purwokerto, Indonesia",
      jp: "インドネシア、プルウォケルト",
    },
    university: "Telkom University Purwokerto",
    heroLine: {
      id: "Membangun perangkat lunak yang benar-benar dipakai — pencatat keuangan, pemendek tautan, aplikasi laundry.",
      en: "I build software that gets used — a finance tracker, a link shortener, a laundry app.",
      jp: "実際に使われるソフトウェアを作っています。家計簿、URL短縮、ランドリーアプリなど。",
    },
    intro: {
      id: "Mahasiswa Informatika di Telkom University Purwokerto. Sehari-hari saya bekerja dengan Laravel, Next.js, dan Flutter, dengan Supabase atau MySQL di sisi data. Di luar itu, saya membuat chatbot Telegram dan Discord serta perkakas kecil untuk mempermudah pekerjaan orang.",
      en: "Informatics student at Telkom University Purwokerto. Day to day I work with Laravel, Next.js, and Flutter, with Supabase or MySQL holding the data. Beyond that, I build Telegram and Discord chatbots and small tools that make other people's work easier.",
      jp: "テルコム大学プルウォケルト校の情報学専攻の学生です。日常的にはLaravel、Next.js、Flutterを使い、データ側ではSupabaseやMySQLを使っています。そのほか、TelegramやDiscordのチャットボットや、人の作業を楽にする小さなツールも作っています。",
    },
    about: {
      id: [
        "Saya suka mengubah ide menjadi perangkat lunak yang berjalan dan dipakai orang. Fokus utama saya adalah pengembangan full-stack: aplikasi web dengan Laravel dan Next.js, aplikasi mobile dengan Flutter, dan REST API yang menghubungkan keduanya.",
        "Belakangan saya mendalami machine learning dan computer vision — bagaimana model bisa membantu menyelesaikan masalah nyata, bukan sekadar demo. Saya juga sedang belajar mengelola server sendiri (VPS) agar bisa mengurus seluruh rantai dari kode sampai deploy.",
      ],
      en: [
        "I like turning ideas into software that actually runs and gets used. My main focus is full-stack development: web apps with Laravel and Next.js, mobile apps with Flutter, and the REST APIs that connect them.",
        "Lately I've been going deeper into machine learning and computer vision — how models can help solve real problems rather than just demo well. I'm also learning to run my own server (VPS) so I can own the whole chain from code to deployment.",
      ],
      jp: [
        "アイデアを、実際に動き、使われるソフトウェアにするのが好きです。主軸はフルスタック開発で、LaravelとNext.jsのWebアプリ、Flutterのモバイルアプリ、そして両者をつなぐREST APIを作っています。",
        "最近は機械学習とコンピュータビジョンを深めています。デモで終わらず、実用的な問題を解くためにモデルをどう使うか。また、コードからデプロイまで一貫して担えるよう、自分のサーバー（VPS）の運用も学んでいます。",
      ],
    },
    focus: [
      {
        title: { id: "Web & aplikasi", en: "Web & apps", jp: "Webとアプリ" },
        description: {
          id: "Aplikasi web full-stack dan aplikasi mobile — dari SaaS multi-tenant sampai aplikasi pendamping yang memakai API yang sama dengan versi webnya.",
          en: "Full-stack web applications and mobile apps — from multi-tenant SaaS to a mobile companion that shares one API with its web version.",
          jp: "マルチテナントSaaSから、Web版と同じAPIを使うモバイルアプリまで、フルスタックのWebアプリとモバイルアプリ。",
        },
      },
      {
        title: { id: "API & data", en: "APIs & data", jp: "APIとデータ" },
        description: {
          id: "REST API, perancangan skema, dan basis data relasional dengan Prisma, Supabase, dan MySQL.",
          en: "REST APIs, schema design, and relational databases with Prisma, Supabase, and MySQL.",
          jp: "REST API、スキーマ設計、Prisma・Supabase・MySQLによるリレーショナルデータベース。",
        },
      },
      {
        title: { id: "Otomatisasi & bot", en: "Automation & bots", jp: "自動化とBot" },
        description: {
          id: "Chatbot Telegram dan Discord serta skrip otomatisasi untuk pekerjaan berulang — termasuk bot komunitas yang saya kelola sendiri.",
          en: "Telegram and Discord chatbots and automation scripts for repetitive work — including the community bot I run myself.",
          jp: "TelegramやDiscordのチャットボットと、繰り返し作業を自動化するスクリプト。自分で運営しているコミュニティBotも含みます。",
        },
      },
    ],
    languages: [
      {
        name: { id: "Indonesia", en: "Indonesian", jp: "インドネシア語" },
        level: { id: "Profesional mahir", en: "Full professional", jp: "業務レベル" },
      },
      {
        name: { id: "Sunda", en: "Sundanese", jp: "スンダ語" },
        level: { id: "Profesional mahir", en: "Full professional", jp: "業務レベル" },
      },
      {
        name: { id: "Inggris", en: "English", jp: "英語" },
        level: { id: "Terbatas fungsional", en: "Limited working", jp: "限定業務レベル" },
      },
      {
        name: { id: "Jepang", en: "Japanese", jp: "日本語" },
        level: { id: "Dasar", en: "Elementary", jp: "初級" },
      },
    ],
    email: "bintangyudhistira@student.telkomuniversity.ac.id",
    githubUrl: "https://github.com/bintangyudhis",
    linkedinUrl: "https://www.linkedin.com/in/bintang-yudhistira-278448289/",
    instagramUrl: "https://instagram.com/yudhis_gaiden",
    discordUrl: "https://discord.com/users/1446071146993946634",
  },

  experiences: [
    {
      slug: "oss-laravel-translatable",
      kind: "open-source",
      org: "Astrotomic — laravel-translatable",
      period: { id: "2026", en: "2026", jp: "2026年" },
      role: {
        id: "Kontributor Open Source",
        en: "Open Source Contributor",
        jp: "オープンソースコントリビューター",
      },
      description: {
        id: "Memperbaiki dokumentasi method scope pada package Laravel laravel-translatable agar terbaca dengan benar oleh IDE seperti PhpStorm. Perubahan lolos PHPUnit, PHPStan, dan Pint, lalu diajukan sebagai pull request #477.",
        en: "Fixed the scope method documentation in the Laravel package laravel-translatable so IDEs such as PhpStorm resolve the scopes correctly. The change passes PHPUnit, PHPStan, and Pint, and was submitted as pull request #477.",
        jp: "Laravelパッケージ「laravel-translatable」のスコープメソッドのドキュメントを修正し、PhpStormなどのIDEが正しく認識できるようにしました。PHPUnit、PHPStan、Pintを通過し、プルリクエスト#477として提出しました。",
      },
      sort: 1,
    },
    {
      slug: "gaiden-community",
      kind: "organization",
      org: "Gaiden Community — Discord",
      period: { id: "2026 — sekarang", en: "2026 — Present", jp: "2026年 — 現在" },
      role: {
        id: "Pendiri Komunitas",
        en: "Community Founder",
        jp: "コミュニティ創設者",
      },
      description: {
        id: "Mendirikan dan mengelola server komunitas Discord untuk gaming (Valorant) dan teknologi: struktur kanal, peran anggota, dan bot otomatisasi untuk kebutuhan komunitas.",
        en: "Founded and run a Discord community server for gaming (Valorant) and technology: channel structure, member roles, and an automation bot for the community's needs.",
        jp: "ゲーミング（VALORANT）とテクノロジーのためのDiscordコミュニティサーバーを設立・運営。チャンネル構成、メンバーのロール、コミュニティ向け自動化Botを担当しています。",
      },
      sort: 2,
    },
    {
      slug: "krisna-ardhi-tama",
      kind: "work",
      org: "PT Krisna Ardhi Tama",
      period: { id: "Jan — Jun 2026", en: "Jan — Jun 2026", jp: "2026年1月 — 6月" },
      role: {
        id: "Junior Software Engineer",
        en: "Junior Software Engineer",
        jp: "ジュニアソフトウェアエンジニア",
      },
      description: {
        id: "Di divisi Full-Stack Developer: mengembangkan dan mengelola proyek website dan aplikasi perusahaan, termasuk mengimplementasikan sistem ERP perusahaan ke dalam proyek web dan aplikasi.",
        en: "In the Full-Stack Developer division: developed and maintained the company's website and application projects, including implementing the company's ERP system into web and app projects.",
        jp: "フルスタック開発部門にて、会社のWebサイトやアプリケーションのプロジェクトを開発・運用。会社のERPシステムをWeb・アプリプロジェクトへ実装することも担当しました。",
      },
      sort: 3,
    },
    {
      slug: "pn-purwokerto-intern",
      kind: "work",
      org: "Pengadilan Negeri Purwokerto",
      period: { id: "Jul — Agu 2025", en: "Jul — Aug 2025", jp: "2025年7月 — 8月" },
      role: {
        id: "Student Intern",
        en: "Student Intern",
        jp: "学生インターン",
      },
      description: {
        id: "Magang di Divisi Perencanaan TI dan Pelaporan: membangun chatbot broadcast otomatis dengan Node.js, menyusun panduan penggunaan, serta membantu produksi konten dan penyiapan OBS + Zoom untuk sidang daring.",
        en: "Internship in the IT Planning and Reporting division: built an automated broadcast chatbot with Node.js, wrote usage guides, and helped with content production and setting up OBS + Zoom for online court hearings.",
        jp: "IT企画・報告部門でのインターンシップ。Node.jsで自動配信チャットボットを開発し、利用ガイドを作成。コンテンツ制作や、オンライン法廷のためのOBSとZoomの準備も支援しました。",
      },
      sort: 4,
    },
    {
      slug: "hmif-psdm",
      kind: "organization",
      org: "HMIF — IT Telkom Purwokerto",
      period: { id: "Sep 2024 — Jun 2025", en: "Sep 2024 — Jun 2025", jp: "2024年9月 — 2025年6月" },
      role: {
        id: "Staff PSDM",
        en: "Human Resource Development Staff",
        jp: "人材開発部門スタッフ",
      },
      description: {
        id: "Staff Departemen Pengembangan Sumber Daya Manusia (PSDM) Himpunan Mahasiswa Teknik Informatika. Memimpin dan mengoordinasikan program Magang Teknik Informatika, OSPEK, dan Responsif — pernah berperan sebagai ketua program, koordinator acara, sekretaris, humas, moderator, dan MC.",
        en: "Staff of the Human Resource Development Department (PSDM) of the Informatics Engineering Student Association. Led and coordinated the Informatics internship program, OSPEK, and Responsif — serving as program chair, event coordinator, secretary, public relations, moderator, and MC.",
        jp: "情報工学学生協会の人材開発部門（PSDM）スタッフ。情報学インターンシップ、OSPEK、Responsifなどのプログラムを主導・調整し、プログラム責任者、イベントコーディネーター、書記、広報、モデレーター、司会を務めました。",
      },
      sort: 5,
    },
    {
      slug: "asisten-praktikum-algoritma",
      kind: "work",
      org: "Universitas Telkom",
      period: { id: "Sep 2024 — Jan 2025", en: "Sep 2024 — Jan 2025", jp: "2024年9月 — 2025年1月" },
      role: {
        id: "Asisten Praktikum Algoritma Pemrograman",
        en: "Programming Algorithm Practicum Assistant",
        jp: "プログラミングアルゴリズム実習アシスタント",
      },
      description: {
        id: "Memfasilitasi sesi praktikum Algoritma Pemrograman untuk mahasiswa tahun pertama, dan ikut menyusun tugas serta kuis akhir praktikum.",
        en: "Facilitated Programming Algorithm practicum sessions for first-year students, and helped prepare the assignments and the final practicum quizzes.",
        jp: "1年生向けのプログラミングアルゴリズム実習セッションを担当し、課題と最終クイズの作成にも参加しました。",
      },
      sort: 6,
    },
    {
      slug: "sircle-rnd",
      kind: "organization",
      org: "Sircle Research and Development",
      period: { id: "Okt 2023 — Jun 2024", en: "Oct 2023 — Jun 2024", jp: "2023年10月 — 2024年6月" },
      role: {
        id: "Member Divisi RPLM",
        en: "Software Engineering & Multimedia Division Member",
        jp: "ソフトウェア工学・マルチメディア部門メンバー",
      },
      description: {
        id: "Anggota divisi Rekayasa Perangkat Lunak dan Multimedia (RPLM): mengikuti pelatihan pengembangan aplikasi dengan Flutter.",
        en: "Member of the Software Engineering & Multimedia (RPLM) division: trained in application development with Flutter.",
        jp: "ソフトウェア工学・マルチメディア部門（RPLM）のメンバーとして、Flutterによるアプリ開発のトレーニングを受けました。",
      },
      sort: 7,
    },
    {
      slug: "education-telkom",
      kind: "education",
      org: "Universitas Telkom",
      period: { id: "2023 — 2027", en: "2023 — 2027", jp: "2023年 — 2027年" },
      role: {
        id: "Sarjana Teknik Informatika",
        en: "Bachelor of Informatics Engineering",
        jp: "情報工学 学士課程",
      },
      description: {
        id: "Menempuh studi Informatika dengan fokus pada rekayasa perangkat lunak, algoritma, dan basis data. Di luar kuliah, saya membangun proyek nyata — platform SaaS, aplikasi mobile, sampai layanan web yang dipakai publik — dan sedang mendalami machine learning dan computer vision.",
        en: "Studying Informatics with a focus on software engineering, algorithms, and databases. Alongside coursework I build real projects — SaaS platforms, mobile apps, and public web services — and I'm currently exploring machine learning and computer vision.",
        jp: "ソフトウェア工学、アルゴリズム、データベースを中心に情報学を学んでいます。授業と並行して、SaaSプラットフォーム、モバイルアプリ、公開Webサービスなど実践的なプロジェクトを開発し、機械学習とコンピュータビジョンも探求しています。",
      },
      sort: 8,
    },
  ],

  projects: [
    {
      slug: "dompetku-web",
      title: "DompetKu — Web",
      year: "2026",
      tech: ["Next.js", "TypeScript", "Prisma", "Supabase"],
      description: {
        id: "Pencatat keuangan pribadi: pemasukan dan pengeluaran dengan pintasan cepat, analisis per kategori, anggaran bulanan dengan peringatan, pemasukan rutin, dan impor/ekspor CSV. Sekaligus menjadi server akun dan REST API untuk aplikasi mobile-nya.",
        en: "Personal finance tracker: income and expense logging with quick shortcuts, per-category analytics, monthly budgets with warnings, recurring income, and CSV import/export. It also acts as the account server and REST API for its mobile app.",
        jp: "個人向け家計簿アプリ。クイック入力による収入・支出の記録、カテゴリ別分析、警告付き月次予算、定期収入、CSVのインポート／エクスポートを備え、モバイルアプリのアカウントサーバーとREST APIも兼ねています。",
      },
      repoUrl: "https://github.com/bintangyudhis/dompetku-web",
      liveUrl: "https://dompetku.bintangyudhis.my.id",
      featured: true,
      sort: 1,
    },
    {
      slug: "pendekin",
      title: "Pendekin",
      year: "2026",
      tech: ["Next.js", "TypeScript", "Prisma", "Supabase"],
      description: {
        id: "Pemendek tautan dengan slug khusus dan pencatatan setiap klik. Dasbor pemilik menampilkan statistik per tautan dan kode QR; pembuatan tautan dibatasi laju permintaannya dan dilindungi dari SSRF.",
        en: "A link shortener with custom slugs and a log of every click. The owner dashboard shows per-link statistics and QR codes; link creation is rate-limited and protected against SSRF.",
        jp: "カスタムスラッグとクリック記録を備えたURL短縮サービス。所有者ダッシュボードではリンクごとの統計とQRコードを表示し、リンク作成にはレート制限とSSRF対策が施されています。",
      },
      repoUrl: "https://github.com/bintangyudhis/pendekin",
      liveUrl: "https://pendekin.bintangyudhis.my.id",
      featured: true,
      sort: 2,
    },
    {
      slug: "saas-menu-digital",
      title: "Menu Digital SaaS Multi-Toko",
      year: "2026",
      tech: ["Laravel 12", "Blade", "MySQL"],
      description: {
        id: "Platform SaaS untuk menu digital dan pemesanan yang melayani banyak toko dari satu basis kode — pengelolaan toko, penyusun menu, dan alur pesanan untuk setiap tenant.",
        en: "A SaaS platform for digital menus and ordering that serves many stores from a single codebase — store management, a menu builder, and an order flow for every tenant.",
        jp: "1つのコードベースで複数の店舗に対応する、デジタルメニューと注文のためのSaaSプラットフォーム。店舗管理、メニュー作成、テナントごとの注文フローを備えています。",
      },
      repoUrl: "https://github.com/bintangyudhis/SaaS-Menu-Digital-Multi-Toko-Laravel-12",
      featured: true,
      sort: 3,
    },
    {
      slug: "laundryapp",
      title: "LaundryApp",
      year: "2026",
      tech: ["Flutter", "Dart", "Laravel", "REST API"],
      description: {
        id: "Sistem pengelolaan laundry full-stack: aplikasi Flutter untuk pelanggan dan kurir, dengan backend API Laravel yang menangani pesanan, harga, dan pelacakan.",
        en: "A full-stack laundry management system: a Flutter app for customers and couriers, backed by a Laravel API handling orders, pricing, and tracking.",
        jp: "フルスタックのランドリー管理システム。顧客と配達員向けのFlutterアプリと、注文・料金・追跡を処理するLaravel APIで構成されています。",
      },
      repoUrl: "https://github.com/bintangyudhis/Flutter-Frontend-LaundryApp",
      featured: true,
      sort: 4,
    },
    {
      slug: "dompetku-app",
      title: "DompetKu — Aplikasi",
      year: "2026",
      tech: ["Flutter", "Dart", "REST API"],
      description: {
        id: "Pendamping mobile DompetKu Web: masuk dengan akun yang sama dan mencatat keuangan dari ponsel, terhubung ke API dan basis data yang sama.",
        en: "The mobile companion to DompetKu Web: sign in with the same account and track finances from your phone, connected to the same API and database.",
        jp: "DompetKu Webのモバイル版。同じアカウントでログインし、同じAPIとデータベースに接続してスマートフォンから家計を記録できます。",
      },
      repoUrl: "https://github.com/bintangyudhis/dompetku-app",
      featured: false,
      sort: 5,
    },
    {
      slug: "studio-foto",
      title: "Studio Foto",
      year: "2026",
      tech: ["Laravel", "Blade", "MySQL"],
      description: {
        id: "Situs profil perusahaan untuk sebuah studio foto, lengkap dengan sistem reservasi untuk pemesanan sesi foto.",
        en: "A company profile website for a photo studio with an integrated reservation system for booking photo sessions.",
        jp: "写真スタジオの会社紹介サイト。撮影セッションを予約できる予約システムを統合しています。",
      },
      repoUrl:
        "https://github.com/bintangyudhis/Website-Company-Profile-dan-Sistem-Reservasi-Studio-Foto",
      featured: false,
      sort: 6,
    },
    {
      slug: "kelola-tiket",
      title: "Web Kelola Tiket",
      year: "2025",
      tech: ["Laravel", "Vue.js", "REST API"],
      description: {
        id: "Aplikasi pengelolaan tiket dengan backend API Laravel dan frontend Vue.js untuk membuat, melacak, dan mengelola tiket.",
        en: "A ticket management app with a Laravel API backend and a Vue.js frontend for creating, tracking, and managing tickets.",
        jp: "チケット管理アプリ。Laravel APIのバックエンドとVue.jsのフロントエンドで、チケットの作成・追跡・管理を行います。",
      },
      repoUrl: "https://github.com/bintangyudhis/Web-Kelola-Tiket",
      featured: false,
      sort: 7,
    },
    {
      slug: "kasir-warung-yamien",
      title: "Kasir Warung Yamien 12K",
      year: "2026",
      tech: ["PHP", "MySQL", "Bootstrap"],
      description: {
        id: "Sistem kasir (point of sale) untuk warung makan: menu, transaksi, dan laporan penjualan harian. Dibangun untuk tugas besar mata kuliah Informatika untuk Masyarakat.",
        en: "A point-of-sale system for a small food stall: menus, transactions, and daily sales reports. Built for a community informatics course assignment.",
        jp: "小さな食堂向けのPOS（レジ）システム。メニュー、取引、日次売上レポートを扱います。地域情報学の授業課題として制作しました。",
      },
      repoUrl: "https://github.com/bintangyudhis/Project-Kasir-Warung-Yamien-12-K",
      featured: false,
      sort: 8,
    },
    {
      slug: "e-voting",
      title: "E-Voting",
      year: "2025",
      tech: ["PHP", "MySQL"],
      description: {
        id: "Platform pemungutan suara online untuk organisasi mahasiswa — pemberian suara yang aman dan rekap hasil secara langsung.",
        en: "An online voting platform for student organizations — secure ballot casting and live result tallies.",
        jp: "学生団体向けのオンライン投票プラットフォーム。安全な投票とリアルタイムの集計結果を提供します。",
      },
      repoUrl: "https://github.com/bintangyudhis/Website-e-voting",
      featured: false,
      sort: 9,
    },
    {
      slug: "portfolio-ini",
      title: "Portofolio Ini",
      year: "2026",
      tech: ["Next.js", "Tailwind CSS", "Supabase"],
      description: {
        id: "Situs yang sedang Anda baca: satu halaman editorial dengan konten tiga bahasa (Indonesia, Inggris, Jepang) yang dibaca dari basis data Supabase.",
        en: "The site you are reading: a single editorial page with trilingual content (Indonesian, English, Japanese) served from a Supabase database.",
        jp: "今ご覧のこのサイト。Supabaseデータベースから配信される3言語（インドネシア語・英語・日本語）コンテンツを持つ、エディトリアルな1ページサイトです。",
      },
      repoUrl: "https://github.com/bintangyudhis/portfolio",
      liveUrl: "https://www.bintangyudhis.my.id",
      featured: false,
      sort: 10,
    },
  ],

  skillGroups: [
    {
      slug: "backend",
      name: { id: "Backend", en: "Backend", jp: "バックエンド" },
      blurb: {
        id: "API dan logika server yang menjadi tulang punggung sebagian besar proyek saya.",
        en: "The APIs and server logic behind most of my projects.",
        jp: "私のプロジェクトの多くを支えるAPIとサーバーロジック。",
      },
      skills: [
        { name: "PHP / Laravel", level: "advanced" },
        { name: "REST API", level: "advanced" },
        { name: "MySQL", level: "advanced" },
      ],
      sort: 1,
    },
    {
      slug: "frontend",
      name: { id: "Frontend", en: "Frontend", jp: "フロントエンド" },
      blurb: {
        id: "Antarmuka web yang cepat dan rapi, dari halaman profil sampai dasbor.",
        en: "Fast, tidy web interfaces, from profile pages to dashboards.",
        jp: "プロフィールページからダッシュボードまで、高速で整ったWebインターフェース。",
      },
      skills: [
        { name: "Tailwind CSS", level: "advanced" },
        { name: "JavaScript / Vue.js", level: "proficient" },
        { name: "Next.js / React", level: "proficient" },
      ],
      sort: 2,
    },
    {
      slug: "mobile",
      name: { id: "Mobile", en: "Mobile", jp: "モバイル" },
      blurb: {
        id: "Aplikasi Android dan iOS dari satu basis kode dengan Flutter.",
        en: "Android and iOS apps from a single codebase with Flutter.",
        jp: "Flutterによる単一コードベースのAndroid／iOSアプリ。",
      },
      skills: [{ name: "Dart / Flutter", level: "proficient" }],
      sort: 3,
    },
    {
      slug: "ai-data",
      name: { id: "AI & Data", en: "AI & Data", jp: "AIとデータ" },
      blurb: {
        id: "Bidang yang sedang saya dalami: pembelajaran mesin dan visi komputer dengan Python.",
        en: "The field I'm growing into: machine learning and computer vision with Python.",
        jp: "今深めている分野。Pythonによる機械学習とコンピュータビジョン。",
      },
      skills: [
        { name: "Python", level: "proficient" },
        { name: "Machine Learning", level: "exploring" },
        { name: "Computer Vision", level: "exploring" },
      ],
      sort: 4,
    },
    {
      slug: "tools",
      name: { id: "Perkakas", en: "Tools", jp: "ツール" },
      blurb: {
        id: "Peralatan pendukung alur kerja pengembangan sehari-hari.",
        en: "The supporting tools of my daily development workflow.",
        jp: "日常の開発ワークフローを支えるツール。",
      },
      skills: [{ name: "Git & GitHub", level: "advanced" }],
      sort: 5,
    },
  ],

  certifications: [
    {
      slug: "cognitive-class-big-data-101",
      title: "Big Data 101",
      issuer: "Cognitive Class",
      issued: { id: "Mar 2026", en: "Mar 2026", jp: "2026年3月" },
      credentialId: "19d98d60436246d69628ef424e6b8d6c",
      sort: 1,
    },
    {
      slug: "cognitive-class-nosql-dbaas-101",
      title: "NoSQL and DBaaS 101",
      issuer: "Cognitive Class",
      issued: { id: "Mar 2026", en: "Mar 2026", jp: "2026年3月" },
      credentialId: "6385e79ffa4e47b79bec119a2bafc980",
      sort: 2,
    },
    {
      slug: "cognitive-class-sql-relational-101",
      title: "SQL and Relational Databases 101",
      issuer: "Cognitive Class",
      issued: { id: "Mar 2026", en: "Mar 2026", jp: "2026年3月" },
      credentialId: "962a867d93d245cfb7e4d88bc1f6f0e4",
      sort: 3,
    },
  ],
};
