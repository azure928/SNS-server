const express = require('express');
const router = express.Router();
const postController = require('./postController');
const { isAuth } = require('../../middlewares/auth');
const { postValidator } = require('../../validator/postValidator');

router.use(isAuth);

// 게시글 생성
router.post('/posts', postValidator(), postController.createPost);

// 게시글 삭제 or 복구
router.delete('/posts/:id', postController.deleteOrRestorePost);

// 게시글 좋아요 or 좋아요 취소
router.post('/posts/:id/heart', postController.createOrDeleteLike);

// 게시글 상세보기
router.get('/posts/:id', postController.readPost);

// 게시글 수정
router.patch('/posts/:id', postValidator(), postController.updatePost);

module.exports = router;
