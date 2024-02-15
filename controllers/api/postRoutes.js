const router = require("express").Router();
const { Post } = require("../../models");

//Create new post
router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Delete existing post
router.delete("/:post_id", async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        post_id: req.params.post_id,
      },
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update an existing post
router.put("/update/:post_id", async (req, res) => {
  try {
    const updatePost = await Post.update(
      {
        post_title: req.body.post_title,
        post_body: req.body.post_body,
      },
      {
        where: {
          post_id: req.params.post_id,
        },
      }
    );
    res.status(200).json(updatePost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
