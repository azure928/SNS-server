const logger = require('../logger');

const errorHandler = (err, req, res, next) => {
  console.log('\x1b[33m%s\x1b[0m', err);
  logger.error(err.message);
  return res.status(err.statusCode || 500).json({ error: err.message || 'Internal Server Error' });
};

module.exports = errorHandler;
