const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  yearGraduate: {
    type: String,
    required: true,
  },
  contactMethod: {
    type: String,
    required: true,
  },
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;