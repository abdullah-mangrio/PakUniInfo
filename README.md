# PakUniInfo 🎓🇵🇰

PakUniInfo is a full-stack web application that helps students explore universities across Pakistan using structured filters (province, city, program, budget) and view detailed university profiles. It also includes a secured **Admin Panel** to manage university data (create, edit, delete).

---

## 🔗 Live
- **Frontend (Netlify):** https://sprightly-alfajores-d53cb5.netlify.app/
- **Backend (Railway):** https://pakuniinfo-production.up.railway.app/
- **Health Check:** `GET /api/health` → `OK` ✅

---

## ✨ Key Features

### Student Side
- Browse universities with **pagination and sorting**
- Filter by **province, city/location, program, and name**
- View detailed university pages (overview, programs, admission cycles, fee range, images)
- **Shortlist** universities (stored in browser/localStorage)
- **Compare** up to 3 universities (stored in browser/localStorage)

### Admin Side (Secured)
- JWT-based authentication
- Admin can:
  - Add new universities
  - Edit existing universities (admission cycles, fee ranges, images, etc.)
  - Delete universities
- Secure logout clears token and redirects to login

---

## 🧱 Tech Stack
- **Frontend:** React (Vite)
- **Backend:** Node.js, Express (ES Modules)
- **Database:** MongoDB Atlas (Mongoose)
- **Authentication:** JWT (Admin)
- **Deployment:** Netlify (frontend), Railway (backend)

---

## 🗃️ Data Model (University)

Each university includes:

- **Basic info:** name, location, city, province, ranking  
- **Programs:** programs[]  
- **Fees:** tuitionFeeMin, tuitionFeeMax, tuitionFeeCurrency, tuitionFeeNote  
- **Admissions:** admissionNotes, admissionCycles[]  
  - Each cycle: name, applicationOpenDate, applicationDeadline, notes  
- **Media:** logoUrl, heroImageUrl, galleryImages[]

---

## 🔌 API Overview

### Public
- GET /api/health
- GET /api/universities (filters, pagination, sorting)
- GET /api/universities/:id

### Admin (Protected)
- POST /api/universities
- PUT /api/universities/:id
- DELETE /api/universities/:id

> Admin routes require Authorization: Bearer <token>


---

## 🧩 Project Structure

```bash
PakUniInfo/
├─ client/                   # React frontend (Vite)
│  ├─ src/
│  │  ├─ pages/              # UI pages (Explore, Details, Admin, etc.)
│  │  ├─ config/             # API base URL config
│  │  ├─ utils/              # shortlist / compare localStorage helpers
│  │  └─ components/
│  └─ package.json
│
├─ controllers/              # Backend controllers
├─ routes/                   # Express routes
├─ models/                   # Mongoose models
├─ middleware/               # Auth & middleware
├─ config.js                 # MongoDB connection
├─ server.js                 # Express app entry
└─ package.json              # Backend scripts & dependencies

