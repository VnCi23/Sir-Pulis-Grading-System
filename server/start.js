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
const accountRoutes = require('./routes/account'); 

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(announcementRoutes);
app.use(accountRoutes);

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

/*
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
    ]
  );
}

addUsersAndStartServer();
*/