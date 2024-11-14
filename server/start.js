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

dotenv.config();

const app = express();
app.use(bodyParser.json());
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
});

app.use('/api/users', authRoutes);
app.use('/api/forms', formRoutes);
app.use('/api', healthRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async function addUser(username, password, userType, course, schoolEmail, contactNumber, studentId, yearEnrolled, address, grades) {
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log(`User ${username} already exists.`);
      return; 
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, userType, course, schoolEmail, contactNumber, studentId, yearEnrolled, address, grades });
    await newUser.save();
    console.log(`User ${username} created successfully as ${userType}.`);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

async function addUsersAndStartServer() {
  const users = [
    {
      username: 'pulis',
      password: 'pulis123',
      userType: 'admin',
      course: '',
      schoolEmail: 'admin@school.edu',
      contactNumber: '987-654-3210',
      studentId: '',
      yearEnrolled: '',
      address: 'san juan',
      grades: []
    },
    {
      username: 'ginggoy',
      password: 'ginggoy123',
      userType: 'teacher',
      course: 'Mathematics',
      schoolEmail: 'teacher@school.edu',
      contactNumber: '555-555-5555',
      studentId: '',
      yearEnrolled: '',
      address: 'san juan',
      grades: []
    },
    {
      username: 'vince',
      password: '1234',
      userType: 'student',
      course: 'BSIS',
      schoolEmail: 'vince@school.edu',
      contactNumber: '123-456-7890',
      studentId: 'S123456',
      yearEnrolled: '2020',
      address: 'san juan',
      grades: [
        {
          classCode: 'CS101',
          course: 'BSIS',
          year: 2020,
          semester: 'Fall',
          subject: 'Introduction to Programming',
          teacherName: 'Dr. Smith',
          grade: 85,
          passOrFail: 'Pass'
        }
      ]
    }
  ];

  for (const user of users) {
    await addUser(user.username, user.password, user.userType, user.course, user.schoolEmail, user.contactNumber, user.studentId, user.yearEnrolled, user.address, user.grades);
  }
}
