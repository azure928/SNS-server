const db = require('../../database/models/index');
const Post = db.posts;
const Tag = db.tags;
const PostTag = db.post_tag;

/**
 * 기능: post 생성
 */
exports.createPost = async (title, content, userId) => {
  return await Post.create({
    title: title,
    content: content,
    user_id: userId,
  });
};

/**
 * 기능: tag 생성
 * 입력된 해시태그를 조회 후 없는 값이면 생성하고, 있는 값이면 찾아온다.
 */
exports.createTag = async (tag) => {
  return await Tag.findOrCreate({
    where: { tag: tag.replace(',', '') },
    raw: true,
  });
};

/**
 * 기능: post, tag 중간 테이블에 post_id, tag_id 입력
 */
exports.createPostTag = async (postId, tagId) => {
  return await PostTag.create({
    post_id: postId,
    tag_id: tagId,
  });
};
