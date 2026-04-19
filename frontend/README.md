# My Chess Journey — Phase 2 (Full-Stack MERN)

Extends the Phase 1 React frontend with a real Express + MongoDB backend.

## First-Time Setup

### Backend (Terminal 1)
```bash
cd backend
npm install
node seedAdmin.js      # creates admin — run ONCE then delete the file
npm run dev            # → http://localhost:5000
```

### Frontend (Terminal 2, project root)
```bash
npm install            # adds axios + Phase 1 deps
npm start              # → http://localhost:3000
```

## Admin Login
Email:    admin@mychessjourney.com
Password: Admin@1234

## Roles
- Guest  → read posts/comments, register
- Member → login, write/edit/delete own posts, comment, edit profile
- Admin  → all member abilities + image uploads + manage members + remove posts

## New in Phase 2
src/api/axios.js          — Axios with auto JWT header
src/context/AuthContext.js — global auth state
src/components/Navbar.js   — auth-aware nav
src/components/ProtectedRoute.js
src/pages/LoginPage.js
src/pages/PostPage.js      — single post + comments
src/pages/ProfilePage.js   — edit profile + change password
src/pages/CreatePostPage.js
src/pages/EditPostPage.js
src/pages/AdminPage.js     — member management + post moderation
backend/                   — full Express + MongoDB API (17 endpoints)
