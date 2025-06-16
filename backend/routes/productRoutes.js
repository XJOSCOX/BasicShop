const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

// Public
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Admin/Manager
router.post('/', auth, role('admin', 'manager'), productController.createProduct);
router.put('/:id', auth, role('admin', 'manager'), productController.updateProduct);
router.delete('/:id', auth, role('admin', 'manager'), productController.deleteProduct);

module.exports = router;
