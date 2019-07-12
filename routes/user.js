const express = require('express');

const router = express.Router();

// Import User model
const User = require('../models/user');

//! GET USER INDEX
router.get('/', (req, res, next) => {
  res.send('Register or log in');
});

//! POST USER INDEX
router.post('/', (req, res, next) => {
  res.send('Register or log in post');
});

//! GET REGISTER
router.get('/register', (req, res, next) => {
  res.send('Register');
});

//! POST REGISTER
router.post('/register', async (req, res, next) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  // Save user to DB
  try {
    const saveUser = await user.save();
    res.send(saveUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

//! GET LOGIN
router.get('/login', (req, res, next) => {
  res.send('Log in');
});

//! Post LOGIN
router.post('/login', async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  //? Try to find the email in the DB
  const user = await User.findOne({ email: email });
  if (!user) return res.send('Email is not found in the database');

  //? Is the passward correct
  if (!user.password === password) return res.send('Password incorrect');

  res.send('Email and password was correct');
});

module.exports = router;
