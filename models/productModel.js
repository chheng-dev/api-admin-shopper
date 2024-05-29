const { pool } = require('../config/db');

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
      const result = await client.query(`INSERT INTO products (name, description, price, qty, brand_id, category_id, image, images)
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
                            [name, description, price, qty, brand_id, category_id, image, images]);
      return result.rows[0];
    } catch (err){
      console.log('Error exuting query', err);
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

  static async updateProduct(id, { name, description, price, qty, brand_id, category_id, image, images }){
    const client = pool.connect();
    try {
      const result = (await client).query(`
          UPDATE products SET name = $1, description = $2, price = $3, qty = $4, brand_id = $5, category_id = $6, 
          image = $7, images = $8, updated_at = CURRENT_TIMESTAMP WHERE id = $9 RETURNING *`,
          [name, description, price, qty, brand_id, category_id, image, images, id]
      );
      return result.rows[0];

    } catch (err) {
      console.log('Error excuting query', err);
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
}

module.exports = Product;