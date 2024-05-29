const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const upload = require('../config/multer');

router.get('/products', ProductController.getProductList);
router.post('/product', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 10 }]), ProductController.createProduct);
router.get('/product/:id', ProductController.getProductById);
router.delete('/product/:id', ProductController.deleteProduct);

module.exports = router;
