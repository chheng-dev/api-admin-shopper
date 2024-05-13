const { pool } = require('../config/db');

class AdminDataModel{
  static async getAdminDataByToken(token){
    console.log('token', token);
    const client = await pool.connect();
    try{
      const result = await client.query('SELECT * FROM admin_data WHERE token = $1', [token]);
      return result.rows;
    } catch(err){
      throw err;
    } finally {
      client.release();
    }
  }
}

module.exports = AdminDataModel; 