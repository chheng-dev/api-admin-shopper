const Category = require('../models/categoryModel');

class CategoryController {
  static async getCategoriesList(req, res){
    try {
      const result = await Category.getCategoriesList();
      res.json(result);
    } catch (err) {
      console.log('Error fetching categories:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async createCategory(req, res) {
    try {
      const { name, color } = req.body;
      const newCategory = await Category.createCategory(name, color);
      res.json(newCategory);
    } catch(err){
      console.error('Error creating category:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getCategoryById(req, res) {
    try {
      const id = req.params.id;
      const result = await Category.getCategoryById(id);
      res.json(result);
    } catch(err){
      console.error('Error with id given:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async updateCategoryById(req, res) {
    try {
      const { id } = req.params;
      const { name, color } = req.body;

      const updateCategory = await Category.updateCategoryById(id, name, color);

      if(!updateCategory){
        return res.status(400).json({ error: 'Category not found' });
      }

      res.json(updateCategory);
    } catch(err){
      console.error('Error updating Category by Id:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async deleteCategoryId(req, res) {
    try {
      const id = req.params.id;
      await Category.deleteCategoryId(id);
      res.json({ message: 'Category has been deleted!' });
    } catch(err){
      console.error('Error deleting given id:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

}

module.exports = CategoryController;