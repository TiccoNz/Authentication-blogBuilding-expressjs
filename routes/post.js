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

//! GET new post
router.get('/newpost', (req, res, next) => {
  res.send('POST');
});

//! POST new post
router.post('/newpost', async (req, res, next) => {
  const post = new Post({
    name: req.body.name,
    desc: req.body.desc,
    bodycontent: req.body.bodycontent
  });

  // Save post to DB
  try {
    const savePost = await post.save();
    savePost;
    res.send(savePost);
  } catch (error) {
    res.status(400).send(error);
  }
});

//! View post
router.get('/:postId', async (req, res, next) => {
  //! Code dosen't work
  const post = await Post.findOne({ _id: req.params.postId }, err => {
    if (err) return res.status('404').send('Post not found');
  });

  if (post) return res.json(post);
});

module.exports = router;
