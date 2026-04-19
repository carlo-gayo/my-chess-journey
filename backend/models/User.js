// backend/models/User.js
// Mongoose schema for users.
// The pre-save hook hashes the password automatically before storing it —
// plain-text passwords never touch the database.

const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['member', 'admin'],
      default: 'member',
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    bio: {
      type: String,
      default: '',
    },
    profilePic: {
      type: String,
      default: '', // stores filename e.g. '1719123456789-342156789.jpg'
    },
  },
  { timestamps: true } // adds createdAt and updatedAt
);

// ── Pre-save hook: hash password before storing ────────────────────────────
// Only runs when the password field was actually changed.
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// ── Instance method: compare login password with stored hash ───────────────
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
