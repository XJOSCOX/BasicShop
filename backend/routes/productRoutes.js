const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');

// PUBLIC ROUTES
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// PROTECTED ROUTES (ADMIN & MANAGER)
router.post(
    '/',
    auth,
    role('admin', 'manager'),
    upload.single('image'), // Handles the image file upload
    productController.createProduct
);

router.put(
    '/:id',
    auth,
    role('admin', 'manager'),
    upload.single('image'),
    productController.updateProduct
);

router.delete(
    '/:id',
    auth,
    role('admin', 'manager'),
    productController.deleteProduct
);

module.exports = router;
