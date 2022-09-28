const express = require('express');
const router = express.Router();
const userRouter = require('./user/userRouter');
const postRouter = require('./post/postRouter');

router.use(userRouter);
router.use(postRouter);

module.exports = router;
