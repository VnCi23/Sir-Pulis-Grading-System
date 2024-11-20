const express = require('express');
const router = express.Router();
const Form = require('../models/Form');

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

router.get('/form-data', async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    console.error('Error retrieving form data:', error);
    res.status(500).send('Error retrieving form data');
  }
});

router.delete('/form-data/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Form.findByIdAndDelete(id);
    res.status(200).send('Form data deleted successfully');
  } catch (error) {
    console.error('Error deleting form data:', error);
    res.status(500).send('Error deleting form data');
  }
});

module.exports = router;