const postRepository = require('./postRepository');
const userRepository = require('../user/userRepository');

// 게시글 생성
exports.createPost = async (userId, body) => {
  const { title, content, tags } = body;
  const hashtags = tags.match(/#[^\s#]*/g);

  const existedUser = await userRepository.readUserById(userId);
  if (!existedUser) {
    const error = new Error('가입되지 않은 유저입니다.');
    error.statusCode = 400;
    throw error;
  }

  // posts 테이블에 create
  const createdPost = await postRepository.createPost(title, content, userId);
  const postId = createdPost.id;

  // 해시태그가 있는 경우
  if (hashtags) {
    // tags 테이블에 create
    const createdTags = await Promise.all(
      hashtags.map((tag) => {
        return postRepository.createTag(tag.slice(1).toLowerCase());
      })
    );

    // post_tag(해시태그-포스트 중간 테이블)에 create
    await Promise.all(
      createdTags.map((createdTag) => {
        return postRepository.createPostTag(postId, createdTag[0].id);
      })
    );
  }

  return postId;
};
