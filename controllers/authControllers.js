const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');
const authController = {};

authController.register = async (req, res) => {
  const { name, email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);

  let user = {
    name: name,
    email: email,
    password: encryptedPassword,
  };

  req.getConnection((error, conn) => {
    conn.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      (error, results, field) => {
        if (error) {
          return res.status(500).send({
            message: error.message || 'Error occurred',
          });
        }

        if (results.length > 0) {
          res.status(400).send({
            message: 'Email already registered',
          });
        } else {
          req.getConnection((error, conn) => {
            conn.query(
              'INSERT INTO users SET ?',
              user,
              (error, results, field) => {
                if (error) {
                  res.status(401).send({
                    message: error.message || 'Error occurred',
                  });
                } else {
                  res.status(201).send({
                    message: 'User registered successfully',
                    token: generateToken(results.insertId),
                  });
                }
              }
            );
          });
        }
      }
    );
  });
};

authController.login = async (req, res) => {
  const { email, password } = req.body;

  req.getConnection((err, conn) => {
    conn.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      async (error, results, fields) => {
        if (error) {
          return res.status(400).send({
            message: error.message || 'Error occurred',
          });
        }

        if (results.length > 0) {
          const comparison = await bcrypt.compare(
            password,
            results[0].password
          );

          if (comparison) {
            res.status(200).send({
              message: 'Login successfull',
              token: generateToken(results[0].id),
            });
          } else {
            res.status(400).send({
              message: 'Invalid email or password',
            });
          }
        } else {
          res.status(400).send({
            message: 'Email does not exist',
          });
        }
      }
    );
  });
};

module.exports = authController;
