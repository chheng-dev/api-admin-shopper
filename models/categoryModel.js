const { pool } = require('../config/db');

class Category{
  static async createCategory(name, color){
    const client = await pool.connect();
    try {
      const result = await client.query('INSERT INTO categories (name, color) VALUES ($1, $2) RETURNING *', [name, color]);
      return result.rows[0];
    } catch (err) {
      console.log('Error exuting query', err);
      throw err;
    } finally {
      client.release();
    }
  }

  static async getCategoriesList(){
    const client = await pool.connect();
    try{
      const result = await client.query('SELECT * FROM categories');
      return result.rows;
    } catch (err) {
      console.error('Error excuting query:', err);
      throw err;
    } finally {
      client.release();
    }
  }

  static async getCategoryById(id){
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM categories WHERE id = $1', [id]);
      return result.rows[0];
    } catch(err) {
      console.error('Error excuting query:', err);
      throw err;
    } finally {
      client.release();
    }
  }

  static async updateCategoryById(id, name, color){
    const client = await pool.connect();
    try {
      const result = await client.query('UPDATE categories SET name = $1, color = $2 WHERE id = $3 RETURNING *', [name, color, id]);

      return result.rows[0];
    } catch(err){
      console.error('Error updating category Id:', err);
      throw err;
    } finally {
      client.release();
    }
  }

  static async deleteCategoryId(id){
    const client = await pool.connect();
    try { 
      const result = await client.query('SELECT * FROM categories WHERE id = $1', [id]);
      if(result.rows.length === 0){
        throw new Error('Category given Id not found');
      }

      await client.query('DELETE FROM categories WHERE id = $1', [id]);

      return { message: 'Category has been deleted' }

    } catch (err) {
      console.error('Error excuting query:', err);
      throw err;
    } finally {
      client.release();
    }
  }

}

module.exports = Category;

