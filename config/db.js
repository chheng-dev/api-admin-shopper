require('dotenv').config();

const fs = require('fs');
const { Pool } = require('pg');


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

const excuteSqlScript = async (scriptPath) => {
  try {
    const sqlScript = fs.readFileSync(scriptPath, 'utf8');
    console.log(sqlScript);
    await pool.query(sqlScript);
    console.log('SQL script excuting successfully.');
  } catch (err) {
    console.log('Error excuting SQL:', err);
  }
}


module.exports = { pool, excuteSqlScript };