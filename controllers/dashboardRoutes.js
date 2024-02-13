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
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.get('/post/:id', async (req, res) => {
//   try {
//     const postData = await Post.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['user_name'],
//         },
//       ],
//     });

//     const post = postData.get({ plain: true });

//     res.render('dashboard', {
//       ...post,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// router.get("/newPost", async (req, res)=>{
//   console.log("Why doesn't this fire my view");
//   res.json("This is a test");
//   res.render('newpost');
// });





module.exports = router;
