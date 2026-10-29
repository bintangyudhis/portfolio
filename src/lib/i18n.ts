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
  navPublications: { id: "Publikasi", en: "Publications", jp: "出版物" },
  navSkills: { id: "Keahlian", en: "Skills", jp: "スキル" },
  navContact: { id: "Kontak", en: "Contact", jp: "お問い合わせ" },
  languageLabel: { id: "Bahasa", en: "Language", jp: "言語" },

  heroProjects: { id: "Lihat proyek", en: "See projects", jp: "プロジェクトを見る" },
  heroContact: { id: "Hubungi saya", en: "Contact me", jp: "お問い合わせ" },
  cvButton: { id: "Curriculum Vitae", en: "Curriculum Vitae", jp: "履歴書" },
  highlightsTitle: {
    id: "Tanggung jawab utama & sorotan",
    en: "Key responsibilities & highlights",
    jp: "主な担当業務とハイライト",
  },

  experienceIntro: {
    id: "Pekerjaan, organisasi, pendidikan, dan kontribusi terbuka.",
    en: "Work, organizations, education, and open contributions.",
    jp: "職務、組織、教育、オープンな貢献の略歴。",
  },
  projectsIntro: {
    id: "Perangkat lunak yang sudah jadi dan bisa dibuka. Setiap entri punya tautan ke repo dan versi live-nya.",
    en: "Finished software you can open. Every entry links to its repository and live version.",
    jp: "公開中の完成したソフトウェア。各項目にリポジトリとライブ版へのリンクがあります。",
  },
  projectFeatured: { id: "Unggulan", en: "Featured", jp: "注目" },
  projectAll: { id: "Semua proyek", en: "All projects", jp: "全プロジェクト" },
  codeLink: { id: "Kode", en: "Code", jp: "コード" },
  liveLink: { id: "Live", en: "Live", jp: "ライブ" },

  skillsIntro: {
    id: "Dikelompokkan menurut bidang, dengan tingkat berupa kata, bukan angka persen.",
    en: "Grouped by field, with levels in words, not percentages.",
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
  contactEmailHint: {
    id: "Klik alamatnya untuk langsung membuka aplikasi email kamu.",
    en: "Click the address to open your email app right away.",
    jp: "アドレスをクリックするとメールアプリが開きます。",
  },
  formName: { id: "Nama", en: "Name", jp: "お名前" },
  formEmail: { id: "Email", en: "Email", jp: "メールアドレス" },
  formSubject: { id: "Subjek", en: "Subject", jp: "件名" },
  formMessage: { id: "Pesan", en: "Message", jp: "メッセージ" },
  formSend: { id: "Kirim pesan", en: "Send message", jp: "送信する" },
  formSending: { id: "Mengirim…", en: "Sending…", jp: "送信中…" },
  formSent: {
    id: "Pesan terkirim. Terima kasih, saya akan membalas secepatnya.",
    en: "Message sent. Thank you. I'll reply as soon as I can.",
    jp: "送信しました。ありがとうございます。できるだけ早く返信します。",
  },
  formError: {
    id: "Pesan gagal terkirim. Coba lagi sebentar, atau kirim langsung ke email saya.",
    en: "The message could not be sent. Please try again in a moment, or email me directly.",
    jp: "送信できませんでした。少し待ってからもう一度お試しいただくか、直接メールでご連絡ください。",
  },
  formErrName: {
    id: "Isi namamu dulu ya, minimal 2 huruf.",
    en: "Please enter your name, at least 2 characters.",
    jp: "お名前を入力してください（2文字以上）。",
  },
  formErrEmail: {
    id: "Alamat emailnya belum valid, cek lagi ya.",
    en: "That email address does not look valid yet.",
    jp: "メールアドレスの形式が正しくありません。",
  },
  formErrSubject: {
    id: "Subjeknya terlalu pendek, minimal 3 huruf.",
    en: "The subject is too short, at least 3 characters.",
    jp: "件名が短すぎます（3文字以上）。",
  },
  formErrMessage: {
    id: "Pesanmu terlalu pendek, tulis sedikit lebih panjang ya.",
    en: "Your message is too short, please write a little more.",
    jp: "メッセージが短すぎます。もう少し書いてください。",
  },
  formErrFast: {
    id: "Terlalu cepat, tunggu sebentar lalu kirim lagi ya.",
    en: "That was a bit fast. Wait a moment and send again.",
    jp: "送信が早すぎます。少し待ってからもう一度お試しください。",
  },
  formErrRate: {
    id: "Kamu sudah mengirim beberapa pesan barusan. Istirahat sebentar, lalu coba lagi.",
    en: "You have sent several messages just now. Take a short break and try again.",
    jp: "短時間に複数のメッセージが送信されています。少し待ってからお試しください。",
  },
  formRecipient: { id: "Penerima", en: "Recipient", jp: "宛先" },
  formMailNote: {
    id: "Pesan ini akan terbuka langsung di aplikasi email kamu, ditujukan ke",
    en: "This message will open directly in your email client, addressed to",
    jp: "このメッセージはメールアプリで直接開きます。宛先はこちら",
  },
  formReadyTitle: {
    id: "Pesan Siap Dikirim",
    en: "Message Ready to Send",
    jp: "メッセージの準備ができました",
  },
  formReadyText: {
    id: "Aplikasi email kamu sudah dibuka dengan draf berikut. Tekan kirim di sana untuk menyelesaikan.",
    en: "Your email client is opened with the following draft. Press send there to finish.",
    jp: "メールアプリが開き、次の下書きが用意されています。送信を押して完了してください。",
  },
  formOpenGmail: {
    id: "Buka di Gmail Web",
    en: "Open in Gmail Web",
    jp: "Gmail Webで開く",
  },
  formOpenClient: {
    id: "Buka Lagi di Aplikasi Email",
    en: "Reopen in Email Client",
    jp: "メールアプリでもう一度開く",
  },
  formSendAnother: {
    id: "Kirim Pesan Lain",
    en: "Send Another Message",
    jp: "別のメッセージを送る",
  },

  themeToggle: { id: "Ganti tema", en: "Toggle theme", jp: "テーマを切り替える" },

  cvLabel: { id: "Curriculum Vitae", en: "Curriculum Vitae", jp: "職務経歴書" },
  cvTitle: {
    id: "Pengalaman & Kegiatan",
    en: "Experience & Activities",
    jp: "経歴と活動",
  },
  educationTitle: {
    id: "Pendidikan & Sertifikasi",
    en: "Education & Certifications",
    jp: "学歴と資格",
  },

  portfolioLabel: { id: "Portofolio", en: "Portfolio", jp: "ポートフォリオ" },
  featuredTitle: {
    id: "Proyek Unggulan",
    en: "Featured Projects",
    jp: "注目のプロジェクト",
  },
  viewAll: { id: "Lihat semua", en: "View all", jp: "すべて見る" },

  githubLabel: { id: "GitHub", en: "GitHub", jp: "GitHub" },
  githubProjectsTitle: {
    id: "Semua Proyek di GitHub",
    en: "All Projects on GitHub",
    jp: "GitHubの全プロジェクト",
  },
  githubProjectsIntro: {
    id: "Setiap repositori publik di GitHub saya, dari yang paling baru diperbarui.",
    en: "Every public repository on my GitHub, most recently updated first.",
    jp: "GitHub上の公開リポジトリをすべて、更新が新しい順に並べています。",
  },
  githubStatsTitle: {
    id: "Statistik GitHub",
    en: "GitHub Statistics",
    jp: "GitHubの統計",
  },
  githubGraphTitle: {
    id: "Grafik Kontribusi GitHub",
    en: "GitHub Contributions Graph",
    jp: "GitHubコントリビューショングラフ",
  },
  graphContributions: {
    id: "kontribusi",
    en: "contributions",
    jp: "コントリビューション",
  },
  graphLess: { id: "Sedikit", en: "Less", jp: "少" },
  graphMore: { id: "Banyak", en: "More", jp: "多" },
  graphHistoryTitle: {
    id: "Riwayat Kontribusi",
    en: "Contribution History",
    jp: "コントリビューション履歴",
  },
  statCardContributions: { id: "Total Kontribusi", en: "Total Contributions", jp: "総コントリビューション" },
  statCardRepos: { id: "Repository", en: "Repository", jp: "リポジトリ" },
  statCardStars: { id: "Bintang", en: "Stars", jp: "スター" },
  statCardFollowers: { id: "Followers", en: "Followers", jp: "フォロワー" },
  statCardFollowing: { id: "Following", en: "Following", jp: "フォロー中" },
  statRepos: {
    id: "repositori publik",
    en: "public repositories",
    jp: "公開リポジトリ",
  },
  statStars: {
    id: "bintang di seluruh repositori",
    en: "stars across all repositories",
    jp: "全リポジトリのスター",
  },
  statFollowers: { id: "pengikut", en: "followers", jp: "フォロワー" },
  statReposLabel: { id: "Repositori publik", en: "Public repositories", jp: "公開リポジトリ" },
  statStarsLabel: { id: "Bintang", en: "Stars", jp: "スター" },
  statForksLabel: { id: "Fork", en: "Forks", jp: "フォーク" },
  statFollowersLabel: { id: "Pengikut", en: "Followers", jp: "フォロワー" },
  statFollowingLabel: { id: "Mengikuti", en: "Following", jp: "フォロー中" },
  statPullRequestsLabel: { id: "Pull Request", en: "Pull Requests", jp: "プルリクエスト" },
  statIssuesLabel: { id: "Issue", en: "Issues", jp: "イシュー" },
  statTopLanguages: { id: "Bahasa utama", en: "Top languages", jp: "主な言語" },
  statMemberSince: { id: "di GitHub sejak", en: "on GitHub since", jp: "GitHub登録" },
  statsUpdatedNote: {
    id: "Angka diperbarui otomatis dari GitHub API.",
    en: "Figures update automatically from the GitHub API.",
    jp: "数値はGitHub APIから自動で更新されます。",
  },

  publicationsLabel: { id: "Publikasi", en: "Publications", jp: "出版物" },
  publicationsTitle: { id: "Publikasi", en: "Publications", jp: "出版物" },

  technicalLabel: { id: "Teknis", en: "Technical", jp: "技術" },

  footerTagline: {
    id: "Mahasiswa Informatika, Telkom University Purwokerto.",
    en: "Informatics student, Telkom University Purwokerto.",
    jp: "情報学専攻の学生、テルコム大学プルウォケルト校。",
  },
  backToTop: { id: "Kembali ke atas", en: "Back to top", jp: "トップへ戻る" },
} satisfies Record<string, Localized>;

export type UiKey = keyof typeof ui;
export const t = (key: UiKey, locale: Locale): string => ui[key][locale];
