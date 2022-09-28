var DataTypes = require('sequelize').DataTypes;
var _likes = require('./likes');
var _post_tag = require('./post_tag');
var _posts = require('./posts');
var _tags = require('./tags');
var _users = require('./users');

function initModels(sequelize) {
  var likes = _likes(sequelize, DataTypes);
  var post_tag = _post_tag(sequelize, DataTypes);
  var posts = _posts(sequelize, DataTypes);
  var tags = _tags(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  likes.belongsTo(posts, { as: 'post', foreignKey: 'post_id' });
  posts.hasMany(likes, { as: 'likes', foreignKey: 'post_id' });
  post_tag.belongsTo(posts, { as: 'post', foreignKey: 'post_id' });
  posts.hasMany(post_tag, { as: 'post_tags', foreignKey: 'post_id' });
  post_tag.belongsTo(tags, { as: 'tag', foreignKey: 'tag_id' });
  tags.hasMany(post_tag, { as: 'post_tags', foreignKey: 'tag_id' });
  likes.belongsTo(users, { as: 'user', foreignKey: 'user_id' });
  users.hasMany(likes, { as: 'likes', foreignKey: 'user_id' });
  posts.belongsTo(users, { as: 'user', foreignKey: 'user_id' });
  users.hasMany(posts, { as: 'posts', foreignKey: 'user_id' });

  return {
    likes,
    post_tag,
    posts,
    tags,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
