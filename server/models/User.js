const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  course: { type: String },
  schoolEmail: { type: String },
  contactNumber: { type: String },
  studentId: { type: String },
  yearEnrolled: { type: String },
  address: { type: String }
});

module.exports = mongoose.model('User', userSchema);
