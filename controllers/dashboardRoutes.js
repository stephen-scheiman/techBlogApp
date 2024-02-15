const router = require("express").Router();
const { Comment, Post, User } = require("../models");
const withAuth = require("../utils/auth");

//Initial route for landing
router.get("/", async (req, res) => {
  res.redirect("/dashboard/" + req.session.userId);
});

//Get all posts by user for dashboard view
router.get("/:id", async (req, res) => {
  try {
    const getPostsByUser = await Post.findAll({
      where: {
        posted_by: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ["user_name", "user_id"],
        },
        {
          model: Comment,
          attributes: ["comment_id", "comment_body", "comment_post", "commentPosted_by"],
        },
      ],
      order: [["posted_date", "DESC"]],
    });

    const userPosts = getPostsByUser.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      userPosts,
      loggedIn: req.session.loggedIn,
      userID: req.session.userId,
      userName: req.session.userName,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Get a single post for detail view
router.get("/postDetail/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["user_name","user_id"],
        },
        {
          model:Comment,
          attributes: ["comment_body", "commentPosted_by"]
        }
      ],
    });

    const post = postData.get({ plain: true });
    console.log(post);

    res.render("post-view", {
      ...post,
      logged_in: req.session.logged_in,
      userID: req.session.userId,
      userName: req.session.userName,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
