# Pop It Up: Pecahkan “Manajio”

Game booth pameran untuk **Manajio Meet** (Event Challenge 3). Pemain memecahkan balon bertuliskan “Manajio” sebanyak mungkin dalam 15 detik di tablet.

- Balon “Manajio”: **+5 poin**
- Balon lain (silang, bintang, kado): **−1 poin** (skor tidak turun di bawah 0)
- Skor **≥ 15** mendapat **Popcorn Gratis**

## Alur layar

1. **Halaman awal**: cara main, skor, tombol *Main Sekarang*, *Lihat Leaderboard*
2. **Permainan**: hitung mundur 3-2-1, timer 15 detik (berkedip merah di 5 detik terakhir), skor langsung
3. **Hasil**: skor, status menang/belum, isi nama (opsional) untuk leaderboard, *Main Lagi*, *Kembali ke Event*
4. **Leaderboard**: Top 10 *Hari Ini* / *Semua Waktu*

Layar hasil dan leaderboard otomatis kembali ke halaman awal setelah 60 detik tanpa sentuhan.

## Menjalankan

Game ini statis (HTML/CSS/JS murni, tanpa build, tanpa server backend).

- **Disarankan**: unggah seluruh folder ke hosting (https), buka di tablet, lalu *Add to Home Screen*.
  Setelah sekali dibuka saat online, service worker (`sw.js`) menyimpan semua file sehingga game tetap jalan **tanpa internet**, dan terbuka layar penuh dari ikon home screen.
- **Lokal (uji di komputer)**:

  ```powershell
  python -m http.server 5178
  ```

  lalu buka `http://localhost:5178`.
- Membuka `index.html` langsung (file://) juga bisa, tetapi tanpa cache offline. Font Plus Jakarta Sans dimuat dari Google Fonts; bila offline dan belum ter-cache, tampilan memakai font sistem.

## Panel Petugas Booth

Tahan **logo Manajio** di halaman awal selama **2 detik**:

- Statistik: jumlah dimainkan & jumlah popcorn (hari ini / total)
- Atur durasi (10–60 detik) dan skor minimal popcorn
- Suara, getar (Android), layar penuh otomatis
- Reset leaderboard & statistik (tekan dua kali untuk konfirmasi)

Data disimpan di `localStorage` tablet masing-masing (tidak dikirim ke server mana pun).

## Konfigurasi di kode

Di `index.html`, objek `CONFIG` mengatur label challenge, poin, batas skor 0, durasi & target default, dan waktu idle.

## Aset

- `assets/manajio-logo.png`: logo resmi yang diberikan.
- Balon, popcorn, panggung, dan langit dibuat dengan model gambar OpenAI **GPT Image 2** (`openai/gpt-5.4-image-2`) via OpenRouter, lalu latar belakangnya dipotong menjadi WebP transparan.
- Logo dan teks di balon/papan adalah elemen HTML (bukan bagian gambar), jadi tajam dan tidak terdistorsi.

## Mode uji

`index.html?debug=1` membuka `window.__popitup` untuk memajukan game secara manual saat pengujian otomatis. Tidak aktif tanpa parameter tersebut.
