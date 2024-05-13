const { pool } = require('../config/db');

class Product{
  
  static async getProductList(){
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * products');
      return result.rows;
    } catch(err){
      console.error('Error excuting query:', err);
      throw err;
    } finally {
      client.release();
    }
  }
}

module.exports = Product;