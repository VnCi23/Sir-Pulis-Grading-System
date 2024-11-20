const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const formRoutes = require('./routes/formRoutes');
const healthRoutes = require('./routes/healthRoutes');
const announcementRoutes = require('./routes/announcementRoutes');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(announcementRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

app.use('/api/users', authRoutes);
app.use('/api/forms', formRoutes);
app.use('/api', healthRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const saltRounds = 10;

async function addUser(username, password, userType, course, schoolEmail, studentId, yearEnrolled, grades) {
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log(`User ${username} already exists.`);
      return;
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({
      username,
      password: hashedPassword,
      userType,
      course,
      schoolEmail,
      studentId,
      yearEnrolled,
      grades
    });

    await user.save();
    console.log(`User ${username} added successfully.`);
  } catch (err) {
    console.error('Error adding user:', err);
  }
}

async function addUsersAndStartServer() {
  await addUser(
    'Vn Ci',
    '12345',
    'student',
    'Computer Science',
    'vnci@mstip.edu',
    '123456789',
    '2020',
    [
      {
        classCode: 'CS101',
        course: 'BSIS',
        year: 1,
        semester: '1ST',
        subject: 'Computer Science',
        teacherName: 'tc 1',
        grade: 2.25,
      },
      {
        classCode: 'MATH101',
        course: 'BSIS',
        year: 1,
        semester: '1st',
        subject: 'Mathematics',
        teacherName: 'tc 2',
        grade: 2.75,
      },
      {
        classCode: 'PHYS101',
        course: 'BSIS',
        year: 1,
        semester: '2nd',
        subject: 'Physics',
        teacherName: 'tc 3',
        grade: 2.50,
      },
      {
        classCode: 'ENG101',
        course: 'BSIS ',
        year: 1,
        semester: '2nd',
        subject: 'English',
        teacherName: 'tc 4',
        grade: 2.00,
      },
      {
        classCode: 'HIST101',
        course: 'BSIS',
        year: 2,
        semester: '1st',
        subject: 'History',
        teacherName: 'tc 5',
        grade: 5.00,
      }
    ]
  );
}

// Create a new user
app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Get a single user by ID
app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});

// Update a user by ID
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Error updating user' });
  }
});

// Delete a user by ID
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

// Endpoint to get grades by username
app.get('/api/grades/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.grades);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/users/:username/grades', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.grades);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId, username, userType, course, schoolEmail, password, yearEnrolled, grades } = req.body;

    let updatedFields = { studentId, username, userType, course, schoolEmail, yearEnrolled, grades };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedFields.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedFields, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Error updating user' });
  }
});
