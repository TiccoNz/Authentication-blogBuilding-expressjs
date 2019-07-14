const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Import User model
const User = require('../models/user');

// Import auth validation
const {
  registerSchemaValidation,
  logInSchemaValidation
} = require('../validation/authValidation');

// Import authorization
const { privateRouteAuthorization } = require('../controller/authorization');

//! Make salt variabel

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
  // Validate data before creating a user
  const { error } = registerSchemaValidation(req.body);
  if (error) return res.send(error);

  // Does email already exist
  const emailCheck = await User.findOne({ email: req.body.email });
  if (emailCheck) return res.send('Email already exist in the database');

  // Hash password before saving user data to the database
  const bcryptjsSalt = await bcryptjs.genSalt(10);
  const hashPassword = await bcryptjs.hash(req.body.password, bcryptjsSalt);

  // Create user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });

  // Save user to DB
  try {
    const saveUser = await user.save();
    //? Redirect with a message
    res.redirect('/user/login');
    //res.send(saveUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

//! GET LOGIN
router.get('/login', (req, res, next) => {
  res.send('Log in');
});

//! Post LOGIN -- Find bug
router.post('/login', async (req, res, next) => {
  // Validating data
  const { error } = logInSchemaValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Does the email already exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email is not found');

  // Password validation
  const passwordValidation = await bcryptjs.compare(
    req.body.password,
    user.password
  );
  if (!passwordValidation) return res.status(400).send('Password incorrect');

  // Assign jwt token
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_TOKEN_SECRET);
  res.header('auth-token', token);

  res.send('logged in');
});

//! GET forgot password
router.get('/forgotpassword', (req, res, next) => {
  res.send('GET Forgot password');
});

//! POST forgot password
router.post('/forgotpassword', (req, res, next) => {
  res.send('POST Forgot password');
});

//! Delete change password
router.delete('/deleteuser', async (req, res, next) => {
  //! Create sessions and find userId
  const deleteUser = await User.remove({ _id: userId });
});

//! Update change password
router.patch('/changepassword', async (req, res, next) => {
  //! Create sessions and find userId
  //! Hash password
  const password = req.body.password;
  const newPassward = req.body.newPassward;
  const newPassward2 = req.body.newPassward2;

  const user = await User.findById(UserId);

  //? Is new password valid
  if (user.password === password && newPassward === newPassward2) {
    const updateUser = User.update({ password: newPassward });
    if (updateUser) return res.send('Password updateded');
  }
});

module.exports = router;
