const router = require('express').Router();

const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/regsiter', authController.register);
router.get('/user', authController.getUser);

module.exports = router;
