const { pool } = require('../config/db');
const slugify = require('slugify');
const moment = require('moment');

class Product{
  static async getProductList(){
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM products');
      console.log(result);
      return result.rows;
    } catch(err){
      console.error('Error excuting query:', err);
      throw err;
    } finally {
      client.release();
    }
  }

  static async createProduct(product){
    const client = await pool.connect();
    const { name, description, price, qty, brand_id, category_id, image, images } = product;
    try { 
      const slug = `${slugify(name, { lower: true })}-${moment().format('YYYYMMDDHHmmss')}`;
      const result = await client.query(`INSERT INTO products (name, description, price, qty, brand_id, category_id, image, images, slug)
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
                            [name, description, price, qty, brand_id, category_id, image, images, slug]);
      return result.rows[0];
    } catch (err){
      console.log('Error exuting query', err);
      throw err;
    } finally {
      client.release();
    }
  }

  static async getProductBySlug(slug){
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM products WHERE slug = $1', [slug]);
      return result.rows[0];
    } catch(err){
      console.log('Error excuting query', err);
      throw err;
    } finally {
      client.release();
    }
  }

  static async getProductById(id){
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM products WHERE id = $1', [id]);
      return result.rows[0];
    } catch(err){
      console.log('Error excuting query', err);
      throw err;
    } finally {
      client.release();
    }
  }

  static async updateProductBySlug(slug, { name, description, price, qty, brand_id, category_id, image, images }){
    const client = await pool.connect();
    const newSlug = `${slugify(name, { lower: true })}-${moment().format('YYYYMMDDHHmmss')}`;
    try {
      const result = await client.query(
        'UPDATE products SET name = $1, description = $2, price = $3, qty = $4, brand_id = $5, category_id = $6, image = $7, images = $8, slug = $9, updated_at = CURRENT_TIMESTAMP WHERE slug = $10 RETURNING *',
        [name, description, price, qty, brand_id, category_id, image, images, newSlug, slug]
      );

      return result.rows[0];
    } catch (err) {
      console.error('Error executing query', err);
      throw err;
    } finally {
      client.release();
    }

  }

  static async deleteProduct(id){
    const client = await pool.connect();
    try {
      const result = await client.query('DELETE FROM products WHERE id = $1 RETURNING *',[id]);
      return result.rows[0];
    } catch(err){
      console.log('Error excuting query', err);
      throw err;
    } finally {
      client.release();
    }
  }

  static async deleteProductBySlug(slug){
    const client = await pool.connect();
    try {
      const result = await pool.query('DELETE FROM products WHERE slug = $1 RETURNING *', [slug]);
      return result.rows[0];
    } catch(err){
      console.log('Error excuting query', err);
      throw err;
    } finally {
      client.release();
    }
  }

}

module.exports = Product;