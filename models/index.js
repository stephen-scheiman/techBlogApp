const User = require('./User');
const Post = require('./Post');

User.hasMany(Post, {
    foreignKey: 'posted_by',
  });
  
  Post.belongsTo(User, {
    foreignKey: 'posted_by',
  });

module.exports = { User, Post };
