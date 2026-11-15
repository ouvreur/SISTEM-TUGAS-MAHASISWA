const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// Lokasi file JSON. Bisa diganti lewat environment variable (berguna untuk pengujian)
const DATA_FILE = process.env.DATA_FILE || path.join(__dirname, 'data', 'tugas.json');
const STATUS_VALID = ['belum', 'proses', 'selesai'];

// ---------- Penyimpanan JSON ----------
function bacaData() {
  try {
    const isi = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(isi || '[]');
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

function simpanData(data) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// ---------- Validasi ----------
function validasi(body, { wajibJudul }) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return 'Body harus berupa objek JSON';
  }
  const { judul, mataKuliah, deadline, status } = body;

  if (wajibJudul || judul !== undefined) {
    if (typeof judul !== 'string' || judul.trim() === '') {
      return 'Judul wajib diisi dan berupa teks';
    }
  }
  if (mataKuliah !== undefined && typeof mataKuliah !== 'string') {
    return 'Mata kuliah harus berupa teks';
  }
  if (deadline !== undefined) {
  if (
    typeof deadline !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(deadline)
  ) {
    return 'Deadline harus berformat YYYY-MM-DD';
  }

  const tanggal = new Date(`${deadline}T00:00:00.000Z`);

  if (
    Number.isNaN(tanggal.getTime()) ||
    tanggal.toISOString().slice(0, 10) !== deadline
  ) {
    return 'Deadline bukan tanggal kalender yang valid';
  }
}
  if (status !== undefined && !STATUS_VALID.includes(status)) {
    return `Status harus salah satu dari: ${STATUS_VALID.join(', ')}`;
  }
  return null;
}

// ---------- Routes ----------
app.get('/', (req, res) => {
  res.json({ pesan: 'API Sistem Pengelolaan Tugas Mahasiswa berjalan' });
});

// Menampilkan daftar tugas
app.get('/tugas', (req, res) => {
  res.json(bacaData());
});

// Menampilkan satu tugas
app.get('/tugas/:id', (req, res) => {
  const tugas = bacaData().find((t) => t.id === Number(req.params.id));
  if (!tugas) return res.status(404).json({ error: 'Tugas tidak ditemukan' });
  res.json(tugas);
});

// Menambah tugas
app.post('/tugas', (req, res) => {
  const error = validasi(req.body, { wajibJudul: true });
  if (error) return res.status(400).json({ error });

  const data = bacaData();
  const idBaru = data.length ? Math.max(...data.map((t) => t.id)) + 1 : 1;
  const tugasBaru = {
    id: idBaru,
    judul: req.body.judul.trim(),
    mataKuliah: req.body.mataKuliah || '',
    deadline: req.body.deadline || null,
    status: req.body.status || 'belum',
  };
  data.push(tugasBaru);
  simpanData(data);
  res.status(201).json(tugasBaru);
});

// Mengubah tugas
app.put('/tugas/:id', (req, res) => {
  const data = bacaData();
  const index = data.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Tugas tidak ditemukan' });

  const error = validasi(req.body, { wajibJudul: false });
  if (error) return res.status(400).json({ error });

  const { judul, mataKuliah, deadline, status } = req.body;
  if (judul !== undefined) data[index].judul = judul.trim();
  if (mataKuliah !== undefined) data[index].mataKuliah = mataKuliah;
  if (deadline !== undefined) data[index].deadline = deadline;
  if (status !== undefined) data[index].status = status;

  simpanData(data);
  res.json(data[index]);
});

// Menghapus tugas
app.delete('/tugas/:id', (req, res) => {
  const data = bacaData();
  const index = data.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Tugas tidak ditemukan' });

  const [dihapus] = data.splice(index, 1);
  simpanData(data);
  res.json({ pesan: 'Tugas berhasil dihapus', tugas: dihapus });
});

// JSON rusak di body request -> 400
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Format JSON tidak valid' });
  }
  res.status(500).json({ error: 'Terjadi kesalahan pada server' });
});

// Server hanya jalan jika file ini dieksekusi langsung (bukan saat di-import oleh test)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
}

module.exports = app;