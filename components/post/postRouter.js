const express = require('express');
const router = express.Router();
const postController = require('./postController');
const { isAuth } = require('../../middlewares/auth');
const { postValidator } = require('../../validator/postValidator');

router.use(isAuth);

// 게시글 생성
router.post('/post', postValidator(), postController.createPost);

module.exports = router;
