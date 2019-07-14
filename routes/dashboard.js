const express = require('express');

const router = express.Router();

const { privateRouteAuthorization } = require('../controller/authorization');

//! Main - overview - stats
router.get('/', privateRouteAuthorization, (req, res, next) => {
  res.send('Dashboard');
});

module.exports = router;
