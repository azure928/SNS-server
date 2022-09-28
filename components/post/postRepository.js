const db = require('../../database/models/index');
const Post = db.posts;
const Tag = db.tags;
const PostTag = db.post_tag;
const Likes = db.likes;

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
 * 기능: posts, tags 중간 테이블에 post_id, tag_id 입력
 */
exports.createPostTag = async (postId, tagId) => {
  return await PostTag.create({
    post_id: postId,
    tag_id: tagId,
  });
};

/**
 * 기능: id로 post 조회
 */
exports.readPostById = async (postId) => {
  return await Post.findOne({
    where: { id: postId },
    raw: true,
  });
};

/**
 * 기능: posts 테이블 is_deleted 컬럼 업데이트
 */
exports.updatePostIsDeleted = async (postId, isDeleted) => {
  return await Post.update(
    {
      is_deleted: isDeleted,
    },
    { where: { id: postId } }
  );
};

/**
 * 기능: 좋아요 테이블에 create
 */
exports.createLike = async (userId, postId) => {
  return await Likes.create({
    user_id: userId,
    post_id: postId,
  });
};

/**
 * 기능: 좋아요 테이블에서 delete
 */
exports.deleteLike = async (userId, postId) => {
  return await Likes.destroy({
    where: { user_id: userId, post_id: postId },
  });
};

/**
 * 기능: 좋아요 테이블에서 userId, postId 조합으로 select
 */
exports.readLike = async (userId, postId) => {
  return await Likes.findOne({
    where: { user_id: userId, post_id: postId },
    raw: true,
  });
};
