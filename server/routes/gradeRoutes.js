const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

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
    const { username, year, semester, subject, classcode, grade, units, remarks, schoolYear } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.grades.push({ year, semester, subject, classcode, grade, units, remarks, schoolYear });
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

router.put('/api/grades/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const { year, semester, subject, classcode, grade, units, remarks, schoolYear } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const gradeToUpdate = user.grades.find(
      g => g.year === year && g.semester === semester && g.subject === subject
    );

    if (!gradeToUpdate) {
      return res.status(404).json({ error: 'Grade not found' });
    }

    gradeToUpdate.classcode = classcode;
    gradeToUpdate.grade = grade;
    gradeToUpdate.units = units;
    gradeToUpdate.remarks = remarks;
    gradeToUpdate.schoolYear = schoolYear;

    await user.save();

    res.json(gradeToUpdate);
  } catch (err) {
    res.status(500).json({ error: 'Error updating grade' });
  }
});

router.delete('/api/grades/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const { year, semester, subject } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.grades = user.grades.filter(
      grade => !(grade.year === year && grade.semester === semester && grade.subject === subject)
    );
    await user.save();

    res.json({ message: 'Grade deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting grade' });
  }
});

module.exports = router;