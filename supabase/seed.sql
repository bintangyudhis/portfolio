-- Portfolio seed data. Run this AFTER the migrations in supabase/migrations/
-- (0001_portfolio_tables.sql and 0002_portfolio_certifications.sql).
-- Paste into Supabase Dashboard → SQL Editor and run. Pure PostgreSQL, no
-- placeholders. Idempotent: every statement is an upsert on the primary key,
-- so re-running updates rows in place.
-- Content mirrors src/lib/content.ts exactly (ID / EN / JP).

begin;

-- portfolio_profile (singleton row, id = 1)
insert into public.portfolio_profile
  (id, name, university, email, github_url, linkedin_url, instagram_url, discord_url, role, location, hero_line, intro, about, focus, languages, updated_at)
values (
  1,
  'Bintang Yudhistira',
  'Telkom University Purwokerto',
  'bintangyudhistira@student.telkomuniversity.ac.id',
  'https://github.com/bintangyudhis',
  'https://www.linkedin.com/in/bintang-yudhistira-278448289/',
  'https://instagram.com/yudhis_gaiden',
  'https://discord.com/users/1446071146993946634',
  '{"id":"Pengembang Perangkat Lunak","en":"Software Developer","jp":"ソフトウェア開発者"}'::jsonb,
  '{"id":"Purwokerto, Indonesia","en":"Purwokerto, Indonesia","jp":"インドネシア、プルウォケルト"}'::jsonb,
  '{"id":"Membangun perangkat lunak yang benar-benar dipakai: pencatat keuangan, pemendek tautan, aplikasi laundry.","en":"I build software that gets used: a finance tracker, a link shortener, a laundry app.","jp":"実際に使われるソフトウェアを作っています。家計簿、URL短縮、ランドリーアプリなど。"}'::jsonb,
  '{"id":"Mahasiswa Informatika di Telkom University Purwokerto. Sehari-hari saya bekerja dengan Laravel, Next.js, dan Flutter, dengan Supabase atau MySQL di sisi data. Di luar itu, saya membuat chatbot Telegram dan Discord serta perkakas kecil untuk mempermudah pekerjaan orang.","en":"Informatics student at Telkom University Purwokerto. Day to day I work with Laravel, Next.js, and Flutter, with Supabase or MySQL holding the data. Beyond that, I build Telegram and Discord chatbots and small tools that make other people''s work easier.","jp":"テルコム大学プルウォケルト校の情報学専攻の学生です。日常的にはLaravel、Next.js、Flutterを使い、データ側ではSupabaseやMySQLを使っています。そのほか、TelegramやDiscordのチャットボットや、人の作業を楽にする小さなツールも作っています。"}'::jsonb,
  '{"id":["Saya suka mengubah ide menjadi perangkat lunak yang berjalan dan dipakai orang. Fokus utama saya adalah pengembangan full-stack: aplikasi web dengan Laravel dan Next.js, aplikasi mobile dengan Flutter, dan REST API yang menghubungkan keduanya.","Belakangan saya mendalami machine learning dan computer vision: bagaimana model bisa membantu menyelesaikan masalah nyata, bukan sekadar demo. Saya juga sedang belajar mengelola server sendiri (VPS) agar bisa mengurus seluruh rantai dari kode sampai deploy."],"en":["I like turning ideas into software that actually runs and gets used. My main focus is full-stack development: web apps with Laravel and Next.js, mobile apps with Flutter, and the REST APIs that connect them.","Lately I''ve been going deeper into machine learning and computer vision: how models can help solve real problems rather than just demo well. I''m also learning to run my own server (VPS) so I can own the whole chain from code to deployment."],"jp":["アイデアを、実際に動き、使われるソフトウェアにするのが好きです。主軸はフルスタック開発で、LaravelとNext.jsのWebアプリ、Flutterのモバイルアプリ、そして両者をつなぐREST APIを作っています。","最近は機械学習とコンピュータビジョンを深めています。デモで終わらず、実用的な問題を解くためにモデルをどう使うか。また、コードからデプロイまで一貫して担えるよう、自分のサーバー（VPS）の運用も学んでいます。"]}'::jsonb,
  '[{"title":{"id":"Web & aplikasi","en":"Web & apps","jp":"Webとアプリ"},"description":{"id":"Aplikasi web full-stack dan aplikasi mobile: dari SaaS multi-tenant sampai aplikasi pendamping yang memakai API yang sama dengan versi webnya.","en":"Full-stack web applications and mobile apps: from multi-tenant SaaS to a mobile companion that shares one API with its web version.","jp":"マルチテナントSaaSから、Web版と同じAPIを使うモバイルアプリまで、フルスタックのWebアプリとモバイルアプリ。"}},{"title":{"id":"API & data","en":"APIs & data","jp":"APIとデータ"},"description":{"id":"REST API, perancangan skema, dan basis data relasional dengan Prisma, Supabase, dan MySQL.","en":"REST APIs, schema design, and relational databases with Prisma, Supabase, and MySQL.","jp":"REST API、スキーマ設計、Prisma・Supabase・MySQLによるリレーショナルデータベース。"}},{"title":{"id":"Otomatisasi & bot","en":"Automation & bots","jp":"自動化とBot"},"description":{"id":"Chatbot Telegram dan Discord serta skrip otomatisasi untuk pekerjaan berulang, termasuk bot komunitas yang saya kelola sendiri.","en":"Telegram and Discord chatbots and automation scripts for repetitive work, including the community bot I run myself.","jp":"TelegramやDiscordのチャットボットと、繰り返し作業を自動化するスクリプト。自分で運営しているコミュニティBotも含みます。"}}]'::jsonb,
  '[{"name":{"id":"Indonesia","en":"Indonesian","jp":"インドネシア語"},"level":{"id":"Profesional mahir","en":"Full professional","jp":"業務レベル"}},{"name":{"id":"Sunda","en":"Sundanese","jp":"スンダ語"},"level":{"id":"Profesional mahir","en":"Full professional","jp":"業務レベル"}},{"name":{"id":"Inggris","en":"English","jp":"英語"},"level":{"id":"Terbatas fungsional","en":"Limited working","jp":"限定業務レベル"}},{"name":{"id":"Jepang","en":"Japanese","jp":"日本語"},"level":{"id":"Dasar","en":"Elementary","jp":"初級"}}]'::jsonb,
  now()
)
on conflict (id) do update set
  name = excluded.name,
  university = excluded.university,
  email = excluded.email,
  github_url = excluded.github_url,
  linkedin_url = excluded.linkedin_url,
  instagram_url = excluded.instagram_url,
  discord_url = excluded.discord_url,
  role = excluded.role,
  location = excluded.location,
  hero_line = excluded.hero_line,
  intro = excluded.intro,
  about = excluded.about,
  focus = excluded.focus,
  languages = excluded.languages,
  updated_at = now();

-- portfolio_experiences (8 rows)
insert into public.portfolio_experiences (id, kind, org, period, role, description, sort)
values
  ('oss-laravel-translatable', 'open-source', 'Astrotomic (laravel-translatable)', '{"id":"2026","en":"2026","jp":"2026年"}'::jsonb, '{"id":"Kontributor Open Source","en":"Open Source Contributor","jp":"オープンソースコントリビューター"}'::jsonb, '{"id":"Memperbaiki dokumentasi method scope pada package Laravel laravel-translatable agar terbaca dengan benar oleh IDE seperti PhpStorm. Perubahan lolos PHPUnit, PHPStan, dan Pint, lalu diajukan sebagai pull request #477.","en":"Fixed the scope method documentation in the Laravel package laravel-translatable so IDEs such as PhpStorm resolve the scopes correctly. The change passes PHPUnit, PHPStan, and Pint, and was submitted as pull request #477.","jp":"Laravelパッケージ「laravel-translatable」のスコープメソッドのドキュメントを修正し、PhpStormなどのIDEが正しく認識できるようにしました。PHPUnit、PHPStan、Pintを通過し、プルリクエスト#477として提出しました。"}'::jsonb, 1),
  ('gaiden-community', 'organization', 'Gaiden Community (Discord)', '{"id":"2026 s.d. sekarang","en":"2026 to Present","jp":"2026年〜現在"}'::jsonb, '{"id":"Pendiri Komunitas","en":"Community Founder","jp":"コミュニティ創設者"}'::jsonb, '{"id":"Mendirikan dan mengelola server komunitas Discord untuk gaming (Valorant) dan teknologi: struktur kanal, peran anggota, dan bot otomatisasi untuk kebutuhan komunitas.","en":"Founded and run a Discord community server for gaming (Valorant) and technology: channel structure, member roles, and an automation bot for the community''s needs.","jp":"ゲーミング（VALORANT）とテクノロジーのためのDiscordコミュニティサーバーを設立・運営。チャンネル構成、メンバーのロール、コミュニティ向け自動化Botを担当しています。"}'::jsonb, 2),
  ('krisna-ardhi-tama', 'work', 'PT Krisna Ardhi Tama', '{"id":"Jan s.d. Jun 2026","en":"Jan to Jun 2026","jp":"2026年1月〜6月"}'::jsonb, '{"id":"Junior Software Engineer","en":"Junior Software Engineer","jp":"ジュニアソフトウェアエンジニア"}'::jsonb, '{"id":"Di divisi Full-Stack Developer: mengembangkan dan mengelola proyek website dan aplikasi perusahaan, termasuk mengimplementasikan sistem ERP perusahaan ke dalam proyek web dan aplikasi.","en":"In the Full-Stack Developer division: developed and maintained the company''s website and application projects, including implementing the company''s ERP system into web and app projects.","jp":"フルスタック開発部門にて、会社のWebサイトやアプリケーションのプロジェクトを開発・運用。会社のERPシステムをWeb・アプリプロジェクトへ実装することも担当しました。"}'::jsonb, 3),
  ('pn-purwokerto-intern', 'work', 'Pengadilan Negeri Purwokerto', '{"id":"Jul s.d. Agu 2025","en":"Jul to Aug 2025","jp":"2025年7月〜8月"}'::jsonb, '{"id":"Student Intern","en":"Student Intern","jp":"学生インターン"}'::jsonb, '{"id":"Magang di Divisi Perencanaan TI dan Pelaporan: membangun chatbot broadcast otomatis dengan Node.js, menyusun panduan penggunaan, serta membantu produksi konten dan penyiapan OBS + Zoom untuk sidang daring.","en":"Internship in the IT Planning and Reporting division: built an automated broadcast chatbot with Node.js, wrote usage guides, and helped with content production and setting up OBS + Zoom for online court hearings.","jp":"IT企画・報告部門でのインターンシップ。Node.jsで自動配信チャットボットを開発し、利用ガイドを作成。コンテンツ制作や、オンライン法廷のためのOBSとZoomの準備も支援しました。"}'::jsonb, 4),
  ('hmif-psdm', 'organization', 'HMIF (IT Telkom Purwokerto)', '{"id":"Sep 2024 s.d. Jun 2025","en":"Sep 2024 to Jun 2025","jp":"2024年9月〜2025年6月"}'::jsonb, '{"id":"Staff PSDM","en":"Human Resource Development Staff","jp":"人材開発部門スタッフ"}'::jsonb, '{"id":"Staff Departemen Pengembangan Sumber Daya Manusia (PSDM) Himpunan Mahasiswa Teknik Informatika. Memimpin dan mengoordinasikan program Magang Teknik Informatika, OSPEK, dan Responsif. Pernah berperan sebagai ketua program, koordinator acara, sekretaris, humas, moderator, dan MC.","en":"Staff of the Human Resource Development Department (PSDM) of the Informatics Engineering Student Association. Led and coordinated the Informatics internship program, OSPEK, and Responsif, serving as program chair, event coordinator, secretary, public relations, moderator, and MC.","jp":"情報工学学生協会の人材開発部門（PSDM）スタッフ。情報学インターンシップ、OSPEK、Responsifなどのプログラムを主導・調整し、プログラム責任者、イベントコーディネーター、書記、広報、モデレーター、司会を務めました。"}'::jsonb, 5),
  ('asisten-praktikum-algoritma', 'work', 'Universitas Telkom', '{"id":"Sep 2024 s.d. Jan 2025","en":"Sep 2024 to Jan 2025","jp":"2024年9月〜2025年1月"}'::jsonb, '{"id":"Asisten Praktikum Algoritma Pemrograman","en":"Programming Algorithm Practicum Assistant","jp":"プログラミングアルゴリズム実習アシスタント"}'::jsonb, '{"id":"Memfasilitasi sesi praktikum Algoritma Pemrograman untuk mahasiswa tahun pertama, dan ikut menyusun tugas serta kuis akhir praktikum.","en":"Facilitated Programming Algorithm practicum sessions for first-year students, and helped prepare the assignments and the final practicum quizzes.","jp":"1年生向けのプログラミングアルゴリズム実習セッションを担当し、課題と最終クイズの作成にも参加しました。"}'::jsonb, 6),
  ('sircle-rnd', 'organization', 'Sircle Research and Development', '{"id":"Okt 2023 s.d. Jun 2024","en":"Oct 2023 to Jun 2024","jp":"2023年10月〜2024年6月"}'::jsonb, '{"id":"Member Divisi RPLM","en":"Software Engineering & Multimedia Division Member","jp":"ソフトウェア工学・マルチメディア部門メンバー"}'::jsonb, '{"id":"Anggota divisi Rekayasa Perangkat Lunak dan Multimedia (RPLM): mengikuti pelatihan pengembangan aplikasi dengan Flutter.","en":"Member of the Software Engineering & Multimedia (RPLM) division: trained in application development with Flutter.","jp":"ソフトウェア工学・マルチメディア部門（RPLM）のメンバーとして、Flutterによるアプリ開発のトレーニングを受けました。"}'::jsonb, 7),
  ('education-telkom', 'education', 'Universitas Telkom', '{"id":"2023 s.d. 2027","en":"2023 to 2027","jp":"2023年〜2027年"}'::jsonb, '{"id":"Sarjana Teknik Informatika","en":"Bachelor of Informatics Engineering","jp":"情報工学 学士課程"}'::jsonb, '{"id":"Menempuh studi Informatika dengan fokus pada rekayasa perangkat lunak, algoritma, dan basis data. Di luar kuliah, saya membangun proyek nyata: platform SaaS, aplikasi mobile, sampai layanan web yang dipakai publik, dan sedang mendalami machine learning dan computer vision.","en":"Studying Informatics with a focus on software engineering, algorithms, and databases. Alongside coursework I build real projects: SaaS platforms, mobile apps, and public web services, and I''m currently exploring machine learning and computer vision.","jp":"ソフトウェア工学、アルゴリズム、データベースを中心に情報学を学んでいます。授業と並行して、SaaSプラットフォーム、モバイルアプリ、公開Webサービスなど実践的なプロジェクトを開発し、機械学習とコンピュータビジョンも探求しています。"}'::jsonb, 8)
on conflict (id) do update set
  kind = excluded.kind,
  org = excluded.org,
  period = excluded.period,
  role = excluded.role,
  description = excluded.description,
  sort = excluded.sort;

-- portfolio_projects (10 rows)
insert into public.portfolio_projects (id, title, year, tech, description, repo_url, live_url, featured, sort)
values
  ('dompetku-web', 'DompetKu Web', '2026', ARRAY['Next.js', 'TypeScript', 'Prisma', 'Supabase']::text[], '{"id":"Pencatat keuangan pribadi: pemasukan dan pengeluaran dengan pintasan cepat, analisis per kategori, anggaran bulanan dengan peringatan, pemasukan rutin, dan impor/ekspor CSV. Sekaligus menjadi server akun dan REST API untuk aplikasi mobile-nya.","en":"Personal finance tracker: income and expense logging with quick shortcuts, per-category analytics, monthly budgets with warnings, recurring income, and CSV import/export. It also acts as the account server and REST API for its mobile app.","jp":"個人向け家計簿アプリ。クイック入力による収入・支出の記録、カテゴリ別分析、警告付き月次予算、定期収入、CSVのインポート／エクスポートを備え、モバイルアプリのアカウントサーバーとREST APIも兼ねています。"}'::jsonb, 'https://github.com/bintangyudhis/dompetku-web', 'https://dompetku.bintangyudhis.my.id', true, 1),
  ('pendekin', 'Pendekin', '2026', ARRAY['Next.js', 'TypeScript', 'Prisma', 'Supabase']::text[], '{"id":"Pemendek tautan dengan slug khusus dan pencatatan setiap klik. Dasbor pemilik menampilkan statistik per tautan dan kode QR; pembuatan tautan dibatasi laju permintaannya dan dilindungi dari SSRF.","en":"A link shortener with custom slugs and a log of every click. The owner dashboard shows per-link statistics and QR codes; link creation is rate-limited and protected against SSRF.","jp":"カスタムスラッグとクリック記録を備えたURL短縮サービス。所有者ダッシュボードではリンクごとの統計とQRコードを表示し、リンク作成にはレート制限とSSRF対策が施されています。"}'::jsonb, 'https://github.com/bintangyudhis/pendekin', 'https://pendekin.bintangyudhis.my.id', true, 2),
  ('saas-menu-digital', 'Menu Digital SaaS Multi-Toko', '2026', ARRAY['Laravel 12', 'Blade', 'MySQL']::text[], '{"id":"Platform SaaS untuk menu digital dan pemesanan yang melayani banyak toko dari satu basis kode: pengelolaan toko, penyusun menu, dan alur pesanan untuk setiap tenant.","en":"A SaaS platform for digital menus and ordering that serves many stores from a single codebase: store management, a menu builder, and an order flow for every tenant.","jp":"1つのコードベースで複数の店舗に対応する、デジタルメニューと注文のためのSaaSプラットフォーム。店舗管理、メニュー作成、テナントごとの注文フローを備えています。"}'::jsonb, 'https://github.com/bintangyudhis/SaaS-Menu-Digital-Multi-Toko-Laravel-12', NULL, true, 3),
  ('laundryapp', 'LaundryApp', '2026', ARRAY['Flutter', 'Dart', 'Laravel', 'REST API']::text[], '{"id":"Sistem pengelolaan laundry full-stack: aplikasi Flutter untuk pelanggan dan kurir, dengan backend API Laravel yang menangani pesanan, harga, dan pelacakan.","en":"A full-stack laundry management system: a Flutter app for customers and couriers, backed by a Laravel API handling orders, pricing, and tracking.","jp":"フルスタックのランドリー管理システム。顧客と配達員向けのFlutterアプリと、注文・料金・追跡を処理するLaravel APIで構成されています。"}'::jsonb, 'https://github.com/bintangyudhis/Flutter-Frontend-LaundryApp', NULL, true, 4),
  ('dompetku-app', 'DompetKu Aplikasi', '2026', ARRAY['Flutter', 'Dart', 'REST API']::text[], '{"id":"Pendamping mobile DompetKu Web: masuk dengan akun yang sama dan mencatat keuangan dari ponsel, terhubung ke API dan basis data yang sama.","en":"The mobile companion to DompetKu Web: sign in with the same account and track finances from your phone, connected to the same API and database.","jp":"DompetKu Webのモバイル版。同じアカウントでログインし、同じAPIとデータベースに接続してスマートフォンから家計を記録できます。"}'::jsonb, 'https://github.com/bintangyudhis/dompetku-app', NULL, false, 5),
  ('studio-foto', 'Studio Foto', '2026', ARRAY['Laravel', 'Blade', 'MySQL']::text[], '{"id":"Situs profil perusahaan untuk sebuah studio foto, lengkap dengan sistem reservasi untuk pemesanan sesi foto.","en":"A company profile website for a photo studio with an integrated reservation system for booking photo sessions.","jp":"写真スタジオの会社紹介サイト。撮影セッションを予約できる予約システムを統合しています。"}'::jsonb, 'https://github.com/bintangyudhis/Website-Company-Profile-dan-Sistem-Reservasi-Studio-Foto', NULL, false, 6),
  ('kelola-tiket', 'Web Kelola Tiket', '2025', ARRAY['Laravel', 'Vue.js', 'REST API']::text[], '{"id":"Aplikasi pengelolaan tiket dengan backend API Laravel dan frontend Vue.js untuk membuat, melacak, dan mengelola tiket.","en":"A ticket management app with a Laravel API backend and a Vue.js frontend for creating, tracking, and managing tickets.","jp":"チケット管理アプリ。Laravel APIのバックエンドとVue.jsのフロントエンドで、チケットの作成・追跡・管理を行います。"}'::jsonb, 'https://github.com/bintangyudhis/Web-Kelola-Tiket', NULL, false, 7),
  ('kasir-warung-yamien', 'Kasir Warung Yamien 12K', '2026', ARRAY['PHP', 'MySQL', 'Bootstrap']::text[], '{"id":"Sistem kasir (point of sale) untuk warung makan: menu, transaksi, dan laporan penjualan harian. Dibangun untuk tugas besar mata kuliah Informatika untuk Masyarakat.","en":"A point-of-sale system for a small food stall: menus, transactions, and daily sales reports. Built for a community informatics course assignment.","jp":"小さな食堂向けのPOS（レジ）システム。メニュー、取引、日次売上レポートを扱います。地域情報学の授業課題として制作しました。"}'::jsonb, 'https://github.com/bintangyudhis/Project-Kasir-Warung-Yamien-12-K', NULL, false, 8),
  ('e-voting', 'E-Voting', '2025', ARRAY['PHP', 'MySQL']::text[], '{"id":"Platform pemungutan suara online untuk organisasi mahasiswa: pemberian suara yang aman dan rekap hasil secara langsung.","en":"An online voting platform for student organizations: secure ballot casting and live result tallies.","jp":"学生団体向けのオンライン投票プラットフォーム。安全な投票とリアルタイムの集計結果を提供します。"}'::jsonb, 'https://github.com/bintangyudhis/Website-e-voting', NULL, false, 9),
  ('portfolio-ini', 'Portofolio Ini', '2026', ARRAY['Next.js', 'Tailwind CSS', 'Supabase']::text[], '{"id":"Situs yang sedang Anda baca: satu halaman editorial dengan konten tiga bahasa (Indonesia, Inggris, Jepang) yang dibaca dari basis data Supabase.","en":"The site you are reading: a single editorial page with trilingual content (Indonesian, English, Japanese) served from a Supabase database.","jp":"今ご覧のこのサイト。Supabaseデータベースから配信される3言語（インドネシア語・英語・日本語）コンテンツを持つ、エディトリアルな1ページサイトです。"}'::jsonb, 'https://github.com/bintangyudhis/portfolio', 'https://www.bintangyudhis.my.id', false, 10)
on conflict (id) do update set
  title = excluded.title,
  year = excluded.year,
  tech = excluded.tech,
  description = excluded.description,
  repo_url = excluded.repo_url,
  live_url = excluded.live_url,
  featured = excluded.featured,
  sort = excluded.sort;

-- portfolio_skills (5 rows)
insert into public.portfolio_skills (id, name, blurb, skills, sort)
values
  ('backend', '{"id":"Backend","en":"Backend","jp":"バックエンド"}'::jsonb, '{"id":"API dan logika server yang menjadi tulang punggung sebagian besar proyek saya.","en":"The APIs and server logic behind most of my projects.","jp":"私のプロジェクトの多くを支えるAPIとサーバーロジック。"}'::jsonb, '[{"name":"PHP / Laravel","level":"advanced"},{"name":"REST API","level":"advanced"},{"name":"MySQL","level":"advanced"}]'::jsonb, 1),
  ('frontend', '{"id":"Frontend","en":"Frontend","jp":"フロントエンド"}'::jsonb, '{"id":"Antarmuka web yang cepat dan rapi, dari halaman profil sampai dasbor.","en":"Fast, tidy web interfaces, from profile pages to dashboards.","jp":"プロフィールページからダッシュボードまで、高速で整ったWebインターフェース。"}'::jsonb, '[{"name":"Tailwind CSS","level":"advanced"},{"name":"JavaScript / Vue.js","level":"proficient"},{"name":"Next.js / React","level":"proficient"}]'::jsonb, 2),
  ('mobile', '{"id":"Mobile","en":"Mobile","jp":"モバイル"}'::jsonb, '{"id":"Aplikasi Android dan iOS dari satu basis kode dengan Flutter.","en":"Android and iOS apps from a single codebase with Flutter.","jp":"Flutterによる単一コードベースのAndroid／iOSアプリ。"}'::jsonb, '[{"name":"Dart / Flutter","level":"proficient"}]'::jsonb, 3),
  ('ai-data', '{"id":"AI & Data","en":"AI & Data","jp":"AIとデータ"}'::jsonb, '{"id":"Bidang yang sedang saya dalami: pembelajaran mesin dan visi komputer dengan Python.","en":"The field I''m growing into: machine learning and computer vision with Python.","jp":"今深めている分野。Pythonによる機械学習とコンピュータビジョン。"}'::jsonb, '[{"name":"Python","level":"proficient"},{"name":"Machine Learning","level":"exploring"},{"name":"Computer Vision","level":"exploring"}]'::jsonb, 4),
  ('tools', '{"id":"Perkakas","en":"Tools","jp":"ツール"}'::jsonb, '{"id":"Peralatan pendukung alur kerja pengembangan sehari-hari.","en":"The supporting tools of my daily development workflow.","jp":"日常の開発ワークフローを支えるツール。"}'::jsonb, '[{"name":"Git & GitHub","level":"advanced"}]'::jsonb, 5)
on conflict (id) do update set
  name = excluded.name,
  blurb = excluded.blurb,
  skills = excluded.skills,
  sort = excluded.sort;

-- portfolio_certifications (3 rows)
insert into public.portfolio_certifications (id, title, issuer, issued, credential_id, sort)
values
  ('cognitive-class-big-data-101', 'Big Data 101', 'Cognitive Class', '{"id":"Mar 2026","en":"Mar 2026","jp":"2026年3月"}'::jsonb, '19d98d60436246d69628ef424e6b8d6c', 1),
  ('cognitive-class-nosql-dbaas-101', 'NoSQL and DBaaS 101', 'Cognitive Class', '{"id":"Mar 2026","en":"Mar 2026","jp":"2026年3月"}'::jsonb, '6385e79ffa4e47b79bec119a2bafc980', 2),
  ('cognitive-class-sql-relational-101', 'SQL and Relational Databases 101', 'Cognitive Class', '{"id":"Mar 2026","en":"Mar 2026","jp":"2026年3月"}'::jsonb, '962a867d93d245cfb7e4d88bc1f6f0e4', 3)
on conflict (id) do update set
  title = excluded.title,
  issuer = excluded.issuer,
  issued = excluded.issued,
  credential_id = excluded.credential_id,
  sort = excluded.sort;

commit;
