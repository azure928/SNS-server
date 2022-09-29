const postService = require('./postService');

// 게시글 생성
exports.createPost = async (req, res, next) => {
  const result = await postService.createPost(req.userId, req.body);

  res.status(201).json({ message: '게시글 작성 성공', postId: result });
};

// 게시글 삭제 or 복구
exports.deleteOrRestorePost = async (req, res, next) => {
  const result = await postService.deleteOrRestorePost(req.userId, req.params.id);

  res.status(200).json(result);
};

// 게시글 좋아요 or 좋아요 취소
exports.createOrDeleteLike = async (req, res, next) => {
  const result = await postService.createOrDeleteLike(req.userId, req.params.id);

  res.status(201).json(result);
};

// 게시글 상세보기
exports.readPost = async (req, res, next) => {
  const result = await postService.readPost(req.userId, req.params.id);

  res.status(200).json(result);
};

// 게시글 수정
exports.updatePost = async (req, res, next) => {
  await postService.updatePost(req.userId, req.params.id, req.body);

  res.status(200).json({ message: '게시글 수정 성공' });
};

// 게시글 목록 보기
exports.readPosts = async (req, res, next) => {
  const result = await postService.readPosts(req.query);

  if (result.length == 0) {
    res.status(204).send();
  } else {
    res.status(200).json(result);
  }
};
