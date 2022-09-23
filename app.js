require('dotenv').config();
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./components/indexRouter');
const { sequelize } = require('./database/models/index');

//* DB 연결
sequelize
  .sync({ force: false }) // true 로 설정하면 서버 실행마다 테이블 재생성
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(routes);

app.get('/ping', (req, res) => {
  return res.status(200).json({ message: 'pong' });
});

app.use(errorHandler);

module.exports = app;
