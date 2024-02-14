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
})

module.exports = { User, Post, Comment };
