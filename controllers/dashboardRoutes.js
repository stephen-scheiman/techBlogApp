const router = require("express").Router();
const { Post, User } = require("../models");
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
          attributes: ["user_name"],
        },
      ],
    });

    const userPosts = getPostsByUser.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      userPosts,
      loggedIn: req.session.loggedIn,
      userID: req.session.userId,
      userName: req.session.userName,
    });
    console.log(req.session.userId);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});




module.exports = router;
