const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.getConnection((error, conn) => {
        conn.query(
          'SELECT * FROM users WHERE id = ?',
          [decoded.id],
          (error, results, field) => {
            if (error) {
              res
                .status(500)
                .send({ message: error.message || 'Error occurred' });
              return;
            }

            if (results.length > 0) {
              req.user = results[0];
              next();
            }
          }
        );
      });
    } catch (error) {
      res.status(401).send({
        message: 'Not Authorized, token failed',
      });
    }
  }

  if (!token) {
    res.status(401).send({
      message: 'Not Authorized, no token',
    });
  }
};

module.exports = { protect };
