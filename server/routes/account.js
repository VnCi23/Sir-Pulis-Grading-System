const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

const saltRounds = 10;

async function addUser(username, password, userType, course, schoolEmail, studentId, grades) {
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
      grades
    });

    await user.save();
    console.log(`User ${username} added successfully.`);
  } catch (error) {
    console.error('Error adding user:', error);
  }
}

async function addUsersAndStartServer() {
  const user = {
    username: "vincegaurino",
    password: "yourpassword", 
    userType: "student",
    course: "BS. Information System",
    schoolEmail: "vnci@mstip.edu",
    studentId: "12345",
    grades: [
      {
        year: "1st",
        semester: "1st",
        subject: "Science",
        classcode: "SCI101",
        grade: 2.25,
        units: 3,
        remarks: "Passed"
      },
      {
        year: "1st",
        semester: "1st",
        subject: "English",
        classcode: "ENG101",
        grade: 2.00,
        units: 3,
        remarks: "Passed"
      },
      {
        year: "1st",
        semester: "1st",
        subject: "History",
        classcode: "HIS101",
        grade: 5.00,
        units: 3,
        remarks: "Failed"
      }
    ]
  };

  try {
    await addUser(
      user.username,
      user.password,
      user.userType,
      user.course,
      user.schoolEmail,
      user.studentId,
      user.grades
    );
  } catch (error) {
    console.error('Error adding user:', error);
  }
}

addUsersAndStartServer();

router.post('/api/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

router.get('/api/users/:id', async (req, res) => {
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

router.put('/api/users/:id', async (req, res) => {
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

router.delete('/api/users/:id', async (req, res) => {
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

router.get('/api/grades/:username', async (req, res) => {
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

router.get('/api/users/:username/grades', async (req, res) => {
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

router.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId, username, userType, course, schoolEmail, password, grades } = req.body;

    let updatedFields = { studentId, username, userType, course, schoolEmail, grades };
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

module.exports = router;