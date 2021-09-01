const router = require('express').Router();
const budgetController = require('../controllers/budgetController');

const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, budgetController.create);
router.get('/', protect, budgetController.getAll);
router.get('/:id', protect, budgetController.getOne);
router.put('/:id', protect, budgetController.update);
router.delete('/:id', protect, budgetController.delete);

module.exports = router;
