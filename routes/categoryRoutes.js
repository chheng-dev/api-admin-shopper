const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');


router.post('/category', CategoryController.createCategory);
router.get('/categories', CategoryController.getCategoriesList);
router.get('/category/:id', CategoryController.getCategoryById);
router.put('/category/:id', CategoryController.updateCategoryById);
router.delete('/category/:id', CategoryController.deleteCategoryId);


module.exports = router;