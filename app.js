const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Connect to database
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log('Connected to DB');
});

// Initializing app
const app = express();

// Import routes
const indexRoute = require('./routes/index');
const userRoute = require('./routes/user');

// Middleware
app.use(express.json());

// Mounting routes
app.use('/', indexRoute);
app.use('/user', userRoute);

// PORT settings
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server is running');
});
