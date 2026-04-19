// backend/server.js
// Main entry point for the My Chess Journey Express server.
// Run with:  npm run dev   (nodemon — auto-restarts on file save)
//
// Start order:
//  1. Load .env  2. Connect MongoDB  3. Register middleware  4. Mount routes  5. Listen

require('dotenv').config(); // ← MUST be first so all files can read .env

const express    = require('express');
const cors       = require('cors');
const path       = require('path');
const connectDB  = require('./config/db');

const authRoutes    = require('./routes/auth.routes');
const postRoutes    = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const adminRoutes   = require('./routes/admin.routes');

const app = express();

// ── Connect to MongoDB ────────────────────────────────────────────────────
connectDB();

// ── Global Middleware ─────────────────────────────────────────────────────
// Allow React (port 3000) to call this server (port 5000)
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Parse JSON request bodies
app.use(express.json());

// Serve uploaded images as public static files
// e.g. http://localhost:5000/uploads/1719123456789-342156789.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── API Routes ────────────────────────────────────────────────────────────
app.use('/api/auth',     authRoutes);
app.use('/api/posts',    postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/admin',    adminRoutes);

// ── Health check ──────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'My Chess Journey API is running ✔' });
});

// ── Start Server ──────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
