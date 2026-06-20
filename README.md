# Aplikasi Jimpitan TAS 8

Aplikasi manajemen pemasukan dan pengeluaran iuran jimpitan untuk kompleks rumah TAS 8.

## Fitur

✅ **Dashboard Pemasukan**
- Tracking iuran jimpitan per rumah
- Pembagian per minggu
- Total bulanan otomatis

✅ **Dashboard Pengeluaran**
- Pencatatan pengeluaran
- Filter berdasarkan bulan dan tahun
- Riwayat lengkap

✅ **Admin Panel**
- Login dengan PIN (default: `pradana12345`)
- Input data iuran
- Tambah pengeluaran baru

✅ **Auto-Save**
- Data disimpan otomatis ke localStorage
- Tidak perlu server database
- Tersimpan di perangkat lokal

## Teknologi

- **React 18** - UI Framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **localStorage** - Penyimpanan data

## Cara Menjalankan

### 1. Install Dependencies
```bash
npm install
```

### 2. Development Server
```bash
npm run dev
```
Akses di `http://localhost:3000`

### 3. Build untuk Production
```bash
npm run build
```

### 4. Preview Build
```bash
npm run preview
```

## Mengakses Admin Panel

1. Klik tombol **Admin** di header
2. Masukkan PIN: `pradana12345`
3. Anda bisa input data jimpitan dan pengeluaran

## Struktur Data

### Jimpitan
```javascript
{
  "A14/20-2024-1-1": 50000,  // Format: RUMAH-TAHUN-BULAN-MINGGU
  "A14/20-2024-1-2": 50000,
  ...
}
```

### Pengeluaran
```javascript
[
  {
    id: 1718918400000,
    amount: "100000",
    desc: "Bensin pompa air",
    date: "2024-06-20",
    month: 6,
    year: 2024
  },
  ...
]
```

## Daftar Rumah

- **A14**: 20, 26, 33, 35, 36, 37
- **A15**: 21-39
- **A16**: 01-12
- **A17**: 01-12, 14-20 (skip 13)

## Notes

- PIN default harus diganti untuk keamanan lebih
- Data hanya tersimpan lokal, backup secara berkala
- Support bulan/tahun: 2023-2026

---

**Dibuat dengan ❤️ untuk TAS 8**
