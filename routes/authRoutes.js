const router = require('express').Router();

const authController = require('../controllers/authController');

const { protect } = require('../middlewares/authMiddleware');

router.post('/login', authController.login);
router.post('/regsiter', authController.register);
router.get('/user', protect, authController.getUser);

module.exports = router;
