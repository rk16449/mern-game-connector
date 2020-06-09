const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");

// @access Public - means no token required
// @access Private - means a token is required, using our own middleware

// @route POST api/posts
// @desc Create a post
// @access Private
router.post(
  "/",
  auth,
  [check("text", "Text is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET api/posts
// @desc Get posts
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    // Get all posts but sort by date
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/posts/:id
// @desc Get post by id
// @access Private
router.get("/:id", auth, async (req, res) => {
  try {
    // Get all posts but sort by date
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "No posts found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);

    // if what they pass in is not a valid  id
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "No posts found" });
    }

    res.status(500).send("Server Error");
  }
});

// @route DELETE api/posts/:id
// @desc DELETE post by id
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    // Get all posts but sort by date
    const post = await Post.findById(req.params.id);

    // if what they pass in is not a valid  id
    if (!post) {
      return res.status(404).json({ msg: "No posts found" });
    }

    // make sure the user that is deleting the post is the owner of the post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).send("Not authorized");
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.log(err.message);

    console.error(err.message);

    // if what they pass in is not a valid  id
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found!" });
    }

    res.status(500).send("Server Error");
  }
});

// @route PUT api/posts/like/:id
// @desc Like a post
// @access Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // The post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() == req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
  }
});

// @route PUT api/posts/unlike/:id
// @desc Unlike a post
// @access Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // The post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() == req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post hasn't been liked" });
    }

    // Remove a like by getting the index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    // Splice it out of the array
    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
  }
});

// @route POST api/posts/comment/:id
// @desc Add a comment to a post
// @access Private
router.post(
  "/comment/:id",
  auth,
  [check("text", "Text is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Get the user
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      // add it to the posts comments
      post.comments.unshift(newComment);

      // Save the post
      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE api/posts/comment/:id/:comment_id
// @desc Delete a comment
// @access Private

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    // First get the post
    const post = await Post.findById(req.params.id);

    console.log("post was found");

    // Get the comment from the post
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found!" });
    }

    // Make sure the user that is deleting the comment is the owner of the comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
