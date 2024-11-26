const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  year: { type: String, required: true },
  semester: { type: String, required: true },
  subject: { type: String, required: true },
  grade: { type: Number, required: true },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  course: { type: String },
  schoolEmail: { type: String },
  studentId: { type: String },
  yearEnrolled: { type: String },
  grades: [gradeSchema]
});

module.exports = mongoose.model('User', userSchema);
