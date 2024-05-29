const Product = require('../models/productModel');
const path = require('path');
const fs = require('fs');

class ProductController{
  static async getProductList(req, res){
    try {
      const products = await Product.getProductList();
      const updatedProducts = products.map(product => ({
        ...product,
        image: product.image ? `${req.protocol}://${req.get('host')}/public/upload/products/${product.image}` : null,
        images: product.images ? product.images.map(image => `${req.protocol}://${req.get('host')}/public/upload/products/${image}`) : []
      }));
      res.status(200).json(updatedProducts);
      } catch(err) {
      console.error('Error getting products', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async createProduct(req, res){
    try {
      const { name, description, price, qty, brand_id, category_id } = req.body;
      const image = req.files.image ? req.files.image[0].filename : null;
      const images = req.files.images ? req.files.images.map(file => file.filename) : []; 

      const product = await Product.createProduct({
        name,
        description,
        price,
        qty,
        brand_id,
        category_id,
        image,
        images
      });

      res.status(201).json(product);
    } catch(err){
      res.status(500).json({ message: err.message });
    }
  }

  static async getProductById(req, res){
    try {
      const product = await Product.getProductById(req.params.id);

      if(product) {
        product.image = product.image ? `${req.protocol}://${req.get('host')}/public/upload/products/${product.image}` : null;
        product.images = product.images ? product.images.map(image => `${req.protocol}://${req.get('host')}/public/upload/products/${image}`) : [];
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch(err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getProductBySlug(req, res) {
    try {
      const product = await Product.getProductBySlug(req.params.slug);

      if(product) {
        product.image = product.image ? `${req.protocol}://${req.get('host')}/public/upload/products/${product.image}` : null;
        product.images = product.images ? product.images.map(image => `${req.protocol}://${req.get('host')}/public/upload/products/${image}`) : [];
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
      
    } catch(err) {
      res.status(500).json({ message: err.message });
    }
  } 

  static async updateProductBySlug(req, res) {
    try {
      const { name, description, price, qty, brand_id, category_id } = req.body;
      
      const imageFile = req.files && req.files.image ? req.files.image[0].filename : null;
      const imagesFiles = req.files && req.files.images ? req.files.images.map(file => file.filename) : [];
  
      const currentProduct = await Product.getProductBySlug(req.params.slug);
      if (!currentProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      if (imageFile && currentProduct.image) {
        const oldImagePath = path.join(__dirname, '..', 'public/upload', 'products', currentProduct.image);
        deleteFile(oldImagePath);
      }
  
      if (imagesFiles.length && currentProduct.images.length) {
        currentProduct.images.forEach((img) => {
          const oldImagePath = path.join(__dirname, '..', 'public/upload', 'products', img);
          deleteFile(oldImagePath);
        });
      }
  
      const updatedProduct = await Product.updateProductBySlug(req.params.slug, {
        name,
        description,
        price,
        qty,
        brand_id,
        category_id,
        image: imageFile || currentProduct.image, 
        images: imagesFiles.length ? imagesFiles : currentProduct.images
      });
  
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteProduct(req, res){
    try {
      const product = await Product.deleteProduct(req.params.id);
      if(!product) {
        return res.status(404).json({ message: 'Product not found'});
      }

      if(product.image) {
        const imagePath = path.join(__dirname, '..', 'public/upload', 'products', product.image);
        await deleteFile(imagePath);

      }

      if (product.images && product.images.length > 0) {
        for (const img of product.images) {
          const imagePath = path.join(__dirname, '..', 'public/upload/products', img);
          await deleteFile(imagePath);
        }
      }


      await Product.deleteProduct(req.params.id);
      res.status(200).json({ message: 'Product deleted successfully' });

    } catch(err){
      res.status(500).json({ message: err.message });
    } 
  }

  static async deleteProductBySlug(req, res){
    try {
      const product = await Product.getProductBySlug(req.params.slug);

      if(!product) {
        return res.status(404).json({ message: 'Product not found'});
      }

      if(product.image) {
        const imagePath = path.join(__dirname, '..', 'public/upload', 'products', product.image);
        await deleteFile(imagePath);

      }

      if (product.images && product.images.length > 0) {
        for (const img of product.images) {
          const imagePath = path.join(__dirname, '..', 'public/upload/products', img);
          await deleteFile(imagePath);
        }
      }


      await Product.deleteProductBySlug(req.params.slug);
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch(err){
      res.status(500).json({ message: err.message });
    } 
  }
}



async function deleteFile(filePath) { 
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file ${filePath}`, err);
        reject(err);
      } else {
        console.log(`Successfully deleted file ${filePath}`);
        resolve();
      }
    });
  });
}

module.exports = ProductController;
