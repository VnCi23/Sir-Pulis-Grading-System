const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  addUsersAndStartServer();
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1); // Exit the process if unable to connect
});

async function addUser(username, password, userType) {
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log(`User ${username} already exists.`);
      return; // Exit if user already exists
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, userType });
    await newUser.save();
    console.log(`User ${username} created successfully as ${userType}.`);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

async function addUsersAndStartServer() {
  const users = [
    { username: 'admin', password: 'adminpassword', role: 'admin' },
    { username: 'teacher', password: 'teacherpassword', role: 'teacher' },
    { username: 'vince', password: '1234', role: 'student' },
  ];

  for (const user of users) {
    await addUser(user.username, user.password, user.role);
  }

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.send('Server is healthy!');
  });

  // Authentication Routes
  app.use('/api/users', authRoutes);

  // Start the Express server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
