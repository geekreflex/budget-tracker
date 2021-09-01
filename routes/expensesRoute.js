const router = require('express').Router();
const expensesController = require('../controllers/expensesController');

const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, expensesController.create);
router.get('/:id', protect, expensesController.getAll);
router.delete('/:id', protect, expensesController.delete);

module.exports = router;
