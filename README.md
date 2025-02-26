# Dion Subaktiar - Project Documentation

## Teknologi yang Digunakan
### Frontend:
- HTML
- TailwindCSS
- JavaScript

### Backend:
- Express.js
- Prisma ORM (MySQL)

## Cara Menjalankan Program
1. **Frontend:**
   - Buka file HTML di browser.

2. **Backend:**
   - Install dependency dengan menjalankan:
     ```sh
     npm install
     ```
   - Sesuaikan file `.env` dengan user dan password MySQL.
   - Jalankan migrasi database:
     ```sh
     npx prisma migrate dev
     ```
   - Jalankan server dengan perintah:
     ```sh
     npm start
     ```

## Endpoint
Terdapat dua varian Express yang tersedia:
1. **Prisma ORM + Express** dapat diakses di:
   ```
   http://localhost:2000/users
   ```
2. **Vanilla Express (tanpa ORM)** dapat diakses di:
   ```
   http://localhost:2000/plainsql
   ```

## Fungsi Utama
- **Nomor 3** dapat dijalankan dengan kode berikut:
  ```js
  console.log(cariYangHilang([a, b, c, d]));
  ```
- **Nomor 4** dapat dijalankan dengan kode berikut:
  ```js
  console.log(findExpression([a, b, c, d], target));
  ```
