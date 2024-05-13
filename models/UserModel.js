const { Pool, pool } = require('../config/db');
const bcrypt = require('bcryptjs');

class UserModel{
  static async createUser(firstname, lastname, email, password, confirm_password){
    const client = await pool.connect();
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const hashedConfirmPassword = await bcrypt.hash(confirm_password, 10);

      const result = await client.query('INSERT INTO users (firstname, lastname, email, password, confirm_password) VALUES ($1, $2, $3, $4, $5) RETURNING user_id',[firstname, lastname, email, hashedPassword, hashedConfirmPassword]);
      return result.rows[0].user_id;

    } catch(err){
      console.log('Error excuting query', err);
      throw err;
    } finally {
      client.release();
    }
  }

  static async getUserByEmail(email){
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
      return result.rows[0];
    } catch(err){
      console.log('Email and password not match')
      throw err;
    } finally {
      client.release();
    }
  }

}

module.exports = UserModel;