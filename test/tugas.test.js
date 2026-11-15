
const { test, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const request = require('supertest');

// Membuat tempat penyimpanan sementara untuk pengujian
const folderTest = fs.mkdtempSync(
  path.join(os.tmpdir(), 'test-tugas-')
);

const fileTest = path.join(folderTest, 'tugas.json');

// Menggunakan file JSON sementara agar data asli tidak berubah
process.env.DATA_FILE = fileTest;

const app = require('../server');

// Mengosongkan data sebelum setiap pengujian
beforeEach(() => {
  fs.writeFileSync(fileTest, '[]');
});

// Menghapus file sementara setelah pengujian selesai
after(() => {
  fs.rmSync(folderTest, { recursive: true, force: true });
});

// 1. Menguji halaman utama API
test('GET / menampilkan pesan API', async () => {
  const res = await request(app).get('/');

  assert.strictEqual(res.status, 200);
  assert.ok(res.body.pesan);
});

// 2. Menguji daftar tugas kosong
test('GET /tugas menampilkan daftar kosong', async () => {
  const res = await request(app).get('/tugas');

  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(res.body, []);
});

// 3. Menguji tambah tugas
test('POST /tugas berhasil menambahkan tugas', async () => {
  const res = await request(app)
    .post('/tugas')
    .send({
      judul: 'Membuat API',
      mataKuliah: 'Rekayasa Perangkat Lunak',
      deadline: '2026-12-20',
      status: 'belum'
    });

  assert.strictEqual(res.status, 201);
  assert.strictEqual(res.body.judul, 'Membuat API');
});

// 4. Menguji judul kosong
test('POST /tugas menolak judul kosong', async () => {
  const res = await request(app)
    .post('/tugas')
    .send({ judul: '' });

  assert.strictEqual(res.status, 400);
});

// 5. Menguji status tidak valid
test('POST /tugas menolak status tidak valid', async () => {
  const res = await request(app)
    .post('/tugas')
    .send({
      judul: 'Membuat laporan',
      status: 'ditunda'
    });

  assert.strictEqual(res.status, 400);
});

// 6. Menguji melihat tugas berdasarkan ID
test('GET /tugas/:id berhasil menemukan tugas', async () => {
  await request(app)
    .post('/tugas')
    .send({ judul: 'Membuat ERD' });

  const res = await request(app).get('/tugas/1');

  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.judul, 'Membuat ERD');
});

// 7. Menguji ID tugas yang tidak ditemukan
test('GET /tugas/:id mengembalikan 404', async () => {
  const res = await request(app).get('/tugas/99');

  assert.strictEqual(res.status, 404);
});

// 8. Menguji mengubah tugas
test('PUT /tugas/:id berhasil mengubah tugas', async () => {
  await request(app)
    .post('/tugas')
    .send({ judul: 'Tugas lama' });

  const res = await request(app)
    .put('/tugas/1')
    .send({ judul: 'Tugas baru', status: 'selesai' });

  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.judul, 'Tugas baru');
  assert.strictEqual(res.body.status, 'selesai');
});

// 9. Menguji perubahan pada ID yang tidak ditemukan
test('PUT /tugas/:id mengembalikan 404', async () => {
  const res = await request(app)
    .put('/tugas/99')
    .send({ judul: 'Tugas baru' });

  assert.strictEqual(res.status, 404);
});

// 10. Menguji menghapus tugas
test('DELETE /tugas/:id berhasil menghapus tugas', async () => {
  await request(app)
    .post('/tugas')
    .send({ judul: 'Tugas yang dihapus' });

  const res = await request(app).delete('/tugas/1');

  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.tugas.judul, 'Tugas yang dihapus');
});

// 11. Menguji penghapusan ID yang tidak ditemukan
test('DELETE /tugas/:id mengembalikan 404', async () => {
  const res = await request(app).delete('/tugas/99');

  assert.strictEqual(res.status, 404);
});

// 12. Menguji tanggal kalender yang tidak valid
test('POST /tugas menolak tanggal 31 Februari', async () => {
  const res = await request(app)
    .post('/tugas')
    .send({
      judul: 'Tugas pengujian',
      deadline: '2026-02-31'
    });

  assert.strictEqual(res.status, 400);
});
