const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

User.hasMany(Post, {
  foreignKey: "posted_by",
});

Post.belongsTo(User, {
  foreignKey: "posted_by",
});

Post.hasMany(Comment, {
  foreignKey: "comment_post",
});

User.hasMany(Comment, {
  foreignKey: "commentPosted_by"
});

Comment.belongsTo(User, {
  foreignKey: "commentPosted_by",
});



module.exports = { User, Post, Comment };
