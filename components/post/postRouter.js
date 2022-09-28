const express = require('express');
const router = express.Router();
const postController = require('./postController');
const { isAuth } = require('../../middlewares/auth');
const { postValidator } = require('../../validator/postValidator');

router.use(isAuth);

// 게시글 생성
router.post('/post', postValidator(), postController.createPost);

// 게시글 삭제 or 복구
router.delete('/post/:id', postController.deleteOrRestorePost);

module.exports = router;
