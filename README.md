<div align="center">

<img src="https://raw.githubusercontent.com/abdullah-mangrio/PakUniInfo/main/docs/screenshots/pui-logo.png" alt="PakUniInfo Logo" width="120" height="120" />

# PakUniInfo

### Pakistan's University Discovery Platform

**Explore. Compare. Decide.**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-pak--uni--info.vercel.app-4F46E5?style=for-the-badge)](https://pak-uni-info.vercel.app)
[![Backend](https://img.shields.io/badge/⚡_Backend-Render-22c55e?style=for-the-badge)](https://pakuniinfo-backend.onrender.com/api/health)
[![License](https://img.shields.io/badge/License-Educational_Use_Only-red?style=for-the-badge)](./LICENSE)

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=black)

</div>

---

## What Is PakUniInfo?

PakUniInfo is a full-stack MERN web application designed to simplify university discovery for Pakistani students. Instead of juggling dozens of tabs and PDFs, students can search, filter, compare, and shortlist universities in one clean interface — all backed by a real-time database and a secure admin panel for keeping data current.

---

## Why I Built This

Information about admissions, programs, rankings, fees, and deadlines is often scattered across multiple university websites and documents. PakUniInfo centralizes this into a single searchable platform where students can explore, compare, and make informed decisions about their academic future — without the noise.

---

## Project Highlights

| | |
|---|---|
| 🏗️ **MERN Stack Architecture** | Full-stack JavaScript from database to UI |
| 🔐 **JWT Protected Admin Dashboard** | Stateless, secure token-based authentication |
| 🌐 **RESTful API Design** | Clean endpoints with filtering, sorting, and pagination |
| ☁️ **Cloud Deployment** | Vercel + Render + MongoDB Atlas |
| 📱 **Responsive UI** | Works across desktop and mobile |
| 🔎 **Advanced Filtering** | Filter by province, city, program, and name simultaneously |
| 📄 **Pagination** | Efficient data loading across large university datasets |
| ⚖️ **University Comparison** | Side-by-side comparison of up to 3 universities |

---

## Engineering Challenges Solved

- Implemented stateless JWT authentication with protected admin routes and secure logout
- Designed paginated REST APIs with multi-field filtering and dynamic sort direction (`sortBy`, `sortOrder`)
- Built a real-time client-side search and filter system without additional API calls on every keystroke
- Structured a flexible Mongoose schema supporting nested admission cycles and media galleries
- Configured CORS correctly across separate frontend and backend deployments
- Resolved SPA routing issues on Vercel using `vercel.json` rewrite rules
- Managed environment-specific API base URLs across local development and cloud deployments

---

## Screenshots

| Landing Page | Explore Page |
|---|---|
| ![Landing](https://raw.githubusercontent.com/abdullah-mangrio/PakUniInfo/main/docs/screenshots/pui-landing.png) | ![Explore](https://raw.githubusercontent.com/abdullah-mangrio/PakUniInfo/main/docs/screenshots/pui-explore.png) |

| Compare View | Shortlist |
|---|---|
| ![Compare](https://raw.githubusercontent.com/abdullah-mangrio/PakUniInfo/main/docs/screenshots/pui-compare.png) | ![Shortlist](https://raw.githubusercontent.com/abdullah-mangrio/PakUniInfo/main/docs/screenshots/pui-shortlist.png) |

| Admin Panel |
|---|
| ![Admin](https://raw.githubusercontent.com/abdullah-mangrio/PakUniInfo/main/docs/screenshots/pui-admin.png) |

---

## Live Links

| Service | URL | Status |
|---|---|---|
| 🌐 Frontend | [pak-uni-info.vercel.app](https://pak-uni-info.vercel.app) | ![Live](https://img.shields.io/badge/status-live-brightgreen) |
| ⚙️ Backend | [pakuniinfo-backend.onrender.com](https://pakuniinfo-backend.onrender.com) | ![Live](https://img.shields.io/badge/status-live-brightgreen) |
| 🩺 Health Check | [`GET /api/health`](https://pakuniinfo-backend.onrender.com/api/health) | `200 OK` |

> ⚠️ The backend is hosted on Render's free tier and may take 30–60 seconds to cold start after inactivity.

---

## Features

### For Students

| Feature | Description |
|---|---|
| 🔍 **Smart Search** | Search universities by name in real time |
| 🗺️ **Province & City Filtering** | Drill down by region to find nearby options |
| 📚 **Program Filtering** | Filter by offered programs (CS, Business, Medicine, etc.) |
| 🏅 **Ranking-Based Sorting** | Sort results by national ranking |
| 📄 **Pagination** | Performant browsing across large datasets |
| 🏛️ **University Profiles** | Rich detail pages with overviews, programs, fees, and media galleries |
| 📋 **Shortlist** | Save universities to a personal shortlist (localStorage) |
| ⚖️ **Compare** | Side-by-side comparison of up to 3 universities |

### For Admins

| Feature | Description |
|---|---|
| 🔐 **JWT Authentication** | Secure login with token-based sessions |
| ➕ **Add Universities** | Full-featured form to create new university records |
| ✏️ **Edit Universities** | Update admission cycles, fee ranges, images, and more |
| 🗑️ **Delete Universities** | Remove outdated or incorrect records |
| 🚪 **Secure Logout** | Clears token and redirects on logout |

---

## Architecture

```
                         ┌─────────────────────────────────────────┐
                         │             Client (Browser)             │
                         │                                          │
                         │  ┌──────────────────────────────────┐   │
                         │  │   React + Vite  (Vercel)         │   │
                         │  │                                  │   │
                         │  │  /explore   /universities/:id    │   │
                         │  │  /shortlist /compare  /admin     │   │
                         │  └──────────────┬───────────────────┘   │
                         │                 │ REST (JSON)            │
                         └─────────────────┼───────────────────────┘
                                           │
                                           ▼
                         ┌─────────────────────────────────────────┐
                         │        Node.js + Express  (Render)       │
                         │                                          │
                         │   ┌──────────┐   ┌────────────────────┐ │
                         │   │  Routes  │   │   Auth Middleware   │ │
                         │   │ /api/uni │   │   JWT Validation    │ │
                         │   └────┬─────┘   └────────────────────┘ │
                         │        │                                  │
                         │   ┌────▼──────────────┐                  │
                         │   │   Controllers      │                  │
                         │   │  Business Logic    │                  │
                         │   └────┬──────────────┘                  │
                         └────────┼────────────────────────────────┘
                                  │  Mongoose ODM
                                  ▼
                         ┌─────────────────────────────────────────┐
                         │            MongoDB Atlas                  │
                         │        (Cloud-hosted Database)           │
                         └─────────────────────────────────────────┘
```

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [React](https://reactjs.org/) | Component-based UI library |
| [Vite](https://vitejs.dev/) | Next-generation build tooling |
| [React Router](https://reactrouter.com/) | Client-side routing |

### Backend
| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | JavaScript runtime |
| [Express.js](https://expressjs.com/) | HTTP server and routing (ES Modules) |

### Database & Auth
| Technology | Purpose |
|---|---|
| [MongoDB Atlas](https://www.mongodb.com/atlas) | Cloud-hosted NoSQL database |
| [Mongoose](https://mongoosejs.com/) | Schema modeling and ODM |
| [JWT](https://jwt.io/) | Stateless admin authentication |

### Deployment
| Service | What It Hosts |
|---|---|
| [Vercel](https://vercel.com/) | React frontend |
| [Render](https://render.com/) | Express backend |

---

## Data Model

Each university document in MongoDB contains:

```js
{
  name: String,
  location: String,
  city: String,
  province: String,
  ranking: Number,

  programs: [String],

  tuitionFeeMin: Number,
  tuitionFeeMax: Number,
  tuitionFeeCurrency: String,
  tuitionFeeNote: String,

  admissionNotes: String,
  admissionCycles: [
    {
      name: String,
      applicationOpenDate: Date,
      applicationDeadline: Date,
      notes: String
    }
  ],

  logoUrl: String,
  heroImageUrl: String,
  galleryImages: [String]
}
```

---

## API Reference

### Public Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check — returns `OK` |
| `GET` | `/api/universities` | List universities with filters, pagination, sorting |
| `GET` | `/api/universities/:id` | Get full details for a single university |

#### Query Parameters for `GET /api/universities`

| Parameter | Type | Description |
|---|---|---|
| `province` | `string` | Filter by province |
| `city` | `string` | Filter by city |
| `program` | `string` | Filter by offered program |
| `name` | `string` | Search by name (case-insensitive) |
| `sortBy` | `string` | Field to sort by (e.g. `ranking`) |
| `sortOrder` | `asc` / `desc` | Sort direction |
| `page` | `number` | Page number (default: `1`) |
| `limit` | `number` | Results per page (default: `10`) |

### Admin Endpoints (Protected)

> All admin routes require the header: `Authorization: Bearer <token>`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Admin login — returns JWT |
| `POST` | `/api/universities` | Create a new university |
| `PUT` | `/api/universities/:id` | Update an existing university |
| `DELETE` | `/api/universities/:id` | Delete a university |

---

## Project Structure

```
PakUniInfo/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Explore.jsx
│   │   │   ├── UniversityDetail.jsx
│   │   │   ├── Compare.jsx
│   │   │   ├── Shortlist.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   └── AdminPanel.jsx
│   │   ├── components/
│   │   ├── config/
│   │   │   └── api.js
│   │   └── utils/
│   │       ├── shortlist.js
│   │       └── compare.js
│   ├── public/
│   └── package.json
│
├── controllers/
│   ├── universityController.js
│   └── authController.js
│
├── routes/
│   ├── universityRoutes.js
│   └── authRoutes.js
│
├── models/
│   └── University.js
│
├── middleware/
│   └── authMiddleware.js
│
├── config.js
├── server.js
└── package.json
```

---

## Roadmap

- [ ] 🔎 Full-text search with Atlas Search
- [ ] 🌙 Dark mode toggle
- [ ] 📱 PWA support (installable on mobile)
- [ ] 🗺️ Interactive map view of universities by city
- [ ] 📊 University analytics dashboard
- [ ] 📥 Export shortlist/comparison as PDF
- [ ] 🔔 Admission deadline reminders via email
- [ ] 🧑‍🎓 Student accounts with persistent shortlists
- [ ] ⭐ Student reviews and ratings
- [ ] 🌐 Urdu language support

---

## Author

<div align="center">

**Abdullah Mangrio**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/abdullah-mangrio)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abdullah-mangrio-1770632b5)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:abdullahmangrio86@gmail.com)

</div>

---

## Contributing

Contributions that improve the project for educational purposes are welcome. If you'd like to fix a bug, improve the UI, or add a feature from the roadmap:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

By contributing, you agree that your contributions become part of the PakUniInfo project and remain subject to the repository's Usage Policy and License terms.

---

## Usage Policy

**Please read this before cloning or forking.**

This project is open-source for **learning and educational purposes only**.

✅ **You MAY:**
- Clone or fork this repository to study the code
- Use it as a reference while learning the MERN stack
- Build something inspired by it for your own personal learning projects
- Reference it in academic work (with proper attribution)

❌ **You MAY NOT:**
- Re-deploy this project or a modified version of it and present it as your own original work — especially for academic submissions, portfolios, or hackathons
- Sell this project or any derivative of it as a product or service
- Use this codebase commercially in any form
- Strip the license, copyright notice, or author attribution

> **For Pakistani students:** Submitting this project — or a clone of it — as your own semester project, final year project, or coursework is academic dishonesty. Use it to *learn*, then build your own.

If you are unsure whether your intended use is permitted, open an issue or reach out directly.

---

## License

Copyright © 2026 Abdullah Mangrio

This project is provided for **educational and learning purposes only**.

✅ **You MAY:**
- View the source code
- Fork the repository for personal learning
- Study and modify the code locally
- Use the project as a reference while learning full-stack development

❌ **You MAY NOT:**
- Use this project commercially
- Sell this project or any derivative work
- Deploy this project as a public service
- Submit this project as academic work
- Present this project as your own original work
- Remove author attribution

All rights reserved. For any use beyond personal learning, explicit written permission from the author is required.

---

## Trademark & Branding

The name **PakUniInfo**, logo, branding, and visual identity remain the exclusive property of Abdullah Mangrio.

Use of the PakUniInfo name, logo, or branding to imply official endorsement, affiliation, or an official fork is prohibited without explicit written permission from the author.

---

<div align="center">

Made in 🇵🇰 Pakistan &nbsp;·&nbsp; Built with the MERN stack &nbsp;·&nbsp; Deployed with ❤️

⭐ **If this project helped you, consider giving it a star!** ⭐

</div>
