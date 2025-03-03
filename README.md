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
   - Buka file soal1.html di browser untuk menjalankan ExpressJS + Prisma ORM.
   - Buka file registerplain.html di browser untuk menjalankan Vanilla ExpressJS.

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
1. **Prisma ORM + Express** (menggunakan token) dapat diakses di:
   ```
   http://localhost:2000/users
   ```
   Sebelum mengakses link diatas dimohon untuk register di:
   ```
   http://localhost:2000/users/register
   ```
   Untuk login dapat dilakukan melalui :
    ```
   http://localhost:2000/users/login
   ```
   Atau dapat mengakses dengan membuka soal1.html pada folder soal1.
3. **Vanilla Express (tanpa ORM)** dapat diakses di:
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
