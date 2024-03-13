const Post = require("../models/post_model");

const get = async (req, res) => {
  try {
    var posts;
    if (req.params.id != null) {
      posts = await Post.findById(req.params.id);
    } else {
      posts = await Post.find();
    }
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const post = async (req, res) => {
  const post = req.body;
  try {
    const newPost = await Post.create(post);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const put = async (req, res) => {
  const post = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(post._id, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deletePost = async (req, res) => {
  const post = req.body;
  try {
    const rc = await Post.findByIdAndDelete(post._id);
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  get,
  post,
  put,
  deletePost,
};
