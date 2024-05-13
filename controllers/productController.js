const Product = require('../models/productModel');

class ProductController{
  static async getProductList(req, res){
    try {
      const result = await Product.getProductList();
      res.json(result);
    } catch(err) {
      console.error('Error getting products', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}


module.exports = ProductController;
