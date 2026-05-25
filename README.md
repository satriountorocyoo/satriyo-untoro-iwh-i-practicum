# Integrating With HubSpot I: Foundations Practicum

Aplikasi web berbasis Node.js yang mengintegrasikan HubSpot API V3 CRM dengan menggunakan kerangka kerja Express, Axios, dan sistem templating Pug. Proyek ini menggunakan **Objek Standar Contacts (Kontak)** untuk mematuhi aturan praktikum HubSpot tanpa memerlukan lisensi Custom Object berbayar.

---

## 🔗 Tautan Tampilan Daftar Objek (HubSpot Contacts List View)

> [!IMPORTANT]
> **Tautan wajib untuk penilaian praktikum:**
> HubSpot Academy memperbolehkan penggunaan objek standar Contacts jika Anda tidak memiliki akses ke Custom Object.
> Tautan di bawah ini mengarah ke daftar kontak pada akun uji coba Anda.

👉 **[TAUTAN DAFTAR KONTAK ANDA DI HUBSPOT](https://app.hubspot.com/contacts/246248260/objects/0-1/views/all/list)** 👈
*(Silakan edit berkas ini jika Anda ingin memperbarui Test Account ID `246248260` dengan nomor portal Anda yang lain).*

---

## 🛠️ Fitur Utama Aplikasi

1. **Homepage (`/`)**: Menampilkan daftar kontak langsung dari data HubSpot CRM V3 API (first name, last name, email) ke dalam tabel HTML modern berdesain glassmorphism.
2. **Form Pembuatan (`/update-cobj`)**: Halaman formulir input bersih untuk menambahkan kontak baru dengan properti:
   - **First Name** (Nama Depan)
   - **Last Name** (Nama Belakang)
   - **Email** (Alamat Surel)
3. **Penyimpanan Data (`POST /update-cobj`)**: Mengirimkan data kontak baru langsung ke HubSpot CRM API V3, lalu mengalihkan halaman (*redirect*) kembali ke homepage untuk melihat pembaruan data secara real-time.

---

## 🚀 Panduan Menjalankan Proyek Secara Lokal

### 1. Prasyarat
Pastikan Anda sudah menginstal **Node.js** di komputer Anda.

### 2. Instalasi Dependensi
Buka terminal Anda di folder proyek ini dan jalankan perintah:
```bash
npm install
```

### 3. Konfigurasi Variabel Lingkungan (`.env`)
1. Cari berkas bernama `.env` di folder utama proyek ini.
2. Isi token rahasia Private App Anda pada baris `PRIVATE_APP_ACCESS_TOKEN`:
   ```env
   PRIVATE_APP_ACCESS_TOKEN=pat-na-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```

### 4. Menjalankan Aplikasi
Jalankan server pengembangan dengan perintah:
```bash
npm start
```
Buka peramban (browser) Anda dan akses alamat:
👉 **http://localhost:3000**

---

## 📂 Alur Kerja Git & GitHub (Langkah Pengumpulan Praktikum)

Ikuti langkah-langkah di bawah ini di Terminal/Git Bash Anda untuk memastikan riwayat commit Anda terekam dengan baik sesuai syarat kelulusan HubSpot:

1. **Pindah ke cabang kerja baru (working-branch)**:
   ```bash
   git branch working-branch
   git checkout working-branch
   ```
2. **Lakukan commit pertama dengan pesan wajib**:
   ```bash
   git add .
   git commit -m "First commit to my Integrating With HubSpot I: Foundations practicum repository."
   ```
3. **Lanjutkan pengerjaan kode Anda.** (Jika ada perubahan lagi, silakan lakukan commit sesering mungkin):
   ```bash
   git add .
   git commit -m "Add Express routes and Pug templates with glassmorphism style using Contacts"
   ```
4. **Kembali ke cabang utama (main) dan gabungkan kerja Anda**:
   ```bash
   git checkout main
   git merge working-branch
   ```
5. **Kirim perubahan Anda ke GitHub**:
   ```bash
   git push origin main
   ```
6. **Kirim link repository GitHub Anda ke form pengumpulan HubSpot.**

---

*Selamat belajar dan semoga sukses dengan Sertifikasi HubSpot Anda!* 🎉
