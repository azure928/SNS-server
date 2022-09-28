const express = require('express');
const router = express.Router();
const postController = require('./postController');
const { isAuth } = require('../../middlewares/auth');

router.use(isAuth);

// 게시글 생성
router.post('/post', postController.createPost);

module.exports = router;
