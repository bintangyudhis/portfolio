# Redesign Portofolio — Catatan Kerja

Rombak total bintangyudhis.my.id, Oktober 2026. Dokumen ini mencatat riset
referensi, data hasil kurasi (dengan sumbernya), arah desain, dan laporan akhir.

---

## 1. Riset referensi — aulky.app

Sumber: https://aulky.app/ (halaman utama, diambil teks + strukturnya pada
26 Oktober 2026). Yang diambil adalah **pola struktur dan rasa desainnya**,
bukan aset, teks, atau identitas pemiliknya.

Struktur halaman (satu halaman panjang, urut):

1. **Hero ringkas** — nama lengkap, satu baris peran, satu paragraf perkenalan
   yang faktual (kampus, fokus, jenis pekerjaan), foto diri. Tidak ada tombol
   CTA ganda, tidak ada statistik pajangan.
2. **Background & Approach** — satu kalimat pernyataan besar, dua paragraf
   penjelasan cara berpikir, lalu empat sub-bagian pendek berbentuk prosa
   (bukan kartu): arsitektur modular, analisis data, database & otomatisasi,
   performa & UX. Masing-masing satu-dua kalimat spesifik.
3. **Experience & Activities** — daftar entri pengalaman yang sangat detail:
   jabatan, label jenis (Internship/Project), organisasi, periode, lokasi,
   deskripsi, lalu daftar sorotan berpoin dan deretan tag teknologi. Nada
   tulisannya seperti CV yang diperluas, bukan kartu ringkasan.
4. **Education & Certifications** — blok pendidikan formal + sertifikasi,
   dipisah dari pengalaman.
5. **Featured Projects** — kartu proyek dengan kategori, deskripsi satu-dua
   kalimat, tag teknologi, dan meta kecil (versi, jumlah commit). Ada tautan
   "View All".
6. **Technical Skills** — dikelompokkan per bidang; tiap kelompok punya satu
   kalimat penjelasan, lalu daftar keahlian dengan **tingkat kata**
   (Advanced/Proficient) — bukan progress bar persen.
7. **GitHub Statistics** — satu baris angka polos (contributions, commits,
   repositories, followers) tanpa grafik pajangan.
8. **Contact** — heading pernyataan besar ("Let's Connect and Collaborate."),
   satu kalimat undangan, lalu formulir.

Pola yang diadopsi untuk portofolio ini:

- Satu halaman panjang dengan urutan: perkenalan → tentang → pengalaman →
  proyek → keahlian → kontak.
- Pengalaman ditulis seperti entri CV: jabatan, organisasi, periode,
  deskripsi faktual. Timeline dibaca sebagai daftar, bukan kartu melayang.
- Keahlian per kelompok bidang dengan tingkat berupa kata.
- Proyek dengan meta jujur (tahun, teknologi, tautan repo/live) — tanpa
  klaim bintang/commit yang tidak diverifikasi.
- Tipografi dan spasi yang menanggung desain; dekorasi minim.

Yang TIDAK diadopsi: foto (foto profil GitHub Yudhis saat ini adalah karakter
anime, bukan foto diri — hero dibuat tipografis), angka statistik GitHub
pajangan, dan seluruh teks/identitas pemilik aulky.app.

---

## 2. Data Yudhis — hasil kurasi & sumbernya

### Berhasil diambil

| Data | Sumber |
| --- | --- |
| Nama, peran, universitas, lokasi, tautan GitHub/LinkedIn, about, keahlian, 8 proyek, 1 pengalaman pendidikan | `src/lib/seed.ts` situs lama — data yang dulu diberikan Yudhis sendiri untuk CMS KV |
| Paragraf perkenalan Bahasa Indonesia dengan suara Yudhis sendiri ("Saya suka bikin website, aplikasi, dan model machine learning… chatbot Telegram dan Discord…") | README profil GitHub `bintangyudhis/bintangyudhis` (publik) |
| Daftar repo publik, deskripsi, bahasa utama, tahun | GitHub API publik `api.github.com/users/bintangyudhis/repos` (32 repo publik) |
| Kanal kontak tambahan: Instagram `@yudhis_gaiden`, Discord | Lencana "Connect With Me" di README profil GitHub |
| Email publik `bintangyudhistira@student.telkomuniversity.ac.id` | Tercantum publik di profil GitHub (catatan memori proyek) |
| Koreksi URL live Pendekin: `pendekin.bintangyudhis.my.id` (bukan `pendekin-nine.vercel.app`) | Status proyek terverifikasi 24–25 Okt 2026 |
| Pendiri komunitas Discord "Gaiden Community" (gaming Valorant + teknologi), Okt 2026 | Catatan proyek yang disampaikan Yudhis sendiri |
| Kontribusi open source: PR #477 ke `Astrotomic/laravel-translatable` (dokumentasi scope), Okt 2026 | GitHub publik |

### Tidak terjangkau

- **LinkedIn** (`linkedin.com/in/bintang-yudhistira-278448289`): server
  LinkedIn menolak pengambilan otomatis (HTTP 999, halaman login-wall).
  Pengalaman kerja/organisasi yang hanya ada di LinkedIn **tidak** bisa
  diverifikasi, jadi tidak dimuat. Situs lama memang hanya memuat satu
  entri pengalaman (pendidikan); entri organisasi di bawah ini hanya yang
  terverifikasi dari sumber lain (GitHub publik + catatan Yudhis sendiri).
- **Repo privat** `Web-BMC-SediaIN` tidak ditampilkan di situs publik,
  sesuai aturan.

### Data terkurasi yang dimuat situs (dan di-seed ke database)

**Profil** — Bintang Yudhistira, Pengembang Perangkat Lunak, Purwokerto,
Indonesia; S1 Informatika, Telkom University Purwokerto (2023–sekarang).

**Pengalaman** (timeline):
1. Kontributor Open Source — Astrotomic/laravel-translatable (GitHub),
   2026. Perbaikan dokumentasi method scope agar terbaca IDE; PR #477.
2. Pendiri Komunitas — Gaiden Community (Discord), 2026–sekarang.
   Komunitas gaming (Valorant) dan teknologi/pengembangan.
3. Pendidikan — S1 Informatika, Telkom University Purwokerto,
   2023–sekarang. Fokus: rekayasa perangkat lunak, algoritma, basis data;
   sedang mendalami machine learning & computer vision.

**Proyek** (10; 4 unggulan ditandai):
1. **DompetKu (Web)** — pencatat keuangan pribadi + REST API untuk aplikasi
   mobile. Next.js, TypeScript, Prisma, Supabase. Live + repo. ★
2. **Pendekin** — pemendek tautan, slug khusus, analitik klik, dasbor
   pemilik. Next.js, TypeScript, Prisma, Supabase. Live + repo. ★
3. **Menu Digital SaaS Multi-Toko** — platform menu & pemesanan
   multi-tenant. Laravel 12, Blade, MySQL. Repo. ★
4. **LaundryApp** — aplikasi laundry: Flutter untuk pelanggan/kurir,
   API Laravel. Flutter, Dart, Laravel, REST API. Repo. ★
5. DompetKu (Aplikasi Flutter) — pendamping mobile DompetKu Web, memakai
   API dan akun yang sama. Flutter, Dart.
6. Studio Foto — profil perusahaan + sistem reservasi sesi foto.
   Laravel, Blade, MySQL.
7. Web Kelola Tiket — pengelolaan tiket, API Laravel + frontend Vue.js.
8. Kasir Warung Yamien 12K — kasir (POS) warung makan: menu, transaksi,
   laporan harian. PHP, MySQL, Bootstrap.
9. E-Voting — pemungutan suara online untuk organisasi mahasiswa.
   PHP, MySQL.
10. Portofolio ini — situs yang sedang dibaca. Next.js, Tailwind CSS,
    Supabase.

**Keahlian** (dari seed lama; tingkat angka diubah menjadi kata —
≥85 "Mahir", 70–84 "Terampil", <70 "Sedang didalami"; Next.js/React
ditambahkan karena terbukti dari repo-repo publiknya):
- Backend: PHP/Laravel (Mahir), REST API (Mahir), MySQL (Mahir)
- Frontend: Tailwind CSS (Mahir), JavaScript/Vue.js (Terampil),
  Next.js/React (Terampil)
- Mobile: Dart/Flutter (Terampil)
- AI & Data: Python (Terampil), Machine Learning (Sedang didalami),
  Computer Vision (Sedang didalami)
- Perkakas: Git & GitHub (Mahir)

Semua deskripsi proyek & pengalaman ditulis dalam tiga bahasa
(ID/EN/JP) secara manual di `src/lib/content.ts` — file yang sama dipakai
sebagai fallback render dan sebagai sumber seed database.

---

## 3. Arah desain

**Genre:** editorial. **Struktur:** dokumen panjang satu halaman dengan
kolom meta di sisi kiri (pola CV modern), bukan tumpukan kartu simetris.

**Palet** (token CSS, tanpa gradient):
- `--color-paper` `#FAF8F2` — kertas hangat sebagai latar utama
- `--color-panel` `#F0EBDF` — panel selang-seling yang sangat tipis bedanya
- `--color-ink` `#1B1815` — tinta utama
- `--color-faded` `#6F675C` — teks sekunder
- `--color-flame` `#B33E15` — satu aksen: jingga bakar (tautan aktif,
  penanda timeline, garis bawah heading). Dipakai hemat.
- `--color-line` `#E2DCCF` — garis rambut pemisah
- `--color-coal` `#171310` — blok kontak/footer gelap (teks kertas)

Alasan: situs lama memakai ungu-indah generik + kaca (glassmorphism) yang
identik dengan ribuan portofolio hasil generate. Kertas + tinta + satu
aksen jingga memberi identitas yang berbeda dan cocok dengan format
dokumen/CV yang menjadi pola referensi.

**Tipografi** (next/font, Google Fonts):
- Display: **Fraunces** (serif kontras tinggi, roman saja — tanpa italic
  di heading) untuk nama raksasa dan heading seksi.
- Body/UI: **Archivo** untuk paragraf dan label antarmuka.
- Meta: **IBM Plex Mono** untuk tanggal, tahun, dan label kecil teknis.

**Elemen signature:** nama "Bintang Yudhistira" dalam Fraunces berukuran
sangat besar (clamp hingga ~7rem) memenuhi lebar hero, dengan kolom meta
mono di atasnya — dan seluruh halaman memakai **indeks bernomor nyata**
untuk daftar proyek (01–10) karena daftar proyek memang urutan kurasi,
bukan dekorasi. Garis rambut (`border-top`) memisahkan setiap entri;
tidak ada kartu melayang, bayangan lembut, atau sudut membulat seragam.

**Tata letak per seksi:**
- Header: masthead satu baris — wordmark kiri, navigasi tengah,
  toggle bahasa `ID | EN | JP` kanan; garis rambut di bawah; sticky.
- Hero: meta mono (Purwokerto — Telkom University Purwokerto), nama
  raksasa dua baris, lalu grid dua kolom: peran + kalimat tajam di kiri,
  paragraf perkenalan singkat + tautan (GitHub, LinkedIn, Email) di kanan.
- Tentang: judul di kolom kiri, prosa dua kolom di kanan + tiga butir
  "yang saya kerjakan" (Web & aplikasi / API & data / Otomatisasi & bot)
  sebagai daftar bergaris, bukan kartu.
- Pengalaman: timeline — kolom tanggal mono di kiri, jabatan/organisasi/
  deskripsi di kanan, garis vertikal tipis dengan titik aksen.
- Proyek: 4 unggulan sebagai baris besar bernomor dengan deskripsi penuh;
  sisanya sebagai indeks ringkas bernomor lanjut. Tahun + teknologi dalam
  mono; tautan "Kode" dan "Live" berupa teks bergaris bawah.
- Keahlian: kelompok bidang sebagai baris tabel bergaris: nama kelompok +
  kalimat penjelas di kiri, daftar keahlian + tingkat kata di kanan.
- Kontak: blok gelap (coal) — kalimat pernyataan besar, email sebagai
  tautan besar, daftar kanal (GitHub, LinkedIn, Instagram, Discord),
  dan formulir kontak (anti-spam sama seperti sebelumnya).

**Gerakan:** satu momen saja — nama hero muncul dengan fade/geser halus
saat halaman dimuat (`prefers-reduced-motion` dihormati). Tidak ada
animasi scroll beruntun, tidak ada blob, tidak ada typewriter.

**Bahasa:** default Indonesia. Toggle di header menulis cookie
`pb-lang` (+ localStorage) lalu me-refresh render server; seluruh teks
UI dan konten (profil, pengalaman, proyek, keahlian) tersedia dalam
ID/EN/JP dari dictionary + konten terjemahan manual.

**Data:** server component membaca Supabase Postgres (project `dompetku`)
lewat koneksi `pg` server-side — lihat bagian 4 untuk status kredensial.
Bila DB tak terjangkau, render memakai `src/lib/content.ts` (data yang
sama dengan yang di-seed) sehingga situs tidak pernah tampil kosong.
File lama yang diganti/dihapus dicatat di bagian 4.

---

## 4. Laporan akhir (26 Oktober 2026)

### Yang dibangun

Situs satu halaman penuh (route lama `/projects`, `/experience`, `/contact`
digabung ke beranda):

- **Hero** — meta lokasi/universitas, nama raksasa Fraunces, peran + satu
  kalimat tajam, paragraf perkenalan (suara Yudhis dari README GitHub-nya),
  tautan GitHub/LinkedIn/email, dua tombol teks.
- **Tentang** — dua paragraf + tiga butir fokus kerja sebagai daftar bergaris.
- **Pengalaman** — timeline garis vertikal: periode (mono) + jabatan,
  organisasi, label jenis, deskripsi. Isi: kontribusi open source
  (Astrotomic, PR #477), pendiri Gaiden Community, pendidikan Telkom.
- **Proyek** — 4 unggulan sebagai baris bernomor besar + 6 sisanya sebagai
  indeks ringkas bernomor lanjut; tahun & teknologi dalam mono; tautan
  Kode/Live di setiap entri.
- **Keahlian** — 5 kelompok bidang bergaya baris tabel; tingkat berupa kata
  (Mahir/Terampil/Sedang didalami), tanpa progress bar.
- **Kontak** — blok gelap: pernyataan besar, daftar kanal (email, GitHub,
  LinkedIn, Instagram, Discord), dan formulir dengan anti-spam yang sama
  seperti situs lama (honeypot, time-trap, rate limit 5/jam/IP, validasi).
- **Header/footer** — masthead sticky dengan toggle bahasa `ID | EN | JP`;
  footer gelap berisi kanal + hak cipta.

### Sumber data per seksi

Semua dari bagian 2: seed CMS lama (profil, keahlian, proyek, pendidikan),
README profil GitHub (paragraf perkenalan + kanal Instagram/Discord),
GitHub API (verifikasi repo/deskripsi/tahun), catatan proyek Yudhis
(Gaiden Community, koreksi URL live Pendekin, PR #477). **LinkedIn tidak
terjangkau** (HTTP 999/login-wall) — tidak ada data LinkedIn yang dimuat
atau dikarang.

### Status database Supabase

- Migrasi SQL idempoten **sudah ditulis**:
  `supabase/migrations/0001_portfolio_tables.sql` — tabel
  `portfolio_profile`, `portfolio_experiences`, `portfolio_projects`,
  `portfolio_skills`, `portfolio_messages`; RLS aktif; policy SELECT
  publik read-only untuk tabel konten; tabel pesan tanpa policy publik.
- Skrip setup **sudah ditulis dan teruji jalur errornya**:
  `npm run db:setup` (`scripts/db-setup.ts`) menerapkan migrasi + upsert
  seluruh konten dari `src/lib/content.ts`.
- **Tabel belum bisa dibuat dari lingkungan ini**: satu-satunya salinan
  `DATABASE_URL` project `dompetku` ada di env Vercel project lain —
  `.env` lokal repo streak ternyata hanya placeholder SQLite
  (`file:./dev.db`), dan kredensial helper Vercel di workspace ini
  ditolak API (HTTP 403). Anon key project juga tidak ditemukan di
  file/env mana pun di workspace. Karena itu lapisan data dirancang
  membaca lewat koneksi `pg` server-side (tidak butuh anon key sama
  sekali) — pilihan fallback yang memang disiapkan di rencana.
- **Status render saat ini: FALLBACK.** Situs membaca `src/lib/content.ts`
  (data identik dengan yang akan di-seed). Formulir kontak menjawab 503
  yang jujur selama DATABASE_URL belum terpasang, dengan teks yang
  mengarahkan ke email.
- Untuk mengaktifkan DB, cukup satu langkah (lihat "Menunggu Yudhis"):
  isi `DATABASE_URL` di `.env.local` + env Vercel project ini, lalu
  `npm run db:setup`.

### Status i18n

Toggle `ID | EN | JP` di header berfungsi penuh: menulis cookie `pb-lang`
(+ localStorage), me-refresh render server, `<html lang>` ikut berubah
(`id`/`en`/`ja`). Dictionary UI lengkap tiga bahasa (`src/lib/i18n.ts`);
seluruh konten (profil, 3 pengalaman, 10 proyek, 5 kelompok keahlian)
diterjemahkan manual tiga bahasa. Terverifikasi lewat server produksi
lokal: ketiga bahasa render benar.

### Status build & pemeriksaan

- `npm run build` — **lolos** (route `/` dinamis + `/api/contact`).
- `npm run lint` — **bersih**.
- Uji runtime (server produksi lokal): render ID default ✓, EN via
  cookie ✓, JP via cookie + `lang="ja"` ✓, honeypot formulir ✓,
  formulir tanpa DB → 503 jujur ✓, halaman tetap render penuh tanpa DB ✓.
- Pemindai kill-ai-slop: 25 hit awal → 14 setelah triase. Sisa hit yang
  disengaja: mono hanya untuk data (tanggal/periode, tahun, nomor indeks,
  daftar teknologi, nilai tingkat, kode bahasa) sebagai suara dokumen;
  grup lain positif-palsu (headline kontak hanya dua kata; `↗`/`©` adalah
  simbol tipografis penanda tautan eksternal, bukan emoji; jarak seragam
  pada formulir memang fungsional). Label antarmuka diubah dari mono
  uppercase menjadi Archivo semibold agar tidak terasa "terminal".
- Yang dihapus dari situs lama (semua diganti arsitektur di atas):
  halaman `/projects`, `/experience`, `/contact`, CMS `/admin` +
  `/api/admin/*` (**dinonaktifkan** — bukan sekadar disembunyikan),
  `src/lib/seed.ts`, `store.ts` (KV), `auth.ts`, `types.ts`,
  komponen Navbar/Footer/ProjectCard/Typewriter/Reveal, dependensi
  `@vercel/kv`, dan 5 SVG bawaan template Next.js di `public/`.
  Ketergantungan Upstash KV hilang total dari jalur render maupun repo.

### Menunggu keputusan / tindakan Yudhis

1. **DATABASE_URL** — tempel nilai dari env Vercel project dompetku-web
   (atau Supabase Dashboard → Database) ke `.env.local` repo ini dan ke
   env Vercel project `portfolio`, lalu jalankan `npm run db:setup`
   (atau minta saya menjalankannya setelah nilainya diberikan). Setelah
   itu situs membaca dari Supabase dan formulir kontak aktif menyimpan.
2. **Data LinkedIn** — pengalaman kerja/organisasi yang hanya ada di
   LinkedIn belum termuat karena LinkedIn memblokir pengambilan otomatis.
   Bila ada pengalaman lain yang ingin ditampilkan (magang, organisasi
   kampus, asisten lab, dll.), berikan datanya dan saya tambahkan ke
   timeline + database.
3. **Pesan kontak lama** di KV (bila ada) tidak dimigrasikan — inbox CMS
   lama pensiun bersama `/admin`; pesan baru masuk ke tabel
   `portfolio_messages` dan dibaca lewat Supabase.
4. Belum di-push dan belum di-deploy — menunggu instruksi.

---

## 5. Tahap 2 (26 Oktober 2026) — jalur anon-key, seed.sql, data LinkedIn

### Data LinkedIn terintegrasi

`LINKEDIN-DATA.md` (diambil dari profil publik lewat browser) kini menjadi
sumber tambahan yang terverifikasi; kalimat "LinkedIn tidak terjangkau" di
bagian 2 & 4 sudah tidak berlaku. Yang ditambahkan ke `src/lib/content.ts`
dan `supabase/seed.sql`:

- **5 pengalaman** (digabung dengan OSS Astrotomic + Gaiden Community yang
  dipertahankan; urutan kronologis menurun, pendidikan tetap terakhir):
  Junior Software Engineer — PT Krisna Ardhi Tama (Jan–Jun 2026, divisi
  Full-Stack, implementasi ERP); Student Intern — Pengadilan Negeri
  Purwokerto (Jul–Agu 2025, chatbot broadcast Node.js, OBS/Zoom sidang);
  Staff PSDM — HMIF IT Telkom Purwokerto (Sep 2024–Jun 2025); Asisten
  Praktikum Algoritma Pemrograman — Universitas Telkom (Sep 2024–Jan
  2025); Member Divisi RPLM — Sircle Research and Development (Okt 2023–
  Jun 2024). Deskripsi ditulis ulang ringkas dari file sumber, tanpa
  klaim tambahan, diterjemahkan ID/EN/JP.
- **Pendidikan diperbarui**: Universitas Telkom — Sarjana Teknik
  Informatika, 2023–2027.
- **3 sertifikasi Cognitive Class** (Mar 2026): Big Data 101; NoSQL and
  DBaaS 101; SQL and Relational Databases 101 — lengkap dengan ID
  kredensial publiknya.
- **Bahasa** (dari profil LinkedIn): Indonesia & Sunda (profesional
  mahir), Inggris (terbatas fungsional), Jepang (dasar) — masuk data
  profil dan tampil sebagai daftar sederhana.

### Skema: migrasi 0002

`supabase/migrations/0002_portfolio_certifications.sql` (idempoten):
tabel `portfolio_certifications` (RLS aktif, policy SELECT publik
read-only — pola sama seperti 0001) + kolom `languages jsonb` pada
`portfolio_profile`. `scripts/db-setup.ts` diperbarui setara: menerapkan
semua migrasi berurutan + upsert sertifikasi dan bahasa.

### Tampilan

Seksi Keahlian kini memuat dua daftar sederhana bergaya baris bergaris
yang sama (tanpa mengubah arah desain): **Sertifikasi** (judul + ID
kredensial mono + penerbit · tanggal) dan **Bahasa** (nama + tingkat).
Kunci UI baru di `src/lib/i18n.ts`: `certificationsTitle`,
`credentialIdLabel`; salinan `experienceIntro` disesuaikan (kini memuat
pekerjaan sungguhan).

### Lapisan data — tidak lagi bergantung pada DATABASE_URL

File baru `src/lib/supabase.ts`: factory klien anon & service-role dari
env, masing-masing mengembalikan null bila env absen. `src/lib/db.ts`
dirombak; urutan sumber baca konten sekarang:

1. **Supabase REST** (`@supabase/supabase-js`, baru dipasang) dengan
   `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` —
   PostgREST, RLS read-only. Tanpa password database sama sekali.
2. **pg / DATABASE_URL** — jalur lama dipertahankan sebagai alternatif.
3. **Fallback** `src/lib/content.ts` — situs tidak pernah kosong.

Pemetaan baris → tipe konten dipakai bersama oleh kedua jalur DB.
Sertifikasi dibaca best-effort (database yang baru punya migrasi 0001
tetap melayani konten lain), dan `languages` profil jatuh ke daftar
kurasi bila kolomnya belum ada.

Formulir kontak: `insertMessage` kini mencoba **service-role key**
(`SUPABASE_SERVICE_ROLE_KEY`, supabase-js, bypass RLS) lebih dulu, lalu
koneksi pg; tanpa keduanya tetap menjawab **503 jujur**. Tidak ada policy
publik yang dibuat untuk `portfolio_messages`.

### seed.sql (siap tempel ke SQL Editor)

`supabase/seed.sql` — dihasilkan terprogram dari `src/lib/content.ts`
agar persis sama, SQL PostgreSQL murni tanpa placeholder, upsert
idempoten `ON CONFLICT (id) DO UPDATE` (kunci utama skema adalah `id`;
slug konten disimpan di kolom itu). Isi: profil 1 baris (termasuk
`languages`), pengalaman **8**, proyek **10**, kelompok keahlian **5**,
sertifikasi **3** — total 117 baris, semua literal jsonb tervalidasi.
Jalankan setelah migrasi 0001 + 0002.

### Env

`.env.example` ditulis ulang berisi empat nama env tanpa nilai asli:
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`SUPABASE_SERVICE_ROLE_KEY`, `DATABASE_URL` (opsional). `.gitignore`:
`.env*` sudah mencakup `.env.local` (terverifikasi `git check-ignore`);
ditambah pengecualian `!.env.example` agar contohnya bisa ter-commit.

### Verifikasi tahap 2

- `npm run build` — **lolos**; `npm run lint` — **bersih**.
- Server produksi lokal **tanpa env Supabase/DATABASE_URL apa pun**:
  render penuh dari fallback — kelima pengalaman LinkedIn, pendidikan
  baru, dan ketiga sertifikasi tampil (locale ID); locale EN menampilkan
  "Certifications" dan peran terjemahan; `POST /api/contact` dengan
  payload valid menjawab **503** seperti yang diharapkan.
- Aktivasi DB sekarang cukup: jalankan migrasi 0001 + 0002 lalu
  `seed.sql` di SQL Editor Supabase, dan pasang
  `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` (+
  `SUPABASE_SERVICE_ROLE_KEY` untuk formulir) di `.env.local` / env
  Vercel. DATABASE_URL tidak lagi wajib.
- Belum di-push — menunggu instruksi, sama seperti tahap 1.

---

## 6. Tahap 3 (26 Oktober 2026) — CMS admin penuh

Panel admin supaya seluruh konten situs (tulisan **dan** foto) bisa diatur
tanpa menyentuh kode. CMS lama yang dinonaktifkan di tahap 1 kini diganti
arsitektur baru yang menulis ke Supabase (bukan KV).

### Urutan migrasi (final)

Jalankan di SQL Editor Supabase project `dompetku`, berurutan:

1. `supabase/migrations/0001_portfolio_tables.sql` — tabel konten + pesan
2. `supabase/migrations/0002_portfolio_certifications.sql` — sertifikasi + `portfolio_profile.languages`
3. `supabase/migrations/0003_portfolio_media.sql` — **baru di tahap ini**
4. `supabase/seed.sql` — isi awal

### Migrasi 0003 — media

- `portfolio_profile` + kolom `photo_url text` (foto profil).
- `portfolio_projects` + kolom `image_url text` (gambar proyek).
- Bucket Storage **`portfolio-media`** (publik) dibuat idempoten lewat
  `insert ... on conflict do nothing` ke `storage.buckets`.
- Policy storage: SELECT publik hanya untuk bucket `portfolio-media`.
  Tidak ada policy INSERT/UPDATE/DELETE untuk anon/authenticated — unggah,
  ganti, dan hapus berkas hanya mungkin lewat **service role** dari rute
  server CMS (service role melewati RLS).
- Kode publik toleran terhadap database yang belum menjalankan 0003:
  kolom yang absen terbaca sebagai undefined dan tampilan kembali seperti
  tahap 2 (tanpa foto/gambar).

### Autentikasi (satu pemilik)

- Env server `ADMIN_PASSWORD`. Login di `/admin/login` →
  `POST /api/admin/login` memverifikasi dengan perbandingan timing-safe
  (digest SHA-256) lalu memasang cookie sesi `pb-admin-session`:
  httpOnly, SameSite=Lax, path=/, berlaku 7 hari, Secure di produksi.
  Isi cookie hanya masa kedaluwarsa + tanda tangan **HMAC-SHA256**
  (Node `crypto`); secret dari env `ADMIN_SESSION_SECRET`, jatuh ke
  `ADMIN_PASSWORD` bila env itu kosong.
- Penjagaan berlapis: **proxy** (`src/proxy.ts`, konvensi Next 16)
  menggerbang `/admin/*` dan `/api/admin/*` (redirect/401), dan setiap
  halaman panel + rute API memeriksa ulang sesi lewat helper server
  (`requireAdminPage` / `adminApiGuard`). Rute login sendiri publik.
- `POST /api/admin/logout` menghapus cookie.
- Proxy juga mencap header `x-pathname`; layout akar memakainya untuk
  merender layar admin **tanpa** header/footer situs publik.

### API admin (semua server-side, service-role)

Basis: `src/lib/admin-route.ts` (guard + klien + invalidasi cache).
Bila `SUPABASE_SERVICE_ROLE_KEY`/`NEXT_PUBLIC_SUPABASE_URL` belum
terpasang, semua rute data menjawab **503** "Database belum terhubung"
— tidak ada penulisan pura-pura.

| Rute | Fungsi |
| --- | --- |
| `POST /api/admin/login` · `POST /api/admin/logout` | Sesi |
| `GET /api/admin/overview` | Status DB + jumlah baris per tabel + pesan belum dibaca |
| `GET/PUT /api/admin/profile` | Profil penuh: identitas, tautan sosial, `photo_url`, semua teks ID/EN/JP, about (per bahasa), fokus, bahasa |
| `GET/POST /api/admin/experiences` · `PUT/DELETE /api/admin/experiences/[id]` | CRUD pengalaman |
| `GET/POST /api/admin/projects` · `PUT/DELETE /api/admin/projects/[id]` | CRUD proyek (termasuk `image_url`) |
| `GET/POST /api/admin/skills` · `PUT/DELETE /api/admin/skills/[id]` | CRUD kelompok keahlian + skill di dalamnya |
| `GET/POST /api/admin/certifications` · `PUT/DELETE /api/admin/certifications/[id]` | CRUD sertifikasi |
| `GET /api/admin/messages` · `PATCH/DELETE /api/admin/messages/[id]` | Pesan kontak: daftar (terbaru dulu), tandai dibaca, hapus |
| `POST /api/admin/upload` | Multipart → bucket `portfolio-media` (nama unik timestamp-slug), balas URL publik. Validasi: PNG/JPG/WebP/GIF, maks 5 MB |

Validasi dasar di semua penulisan: field wajib, teks multibahasa harus
objek `{id, en, jp}`, slug harus pola huruf kecil-angka-hubung dan unik
untuk pembuatan (konflik → 409), kind/level diperiksa terhadap daftar
yang sah. Setiap penulisan berhasil memanggil invalidasi cache konten
proses + `revalidatePath("/")`; halaman publik sendiri `force-dynamic`,
jadi perubahan terbaca segar tanpa rebuild.

### UI admin (Bahasa Indonesia)

Layout `/admin` dengan navigasi samping: **Ringkasan** (status DB +
kartu jumlah konten), **Profil**, **Pengalaman**, **Proyek**,
**Keahlian**, **Sertifikasi**, **Pesan Masuk**, tautan **Lihat Situs**,
dan **Keluar**. Setiap teks multibahasa diedit sebagai tiga field
berlabel ID / EN / JP mengikuti bentuk jsonb; about diedit sebagai
textarea satu paragraf per baris per bahasa. Profil & proyek punya
pengunggah gambar dengan pratinjau langsung (URL juga bisa ditempel
manual). Semua form menyimpan lewat fetch ke API admin dengan indikator
sukses/gagal yang jelas; penghapusan meminta konfirmasi.

### Sisi publik: foto

- Foto profil (`photo_url`) tampil di kolom kanan hero dalam bingkai
  garis sederhana + keterangan mono (nama — lokasi), sejalan gaya
  editorial; tanpa foto, hero persis seperti tahap 2.
- Gambar proyek (`image_url`) tampil pada baris unggulan (di atas meta
  tahun/teknologi) dan baris indeks ringkas (di bawah deskripsi); tanpa
  gambar, tampilan tidak berubah.
- `next.config.ts`: `images.remotePatterns` mengizinkan
  `*.supabase.co/storage/v1/object/public/**` agar `next/image` melayani
  URL bucket. Tipe konten (`content.ts`) dan pemetaan ketiga sumber
  (`db.ts`) diperbarui untuk `photoUrl`/`imageUrl`.

### Env yang dibutuhkan untuk aktivasi penuh

Di `.env.local` dan env Vercel project `portfolio`:

- `ADMIN_PASSWORD` — wajib agar login CMS bisa dipakai.
- `ADMIN_SESSION_SECRET` — disarankan (acak panjang); fallback ke
  `ADMIN_PASSWORD` bila kosong.
- `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` — bacaan
  publik (tahap 2).
- `SUPABASE_SERVICE_ROLE_KEY` — penulisan CMS + unggah + formulir kontak.
- `DATABASE_URL` — tetap opsional (jalur cadangan lama).

`.env.example` sudah ditambah kedua nama env admin (tanpa nilai);
`.env.local` terverifikasi tetap gitignored.

### Verifikasi tahap 3

- `npm run build` — **lolos** (22 rute, termasuk 7 halaman admin dan 13
  rute API admin; Proxy terdaftar). `npm run lint` — **bersih**.
- Uji runtime (server produksi lokal, `ADMIN_PASSWORD` uji, tanpa env
  Supabase): `/` render fallback 200 · `/admin` tanpa sesi → 307 ke
  `/admin/login` · halaman login 200 **tanpa** chrome situs publik ·
  API tanpa cookie → 401 · login kata sandi salah → 401 · login benar →
  200 + cookie sesi terpasang · `/admin` dan `/admin/pesan` dengan sesi
  → 200 · `GET /api/admin/overview` dan `/api/admin/profile` dengan sesi
  → **503 rapi** "Database belum terhubung…" (bukan crash) · logout →
  sesi berakhir (kembali 307).
- Satu catatan lingkungan uji: port uji sempat terpakai server lama
  tahap sebelumnya (EADDRINUSE) — dikenali dari 404 dan diatasi dengan
  mematikan proses lama sebelum pengujian ulang.
- Aktivasi penuh tinggal: jalankan migrasi 0001→0002→0003 + seed (alur
  lain yang sedang berjalan), pasang env di atas, lalu login di
  `/admin/login`. Belum di-push — menunggu instruksi.
