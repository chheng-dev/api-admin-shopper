const { Pool, pool } = require('../config/db');


class UserModel{
  static async findUserbyEmail(email) {
    const client = await pool.connect();
    try{
      const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
      return result.rows[0];
    } catch (err) {
      throw err
    } finally {
      client.release();
    }
  }

  static async findUserById(id) {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM users WHERE id = $1', [id]);
      return result.rows[0];
    } catch (err) {
      throw err;
    } finally{
      client.release();
    }
  }

  static async createUser(email, hashedPassword) {
    const client = await pool.connect();
    try {
      const result = await client.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, hashedPassword]);
      return result.rows[0];
    } catch (err){
      throw err;
    } finally {
      client.release();
    }
  }
}

module.exports = UserModel;