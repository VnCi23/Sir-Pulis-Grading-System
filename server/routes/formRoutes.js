const express = require('express');
const router = express.Router();
const Form = require('../models/Form');

// Route to handle form submissions
router.post('/submit-form', async (req, res) => {
  try {
    const formData = new Form(req.body);
    await formData.save();
    res.status(200).send('Form submitted successfully');
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).send('Failed to submit form');
  }
});

// Route to retrieve submitted form data
router.get('/form-data', async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    console.error('Error retrieving form data:', error);
    res.status(500).send('Error retrieving form data');
  }
});

module.exports = router;