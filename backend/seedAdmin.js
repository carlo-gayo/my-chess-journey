// backend/seedAdmin.js
// One-time script to create the admin account in MongoDB.
//
// Run from inside the backend/ folder:
//   node seedAdmin.js
//
// Delete this file after running it — you only need it once.

require('dotenv').config();
const connectDB = require('./config/db');
const User      = require('./models/User');

connectDB().then(async () => {
  const exists = await User.findOne({ email: 'admin@gmail.com' });

  if (exists) {
    console.log('Admin account already exists — no changes made.');
    process.exit();
  }

  await User.create({
    name:     'Chess Journey Admin',
    email:    'admin@gmail.com',
    password: 'admin123',
    role:     'admin',
  });

  console.log('✅ Admin account created successfully!');
  console.log('   Email:    admin@gmail.com');
  console.log('   Password: admin123');
  console.log('');
  console.log('⚠️  Delete seedAdmin.js now — you only need it once.');
  process.exit();
});
