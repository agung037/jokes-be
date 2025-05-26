# 🤣 Jokes Bapak-Bapak Indonesia

Aplikasi web sederhana untuk koleksi jokes bapak-bapak Indonesia dengan backend Node.js (Hapi.js) dan frontend vanilla JavaScript.

## 📋 Fitur

### Backend API
- ✅ **GET /jokes** - Mendapatkan joke random dari koleksi
- ✅ **POST /jokes** - Menambahkan joke baru ke koleksi
- ✅ **GET /jokes/inspiration** - Mendapatkan inspirasi joke dari AI (Groq LLM)
- ✅ **GET /lucky-number** - Generate lucky number random (1-100)
- ✅ **GET /** - Hello world endpoint

### Frontend Web App
- 🎲 **Random Jokes** - Tampilkan joke random dengan format tanya-jawab
- ✍️ **Add New Jokes** - Form untuk menambah joke baru
- 🤖 **AI Inspiration** - Minta inspirasi joke dari AI dan tambahkan ke koleksi
- 🍀 **Lucky Number** - Generate angka keberuntungan
- 📱 **Responsive Design** - Tampilan yang mobile-friendly
- 🎨 **Modern UI** - Desain modern dengan animasi smooth

## 🚀 Cara Menjalankan

### Prerequisites
- Node.js (v14 atau lebih tinggi)
- NPM
- API Key Groq (opsional, untuk fitur AI inspiration)

### Setup Backend

1. **Clone/Download repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables** (opsional untuk AI features)
   ```bash
   # Buat file .env di folder backend
   echo "GROQ_API_KEY=your_groq_api_key_here" > .env
   ```

4. **Jalankan server**
   ```bash
   node index.js
   ```
   
   Server akan berjalan di `http://localhost:3001`

### Setup Frontend

1. **Buka frontend**
   - Cara 1: Langsung buka file `frontend/index.html` di browser
   - Cara 2: Gunakan simple HTTP server:
     ```bash
     cd frontend
     python3 -m http.server 8000
     # Atau gunakan live-server jika sudah install
     npx live-server
     ```

2. **Akses aplikasi**
   - Jika buka langsung: `file:///path/to/frontend/index.html`
   - Jika pakai HTTP server: `http://localhost:8000`

## 📁 Struktur Project

```
jokes-be/
├── backend/
│   ├── index.js          # Main server file (Hapi.js)
│   ├── utils.js          # Utility functions
│   ├── package.json      # Dependencies
│   ├── .env             # Environment variables (Groq API key)
│   └── jokes/
│       └── jokes.txt     # File penyimpanan jokes
├── frontend/
│   ├── index.html        # Main HTML file
│   ├── style.css         # Styling
│   └── script.js         # JavaScript functionality
└── README.md            # Dokumentasi ini
```

## 🔌 API Endpoints

### GET /jokes
Mendapatkan joke random dari koleksi.

**Response:**
```json
{
  "question": "Kenapa kucing selalu kalah main petak umpet?",
  "answer": "Karena dia selalu kelihatan bulu-nya!"
}
```

### POST /jokes
Menambahkan joke baru ke koleksi.

**Request Body:**
```json
{
  "question": "Pertanyaan joke",
  "answer": "Jawaban joke"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Joke added successfully!"
}
```

### GET /jokes/inspiration
Mendapatkan inspirasi joke dari AI (Groq LLM).

**Response:**
```json
{
  "success": true,
  "jokes": [
    {
      "question": "Kenapa cicak bisa nempel di dinding?",
      "answer": "Karena pakai lem cicak!"
    },
    // ... 2 jokes lainnya
  ]
}
```

### GET /lucky-number
Generate lucky number random.

**Response:**
```json
{
  "luckyNumber": 42
}
```

## 🛠️ Teknologi yang Digunakan

### Backend
- **Node.js** - Runtime JavaScript
- **Hapi.js** - Web framework
- **File System (fs)** - Penyimpanan jokes dalam file txt
- **HTTPS module** - HTTP client untuk API Groq
- **dotenv** - Environment variable management

### Frontend
- **Vanilla JavaScript** - No frameworks
- **CSS3** - Modern styling dengan flexbox & grid
- **Fetch API** - HTTP requests ke backend
- **HTML5** - Semantic markup

### AI Integration
- **Groq API** - LLM untuk generate inspirasi jokes
- **Llama 3.3 70B Versatile** - Model AI yang digunakan

## 📝 Format Jokes

Jokes disimpan dalam file `backend/jokes/jokes.txt` dengan format:
```
Pertanyaan joke # Jawaban joke
```

Contoh:
```
Kenapa kucing selalu kalah main petak umpet? # Karena dia selalu kelihatan bulu-nya!
Apa bedanya sarung sama selimut? # Kalau sarung dibawa ke masjid, kalau selimut dibawa tidur!
```

## 🎯 Cara Penggunaan

1. **Melihat Jokes Random**
   - Klik tombol "🎲 Joke Random Baru"
   - Lihat pertanyaan, lalu klik "Lihat Jawaban" untuk reveal jawaban

2. **Menambah Joke Baru**
   - Isi form "Tambah Joke Baru"
   - Masukkan pertanyaan dan jawaban
   - Klik "➕ Tambah Joke"

3. **Minta Inspirasi AI**
   - Klik "💡 Minta Inspirasi AI"
   - AI akan generate 3 jokes baru
   - Klik "➕ Tambah ke Koleksi" untuk save joke yang disukai

4. **Lucky Number**
   - Klik "🎰 Generate Lucky Number" untuk angka keberuntungan

## 🔧 Troubleshooting

### Backend tidak bisa start
- Pastikan port 3001 tidak digunakan aplikasi lain
- Check apakah semua dependencies sudah ter-install
- Pastikan file `jokes/jokes.txt` ada dan bisa dibaca

### Frontend tidak bisa connect ke backend
- Pastikan backend sudah running di port 3001
- Check CORS settings di backend
- Buka browser console untuk lihat error details

### AI Inspiration tidak work
- Pastikan GROQ_API_KEY sudah di-set di file `.env`
- Check koneksi internet
- Verify API key masih valid

## 🎨 Customization

### Menambah Jokes Manual
Edit file `backend/jokes/jokes.txt` dan tambahkan jokes baru dengan format:
```
Pertanyaan baru # Jawaban baru
```

### Mengubah Styling
Edit file `frontend/style.css` untuk custom tampilan sesuai keinginan.

### Menambah Endpoint Baru
Tambahkan route baru di `backend/index.js` dalam array `routes`.

## 📄 License

This project is open source. Feel free to use and modify!

## 👨‍💻 Author

Created with ❤️ for Indonesian dad jokes enthusiasts!

---

**Happy Coding! 🚀**
