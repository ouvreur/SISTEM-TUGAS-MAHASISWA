# Sistem Tugas Mahasiswa

- Risqillah Dwi Rinanty (F5512520056) 
- Sabina Rahayu (F5512520071)
- Nurul Asma (F5512520078)

## 1. Deskripsi Proyek
Proyek ini adalah sistem pengelolaan tugas mahasiswa berbasis Node.js yang dilengkapi dengan pengujian otomatis dan pipeline Continuous Integration (CI/CD) menggunakan GitHub Actions.

## 2. Tujuan Pembuatan Sistem
- Mempermudah manajemen dan pengolahan data tugas mahasiswa secara terstruktur.
- Menerapkan sistem pengujian kode otomatis untuk memastikan validitas fitur dan penanganan tanggal.
- Memenuhi penilaian tugas kelompok mata kuliah Rekayasa Perangkat Lunak / Pengembangan Sistem.

## 3. Fitur Aplikasi
- Pengelolaan data tugas akademik tersimpan dalam format JSON (data/tugas.json).
- Validasi data dan penanganan waktu (date handling).
- Suite pengujian otomatis mencakup 12 skenario pengujian.

## 4. Teknologi yang Digunakan
- Bahasa Pemrograman: JavaScript (Node.js v24)
- Environment: Node.js, npm
- Automated CI/CD: GitHub Actions
- Version Control: Git & GitHub

## 5. Struktur Folder
SISTEM-TUGAS-MAHASISWA/
├── .github/workflows/ci.yml
├── data/tugas.json
├── test/tugas.test.js
├── package.json
├── package-lock.json
└── server.js

## 6. Cara Instalasi
Clone repository ini dan instal seluruh dependencies:
npm ci

## 7. Cara Menjalankan Aplikasi
Jalankan server aplikasi secara lokal:
node server.js

## 8. Cara Menjalankan Testing
Menjalankan 12 pengujian otomatis secara lokal melalui terminal:
npm test

## 9. Implementasi CI
Pipeline CI dikonfigurasi melalui file .github/workflows/ci.yml yang diatur untuk berjalan otomatis pada event push dan pull_request ke branch utama menggunakan ubuntu-latest dan Node.js v24.

## 10. Hasil Pengujian
- Event Push: Berhasil berjalan otomatis dan lolos seluruh pengujian (Status: Success).
- Event Pull Request: Terverifikasi otomatis pada PR #1 (Status: All checks have passed).
  
## Pembagian Tugas Anggota
Pembagian Tugas Anggota
Proyek Sistem Pengelolaan Tugas Mahasiswa dikerjakan oleh tiga anggota kelompok dengan pembagian tanggung jawab sebagai berikut.
1.	Sabina Rahayu 071 — Backend Developer
Tugas dan tanggung jawab:
- Membuat server menggunakan Node.js dan Express.js.
- Membuat fitur tambah tugas.
- Membuat fitur menampilkan daftar tugas.
- Membuat fitur mengubah tugas.
- Membuat fitur menghapus tugas.
- Mengatur penyimpanan data menggunakan JSON.
- Memperbaiki kesalahan pada backend berdasarkan hasil pengujian.
2.	Risqillah Dwi R 056 — Software Tester
Tugas dan tanggung jawab:
- Membuat pengujian otomatis menggunakan Node.js Test Runner dan Supertest.
- Menguji seluruh fitur backend.
- Menguji endpoint GET, POST, PUT, dan DELETE.
- Menguji validasi data yang dimasukkan.
- Menemukan dan melaporkan kesalahan pada backend.
- Melakukan pengujian ulang setelah perbaikan.
- Menyiapkan bukti hasil pengujian gagal dan berhasil.
3.	Nurul Asma 078 — CI dan Dokumentasi
Tugas dan tanggung jawab:
- Membuat repository proyek di GitHub.
- Mengunggah seluruh file proyek ke GitHub.
- Membuat workflow GitHub Actions.
- Mengatur workflow untuk push dan pull request.
- Mengatur instalasi dependency dan pengujian otomatis.
- Membuat dokumentasi proyek dalam README.
- Mengumpulkan bukti hasil pipeline CI.

