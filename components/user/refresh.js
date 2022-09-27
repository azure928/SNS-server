//const client = require('../../client');
const { sign, verify, refreshVerify } = require('../../utils/jwt');
const jwt = require('jsonwebtoken');
const userRepository = require('./userRepository');

const refresh = async (req, res) => {
  // check access token and refresh token exist
  if (req.headers.authorization && req.headers.refresh) {
    const authToken = req.headers.authorization.split('Bearer ')[1];
    const refreshToken = req.headers.refresh;

    // access token verify
    const authResult = verify(authToken);
    console.log('authResult!!', authResult);

    // access token decoding
    const decoded = jwt.decode(authToken);
    console.log('decoded', decoded);

    if (decoded === null) {
      /* res.status(401).send({
        ok: false,
        message: 'No authorized!1',
      });*/

      const error = new Error('No authorized!1');
      error.statusCode = 401;
      throw error;
    }

    // refreshToken verify
    /*let user = null;
    try {
      user = await userRepository.readUserById(decoded.id);
      console.log('user!!!!!!!!!!!', user);
    } catch (err) {
      res.status(401).send({
        ok: false,
        message: err.message,
      });
    }*/

    const user = await userRepository.readUserById(decoded.id);

    if (user === null) {
      const error = new Error('존재하지 않는 사용자입니다.');
      error.statusCode = 401;
      throw error;
    }

    const refreshResult = await refreshVerify(refreshToken, user.email);
    console.log('refreshResult?????', refreshResult);

    if (authResult.ok === false && authResult.message === 'jwt expired') {
      // 1. accessToken expired && refreshToken expired => make user login
      if (refreshResult === false) {
        res.status(401).send({
          ok: false,
          message: 'No authorized!2',
        });
      } else {
        // 2. accessToken expired && refreshToken valid => make new accessToken
        const newAccessToken = sign(user);

        res.status(200).send({
          ok: true,
          data: {
            accessToken: newAccessToken,
            refreshToken,
          },
        });
      }
    } else {
      // 3. accessToken valid => dont have to make new token
      res.status(400).send({
        ok: false,
        message: 'Acess token is not expired!',
      });
    }
  } else {
    res.status(400).send({
      ok: false,
      message: 'Access token and refresh token are need for refresh!',
    });
  }
};

module.exports = { refresh };
