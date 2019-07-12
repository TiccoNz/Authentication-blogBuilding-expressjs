const express = require('express');
const router = express.Router();

// Import post model
const Post = require('../models/post');

//! Return all posts
router.get('/', async (req, res, next) => {
  const posts = await Post.find();

  //? Are there any posts
  if (!posts) return res.send('Posts not found');

  res.json(posts);
});

module.exports = router;
