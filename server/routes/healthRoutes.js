const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  res.send('Server is healthy!');
});

module.exports = router;