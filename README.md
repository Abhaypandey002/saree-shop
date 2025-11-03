# SareeSutra – Elegance in Every Weave

SareeSutra is a production-ready saree showcase and e-commerce experience that combines an immersive React UI with a
secure Node.js + Express backend. Merchants can curate saree collections, manage appointments, and track customer
inquiries while visitors explore handpicked drapes by fabric, color, price, and location.

## Features

### Customer Experience
- Hero landing page with the quote **“Drape Yourself in Grace.”**
- Featured sarees, “Shop by Category” CTA, and customer milestones (5000+ served).
- Collections grid with real-time fabric, color, location, and price filters.
- Appointment booking workflow and contact form with success alerts.
- Embedded Google Map, WhatsApp-ready contact information, and studio visit CTA.

### Admin Experience
- JWT-secured admin login and protected dashboard routes.
- Upload, edit, and delete sarees with local image storage (Cloudinary-ready hooks included).
- View live appointment bookings and customer inquiries.
- Automatic Excel logging of all appointments and inquiries via ExcelJS.

### Platform Highlights
- React + Vite + TailwindCSS frontend with Playfair Display and Poppins typography.
- Express API backed by MongoDB with Mongoose models for sarees, admins, appointments, and inquiries.
- Reusable Excel workbook located at `backend/excel/customer_inquiries.xlsx`.
- Multer-powered image uploads to `backend/uploads/` (ready for Cloudinary integration).

## Tech Stack

| Layer      | Technology |
| ---------- | ---------- |
| Frontend   | React, Vite, TailwindCSS |
| Backend    | Node.js, Express |
| Database   | MongoDB (Atlas or local) |
| File Store | Local `/uploads` directory or Cloudinary |
| Auth       | JWT with bcrypt password hashing |
| Excel      | ExcelJS |

## Environment Variables

Create `.env` files inside both the `backend/` and `frontend/` folders (see `.env.example` snippet below). Only the
backend requires secrets.

```bash
# backend/.env
MONGO_URI=mongodb://127.0.0.1:27017/saree-sutra
JWT_SECRET=supersecretjwt
CLOUDINARY_URL= # optional, used when swapping to Cloudinary uploads
ADMIN_USERNAME=admin # optional, used by npm run seed:admin
ADMIN_PASSWORD=admin123 # optional, used by npm run seed:admin

# frontend/.env
VITE_API_BASE_URL=http://localhost:5000
```

## Installation

```bash
git clone <repo>
cd saree-sutra

# backend dependencies
cd backend
npm install

# frontend dependencies
cd ../frontend
npm install
```

## Run Locally

```bash
# backend (uses nodemon)
cd backend
npm run dev

# frontend (Vite dev server)
cd ../frontend
npm run dev
```

The Vite dev server proxies `/api` requests to the backend port defined in `VITE_API_BASE_URL`.

## Admin Panel Usage

1. Seed an admin account (skip if already created):
   ```bash
   cd backend
   npm run seed:admin -- --username=admin --password=supersecure
   ```
2. Launch both backend and frontend servers.
3. Navigate to `http://localhost:5173/admin/login`, sign in, and manage sarees, appointments, and inquiries.

Uploaded images are stored under `backend/uploads/` and served via `/uploads/<filename>`. Swap to Cloudinary by
connecting `cloudinary` in the admin controller where the `imageUrl` is set.

## Excel Storage Info

- Excel workbook path: `backend/excel/customer_inquiries.xlsx`
- Sheets:
  - **Appointments** — name, email, phone, preferred date, message, timestamp
  - **Inquiries** — name, email, phone, message, timestamp
- Every submission is appended immediately; download or sync the file for CRM workflows.

## Deployment Guide

1. **Backend (Render / Railway / Heroku)**
   - Configure environment variables (`MONGO_URI`, `JWT_SECRET`, optional `CLOUDINARY_URL`).
   - Set build command `npm install` and start command `node app.js`.
   - Add persistent storage or S3/Cloudinary if you need hosted images.
2. **Database (MongoDB Atlas)**
   - Create a shared cluster.
   - Allow your backend server IP addresses.
   - Update `MONGO_URI` accordingly.
3. **Frontend (Vercel / Netlify)**
   - Build command: `npm install && npm run build`
   - Output directory: `dist`
   - Environment variable: `VITE_API_BASE_URL` pointing to the deployed backend.
4. **Domain & SSL**
   - Point your domain to the frontend hosting provider.
   - Ensure backend has HTTPS (Render/Heroku provide managed TLS).

## Bonus Enhancements

- Wishlist or favorites per customer profile.
- WhatsApp chat integration for instant stylist support.
- Customer testimonials carousel on the home page.
- Offer banners (e.g., “Festive Sale – Flat 20% Off”).
- Dark / light mode toggle using Tailwind’s `dark` variant.

## Contact

For implementation support or custom enhancements:

- 📞 Phone: 6351186290
- 🏢 Address: 125/ XYZ Residency, Surat – 365241
- ✉️ Email: hello@sareesutra.com
