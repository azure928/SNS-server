const postRepository = require('./postRepository');
const userRepository = require('../user/userRepository');

// 게시글 생성
exports.createPost = async (userId, body) => {
  const { title, content, tags } = body;
  const hashtags = tags.match(/#[^\s#]*/g);

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

  if (!seletedPost) {
    const error = new Error('존재하지 않는 게시물입니다.');
    error.statusCode = 404;
    throw error;
  }

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

// 게시글 좋아요 or 좋아요 취소
exports.createOrDeleteLike = async (userId, postId) => {
  const seletedPost = await postRepository.readPostById(postId);

  if (!seletedPost) {
    const error = new Error('존재하지 않는 게시물입니다.');
    error.statusCode = 404;
    throw error;
  }

  const isLike = await postRepository.readLike(userId, postId);

  if (isLike) {
    await postRepository.deleteLike(userId, postId);
    return { message: '좋아요 취소 성공' };
  } else {
    await postRepository.createLike(userId, postId);
    return { message: '좋아요 성공' };
  }
};

// 게시글 상세보기
exports.readPost = async (userId, postId) => {
  const seletedPost = await postRepository.readPostById(postId);
  if (!seletedPost) {
    const error = new Error('존재하지 않는 게시물입니다.');
    error.statusCode = 404;
    throw error;
  }

  let isLike = false;
  const like = await postRepository.readLike(userId, postId);
  if (like) {
    isLike = true;
  }

  const tags = await postRepository.readTags(postId);
  let tagArr = [];
  for (let i = 0; i < tags.length; i++) {
    tagArr[i] = '#' + tags[i].tag;
  }

  const post = await postRepository.readPostAndUserName(postId);

  const result = {
    writer: post.user_name,
    title: post.title,
    content: post.content,
    hits: post.hits,
    isLike: isLike,
    tags: tagArr,
  };

  await postRepository.updatePostsHits(postId, seletedPost.hits);

  return result;
};

// 게시글 수정
exports.updatePost = async (userId, postId, body) => {
  const { title, content } = body;

  const seletedPost = await postRepository.readPostById(postId);
  if (!seletedPost) {
    const error = new Error('존재하지 않는 게시물입니다.');
    error.statusCode = 404;
    throw error;
  }

  const isSameUser = userId === seletedPost.user_id;
  if (!isSameUser) {
    const error = new Error('작성자만 수정할 수 있습니다.');
    error.statusCode = 401;
    throw error;
  }

  await postRepository.updatePost(title, content, postId);
};

// 게시글 목록 보기
exports.readPosts = async (query) => {
  //const { keyword } = query;
  const result = await postRepository.readPosts();
  //console.log('result!!!!', result);

  return result;
};
