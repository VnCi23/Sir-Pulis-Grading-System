const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

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
  } catch (error) {
    console.error('Error adding user:', error);
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
        year: '1st',
        semester: '1st',
        subject: 'Science',
        grade: 2.25,
      },
      {
        year: '1st',
        semester: '1st',
        subject: 'English',
        grade: 2.00,
      },
      {
        year: '1st',
        semester: '1st',
        subject: 'History',
        grade: 5.00,
      }
    ]
  );
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

//grade routes

router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    if (updatedFields.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(updatedFields.password, salt);
      updatedFields.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedFields, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Error updating user' });
  }
});

router.post('/api/grades', async (req, res) => {
  try {
    const { username, year, semester, subject, classcode, grade, units, remarks } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.grades.push({ year, semester, subject, classcode, grade, units, remarks });
    await user.save();

    res.status(201).json(user.grades[user.grades.length - 1]);
  } catch (err) {
    res.status(500).json({ error: 'Error adding grade' });
  }
});

router.get('/grades/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.grades);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching grades' });
  }
});

router.delete('/api/grades/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ 'grades._id': id });

    if (!user) {
      return res.status(404).json({ error: 'Grade not found' });
    }

    user.grades.id(id).remove();
    await user.save();

    res.json({ message: 'Grade deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting grade' });
  }
});

router.put('/api/grades/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const user = await User.findOne({ 'grades._id': id });

    if (!user) {
      return res.status(404).json({ error: 'Grade not found' });
    }

    const gradeToUpdate = user.grades.id(id);
    if (updatedFields.year) gradeToUpdate.year = updatedFields.year;
    if (updatedFields.semester) gradeToUpdate.semester = updatedFields.semester;
    if (updatedFields.subject) gradeToUpdate.subject = updatedFields.subject;
    if (updatedFields.classcode) gradeToUpdate.classcode = updatedFields.classcode;
    if (updatedFields.grade) gradeToUpdate.grade = updatedFields.grade;
    if (updatedFields.units) gradeToUpdate.units = updatedFields.units;
    if (updatedFields.remarks) gradeToUpdate.remarks = updatedFields.remarks;

    await user.save();

    res.json(gradeToUpdate);
  } catch (err) {
    res.status(500).json({ error: 'Error updating grade' });
  }
});

module.exports = router;