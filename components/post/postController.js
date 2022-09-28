const postService = require('./postService');

// 게시글 생성
exports.createPost = async (req, res, next) => {
  const result = await postService.createPost(req.userId, req.body);

  res.status(201).json({ message: '게시글 작성 성공', postId: result });
};

// 게시글 삭제 or 복구
exports.deleteOrRestorePost = async (req, res, next) => {
  const result = await postService.deleteOrRestorePost(req.userId, req.params.id);

  res.status(201).json(result);
};
