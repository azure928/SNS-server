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

// 게시글 삭제 or 복구
// is_deleted 컬럼이 true일 경우 false로, false일 경우 true로 업데이트
exports.deleteOrRestorePost = async (userId, postId) => {
  const seletedPost = await postRepository.readPostById(postId);

  const isSameUser = userId === seletedPost.user_id;
  if (!isSameUser) {
    const error = new Error('작성자만 삭제할 수 있습니다.');
    error.statusCode = 401;
    throw error;
  }

  const isDeleted = !seletedPost.is_deleted;
  await postRepository.updatePostIsDeleted(postId, isDeleted);

  if (isDeleted === false) {
    return { message: '게시글 복구 성공' };
  } else {
    return { message: '게시글 삭제 성공' };
  }
};
