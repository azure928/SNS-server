require('dotenv').config();
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./components/indexRouter');

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
