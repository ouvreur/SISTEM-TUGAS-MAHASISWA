# SISTEM PENGELOLAAN TUGAS MAHASISWA

## 1. Deskripsi Proyek

Sistem Pengelolaan Tugas Mahasiswa merupakan aplikasi berbasis REST API yang dibuat untuk membantu mengelola data tugas mahasiswa. Sistem ini memungkinkan pengguna untuk menambahkan, melihat, mengubah, dan menghapus data tugas.

Aplikasi dikembangkan menggunakan Node.js dan Express.js, dengan penyimpanan data menggunakan file JSON. Proyek ini juga menerapkan pengujian otomatis sebagai bagian dari praktik Continuous Integration (CI).

## 2. Tujuan Pembuatan Sistem

Tujuan pembuatan sistem ini adalah:

1. Menerapkan konsep REST API menggunakan Node.js dan Express.js.
2. Membuat sistem pengelolaan data tugas menggunakan operasi CRUD.
3. Menerapkan validasi terhadap data yang dimasukkan.
4. Melakukan pengujian otomatis untuk memastikan setiap fitur berjalan dengan benar.
5. Menerapkan Continuous Integration (CI) menggunakan GitHub Actions.

## 3. Fitur Aplikasi

Sistem Pengelolaan Tugas Mahasiswa memiliki beberapa fitur utama, yaitu:

1. **Menampilkan seluruh tugas:** Menampilkan daftar tugas yang tersimpan.
2. **Melihat detail tugas:** Menampilkan tugas berdasarkan ID.
3. **Menambahkan tugas:** Menambahkan data tugas baru.
4. **Mengubah tugas:** Mengubah informasi tugas yang sudah tersimpan.
5. **Menghapus tugas:** Menghapus tugas berdasarkan ID.
6. **Validasi data:** Memeriksa data yang dimasukkan, seperti judul, status, dan tanggal deadline.

Status tugas yang digunakan terdiri dari belum, proses, dan selesai.

### Endpoint API

Endpoint yang tersedia pada sistem meliputi:

- `GET /` digunakan untuk memeriksa kondisi API.
- `GET /tugas` digunakan untuk menampilkan seluruh daftar tugas.
- `GET /tugas/:id` digunakan untuk menampilkan tugas berdasarkan ID.
- `POST /tugas` digunakan untuk menambahkan tugas baru.
- `PUT /tugas/:id` digunakan untuk mengubah data tugas.
- `DELETE /tugas/:id` digunakan untuk menghapus tugas.

## 4. Teknologi yang Digunakan

Teknologi yang digunakan dalam pengembangan sistem ini adalah:

1. **Node.js:** Digunakan untuk menjalankan JavaScript pada sisi server.
2. **Express.js:** Digunakan untuk membangun server dan mengatur endpoint API.
3. **JSON:** Digunakan sebagai tempat penyimpanan data tugas.
4. **Supertest:** Digunakan untuk membantu pengujian endpoint API.
5. **Node.js Test Runner:** Digunakan untuk menjalankan pengujian otomatis.
6. **Postman:** Digunakan untuk melakukan pengujian API secara manual.
7. **GitHub:** Digunakan untuk menyimpan repository proyek.
8. **GitHub Actions:** Digunakan untuk menjalankan proses Continuous Integration secara otomatis.

## 5. Struktur Folder

Struktur folder proyek Sistem Pengelolaan Tugas Mahasiswa adalah sebagai berikut:

```text
Sistem_Tugas_Mahasiswa/
│
├── data/
│   └── tugas.json
│
├── test/
│   └── tugas.test.js
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── screenshots/
│   ├── pengujian-lokal-gagal.png
│   ├── pengujian-lokal-berhasil.png
│   ├── pipeline-gagal.png
│   └── pipeline-berhasil.png
│
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

Keterangan:

- Folder `data` digunakan untuk menyimpan data tugas.
- Folder `test` berisi kode pengujian otomatis.
- Folder `.github/workflows` berisi konfigurasi workflow GitHub Actions.
- Folder `screenshots` digunakan untuk menyimpan bukti pengujian dan hasil pipeline.
- File `server.js` berisi kode utama backend.
- File `package.json` berisi informasi proyek dan dependency.
- File `package-lock.json` mencatat versi dependency yang terpasang.
- File `README.md` berisi dokumentasi proyek.

## 6. Cara Instalasi

Sebelum menjalankan aplikasi, pastikan Node.js dan npm sudah terpasang pada komputer.

Langkah instalasi:

1. Buka folder proyek menggunakan Visual Studio Code.
2. Buka Terminal pada Visual Studio Code.
3. Jalankan perintah berikut untuk memasang dependency:

```bash
npm install
```

4. Tunggu sampai proses instalasi selesai.

## 7. Cara Menjalankan Aplikasi

Setelah proses instalasi selesai, aplikasi dapat dijalankan melalui Terminal Visual Studio Code.

Jalankan perintah berikut:

```bash
node server.js
```

Setelah server berjalan, API dapat diakses melalui Postman dengan alamat dasar:

```text
http://localhost:3000
```

Untuk menghentikan server, tekan `Ctrl + C` pada Terminal.

## 8. Cara Menjalankan Testing

Pengujian otomatis digunakan untuk memastikan setiap fitur pada backend berjalan sesuai dengan fungsinya.

Kode pengujian disimpan dalam file:

```text
test/tugas.test.js
```

Untuk menjalankan seluruh pengujian, buka Terminal pada folder utama proyek dan ketik:

```bash
npm test
```

Pengujian dilakukan terhadap beberapa fungsi, yaitu:

1. Pengujian endpoint GET.
2. Pengujian endpoint POST.
3. Pengujian endpoint PUT.
4. Pengujian endpoint DELETE.
5. Pengujian validasi data.
6. Pengujian data yang tidak ditemukan.
7. Pengujian tanggal deadline yang tidak valid.

## 9. Implementasi Continuous Integration (CI)

Continuous Integration (CI) diterapkan menggunakan GitHub Actions untuk menjalankan pengujian secara otomatis ketika terdapat perubahan pada repository.

Workflow dikonfigurasi agar berjalan ketika terjadi:

1. **Push:** Menjalankan workflow secara otomatis ketika terdapat perubahan yang dikirim ke repository.
2. **Pull Request:** Menjalankan workflow ketika terdapat permintaan penggabungan perubahan kode.

Dalam workflow tersebut, proses yang dilakukan meliputi:

1. Mengambil kode dari repository.
2. Menyiapkan lingkungan Node.js.
3. Menginstal dependency proyek.
4. Menjalankan pengujian otomatis menggunakan `npm test`.
5. Menampilkan hasil pengujian pada GitHub Actions.

## 10. Hasil Pengujian

Pengujian otomatis dilakukan menggunakan Node.js Test Runner dan Supertest dengan total 12 skenario pengujian.

Pada pengujian awal, ditemukan satu kesalahan pada validasi tanggal deadline. Sistem masih menerima tanggal `2026-02-31`, padahal tanggal tersebut tidak valid.

Hasil pengujian awal:

```text
Total pengujian : 12
Berhasil        : 11
Gagal           : 1
```

Kesalahan tersebut kemudian diperbaiki dengan memperbaiki validasi tanggal pada file `server.js`.

Setelah dilakukan perbaikan, pengujian dijalankan kembali dan memperoleh hasil:

```text
Total pengujian : 12
Berhasil        : 12
Gagal           : 0
```

Dengan demikian, seluruh skenario pengujian otomatis berhasil dijalankan setelah perbaikan dilakukan.

Bukti pengujian sebelum dan sesudah perbaikan disimpan pada folder `screenshots`.

Hasil pipeline GitHub Actions akan ditambahkan setelah proses CI selesai dijalankan.

## 11. Pembagian Tugas Anggota

Proyek Sistem Pengelolaan Tugas Mahasiswa dikerjakan oleh tiga anggota kelompok dengan pembagian tanggung jawab sebagai berikut.

### 1. Sabina Rahayu 071 — Backend Developer

Tugas dan tanggung jawab:

- Membuat server menggunakan Node.js dan Express.js.
- Membuat fitur tambah tugas.
- Membuat fitur menampilkan daftar tugas.
- Membuat fitur mengubah tugas.
- Membuat fitur menghapus tugas.
- Mengatur penyimpanan data menggunakan JSON.
- Memperbaiki kesalahan pada backend berdasarkan hasil pengujian.

### 2. Risqillah Dwi R 056 — Software Tester

Tugas dan tanggung jawab:

- Membuat pengujian otomatis menggunakan Node.js Test Runner dan Supertest.
- Menguji seluruh fitur backend.
- Menguji endpoint GET, POST, PUT, dan DELETE.
- Menguji validasi data yang dimasukkan.
- Menemukan dan melaporkan kesalahan pada backend.
- Melakukan pengujian ulang setelah perbaikan.
- Menyiapkan bukti hasil pengujian gagal dan berhasil.

### 3. Nurul Asma 078 — CI dan Dokumentasi

Tugas dan tanggung jawab:

- Membuat repository proyek di GitHub.
- Mengunggah seluruh file proyek ke GitHub.
- Membuat workflow GitHub Actions.
- Mengatur workflow untuk push dan pull request.
- Mengatur instalasi dependency dan pengujian otomatis.
- Membuat dokumentasi proyek dalam README.
- Mengumpulkan bukti hasil pipeline CI.

---

**Kesimpulan**

Sistem Pengelolaan Tugas Mahasiswa dibuat sebagai penerapan REST API dan praktik Continuous Integration. Melalui proyek ini, kelompok menerapkan pembuatan backend, pengujian otomatis, perbaikan kesalahan, serta otomatisasi pengujian menggunakan GitHub Actions.