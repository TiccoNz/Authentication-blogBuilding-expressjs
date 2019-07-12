const express = require('express');

const router = express.Router();

//! Main - overview - stats
router.get('/', (req, res, next) => {
  res.send('Dashboard');
});

module.exports = router;
