# Portfolio Bintang Yudhistira

Situs portofolio pribadi Bintang Yudhistira. Situs ini menampilkan profil, pengalaman, publikasi, proyek, keahlian, dan statistik GitHub dalam tiga bahasa, yaitu Indonesia, Inggris, dan Jepang. Seluruh konten dikelola lewat CMS admin bawaan.

Situs live: https://www.bintangyudhis.my.id

## Fitur

- Satu halaman berisi hero, tentang, pengalaman, pendidikan, publikasi, proyek unggulan, daftar semua repositori GitHub publik, keahlian, statistik GitHub, dan kontak.
- Tiga bahasa dipilih lewat toggle di header dan tersimpan di cookie pengunjung.
- Statistik GitHub dan grafik kontribusi diambil dari API publik GitHub dan diperbarui berkala.
- Dua tombol CV, Bahasa Indonesia dan Bahasa Inggris.
- Formulir kontak yang membuka draf email di aplikasi email pengunjung lewat skema mailto. Panel konfirmasi menyediakan pilihan membuka Gmail Web atau aplikasi email.
- Mode terang dan gelap.
- CMS admin di `/admin` untuk mengelola profil, foto, berkas CV, pengalaman, proyek, keahlian, sertifikasi, dan publikasi. Login memakai kata sandi admin dengan sesi bertanda tangan HMAC.
- Konten dibaca dari tabel Supabase. Bila database tidak terjangkau, situs menampilkan konten cadangan yang tersimpan di kode sehingga halaman tidak pernah kosong.

## Teknologi

- Next.js 16 dan React 19 dengan App Router
- TypeScript
- Tailwind CSS v4
- Supabase untuk database PostgreSQL dan Storage, diakses lewat @supabase/supabase-js dan pg
- Hosting di Vercel

## Cara Instalasi

Prasyarat:

- Node.js 20 atau lebih baru
- Project Supabase untuk konten dan penyimpanan berkas

Langkah instalasi:

```bash
git clone https://github.com/bintangyudhis/portfolio.git
cd portfolio
npm install
cp .env.example .env.local
```

Isi nilai variabel berikut di berkas `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DATABASE_URL`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

Lalu siapkan tabel dan konten awal:

```bash
npm run db:setup
```

Perintah itu menerapkan migrasi SQL di folder `supabase/migrations` dan mengisi konten bawaan.

## Cara Menjalankan

Mode pengembangan:

```bash
npm run dev
```

Buka http://localhost:3000 di browser. Halaman login CMS berada di http://localhost:3000/admin/login.

Mode produksi:

```bash
npm run build
npm start
```

Pemeriksaan kode memakai `npm run lint`.

## Lisensi

Proyek ini memakai lisensi MIT. Lihat berkas [LICENSE](LICENSE).
