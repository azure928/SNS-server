const jwt = require('jsonwebtoken');
const userRepository = require('../components/user/userRepository');

const AUTH_ERROR = { message: 'Authentication Error' };

const isAuth = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: error.message });
    }
    const user = await userRepository.readUserById(decoded.id);
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    req.userId = user.id;
    next();
  });
};

module.exports = { isAuth };
