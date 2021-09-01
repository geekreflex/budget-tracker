const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIR,
  });
};

module.exports = generateToken;
