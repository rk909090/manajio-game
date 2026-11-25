# Pop It Up: Pecahkan “Manajio”

Game booth pameran untuk **Manajio Meet** (Event Challenge 3). Pemain memecahkan balon bertuliskan “Manajio” sebanyak mungkin dalam 20 detik di monitor layar sentuh yang dipasang **tegak (portrait)**.

**Live:** https://game.psm-manajemen.com (Hostinger Cloud, paket PSM; deploy isi folder `dist/`)

| Balon | Poin |
|---|---|
| “Manajio” (biru) | **+5** × combo |
| Manajio emas (langka, 2× per ronde, terbang cepat) | **+15** × combo |
| Tiruan: biru berlogo tapi ejaan salah (Manajo, Manjio, Menajio, …), muncul mulai detik ke-2,5 | **−3** |
| Bom (hitam), muncul mulai detik ke-5 | **−5** |
| Lainnya (silang, bintang, kado) | **−1** |

- **Combo**: pecahkan Manajio beruntun. Ke-5 dst. = poin ×2, ke-9 dst. = poin ×3. Salah pecah **atau membiarkan Manajio lolos** ke atas = combo putus.
- **Makin sulit**: balon makin cepat, kecil, dan meliuk seiring waktu; 5 detik terakhir ada mode “rush” (lebih cepat lagi).
- Skor tidak turun di bawah 0. Skor **≥ 80** mendapat **Popcorn Gratis** (bisa diubah di Panel Petugas).
- Target 80 dipilih dari simulasi bot (bot yang tidak pernah meleset menyentuh): profil “pemula” menang ±25%, “rata-rata” ±90%. Manusia biasanya di bawah bot, jadi amati beberapa pemain pertama lalu sesuaikan.
- Leaderboard aturan baru disimpan terpisah (`manajio-popitup-v2`); data aturan lama tidak dihapus tetapi tidak ikut tampil.

## Orientasi layar

Game dirancang **portrait** (paling pas 9:16, mis. monitor 1080×1920 atau 4K tegak). Putar tampilan monitor di pengaturan display sistem operasi menjadi *Portrait*, lalu buka game dalam mode layar penuh/kiosk. Bila dibuka di layar landscape (mis. laptop), game tampil sebagai kolom tegak di tengah layar, persis seperti yang akan terlihat di monitor booth. Ukuran teks dan balon ikut membesar di monitor beresolusi tinggi.

## Alur layar

1. **Halaman awal**: cara main, skor, tombol *Main Sekarang*, *Lihat Leaderboard*
2. **Permainan**: legenda balon + “Siap?” 3-2-1, timer 20 detik, combo (berkedip merah di 5 detik terakhir), skor langsung
3. **Hasil**: skor, status menang/belum, isi nama (opsional) untuk leaderboard, *Main Lagi*, *Kembali ke Event*
4. **Leaderboard**: Top 10 *Hari Ini* / *Semua Waktu*

Layar hasil dan leaderboard otomatis kembali ke halaman awal setelah 60 detik tanpa sentuhan.

## Menjalankan

Game ini statis (HTML/CSS/JS murni, tanpa build, tanpa server backend).

- **Disarankan**: unggah seluruh folder ke hosting (https), buka di browser perangkat booth, lalu *Install app*/*Add to Home Screen* (atau jalankan browser dalam mode kiosk).
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
- Atur durasi (10–60 detik) dan skor minimal popcorn (kelipatan 5, maks. 500)
- Suara, getar (Android), layar penuh otomatis
- Reset leaderboard & statistik (tekan dua kali untuk konfirmasi)

Data disimpan di `localStorage` perangkat masing-masing (tidak dikirim ke server mana pun).

## Konfigurasi di kode

Di `index.html`, objek `CONFIG` mengatur label challenge, poin, batas skor 0, durasi & target default, dan waktu idle.

## Aset

- `assets/manajio-logo.png`: logo resmi yang diberikan.
- Balon, popcorn, panggung, dan langit dibuat dengan model gambar OpenAI **GPT Image 2** (`openai/gpt-5.4-image-2`) via OpenRouter, lalu latar belakangnya dipotong menjadi WebP transparan.
- Logo dan teks di balon/papan adalah elemen HTML (bukan bagian gambar), jadi tajam dan tidak terdistorsi.

## Mode uji

`index.html?debug=1` membuka `window.__popitup` untuk memajukan game secara manual saat pengujian otomatis. Tidak aktif tanpa parameter tersebut.
