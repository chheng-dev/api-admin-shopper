const { pool } = require('../config/db');
const fs = require('fs');
const path = require('path');


const createbrand = async (name,description, image) => {
  const client = await pool.connect();
  try {
    const result = await client.query('INSERT INTO brands (name, description, image) VALUES ($1, $2, $3) RETURNING *', [name, description, image]);
    return result.rows[0];
  } catch (err) {
    console.log('Error excuting query', err);
    throw err;
  } finally {
    client.release();
  }
}

const getBrandList = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM brands');
    return result.rows;
  } catch (err) {
    console.error('Error excuting query', err);
    throw err;
  } finally {
    client.release();  
  }
}

const getBrandById = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM brands WHERE id = $1', [id]);
    return result.rows[0];
  } catch (err) {
    console.error('Error excuting query', err);
    throw err;
  } finally {
    client.release();
  }
}

const updateBrand = async (id, name, description, newImage) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT image FROM brands WHERE id = $1', [id]);
      
    if (result.rows.length === 0) {
      throw new Error('Brand not found');
    }

    let updateQuery, updateValues;

    if (newImage) {
      updateQuery = 'UPDATE brands SET name = $1, description = $2, image = $3 WHERE id = $4 RETURNING *';
      updateValues = [name, description, newImage, id];
    } else {
      updateQuery = 'UPDATE brands SET name = $1, description = $2 WHERE id = $3 RETURNING *';
      updateValues = [name, description, id];
    }

    const updateBrand = await client.query(updateQuery, updateValues);

    return updateBrand.rows[0];
  } catch (err) {
    console.error('Error executing query', err);
    throw err;
  } finally {
    client.release();
  }
};


const deleteBrand = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT image FROM brands WHERE id = $1', [id]);
    if(result.rows.length === 0){
      throw new Error('Brand not found');
    }

    const imageFilename = result.rows[0].image;

    await client.query('DELETE FROM brands WHERE id = $1', [id]);

    if(imageFilename){
      fs.unlinkSync(`public/upload/${imageFilename}`);
    }

    return { message: 'Brand has been deleted' }

  } catch (err) {
    console.error('Error excuting query', err);
    throw err;
  } finally {
    client.release();
  }
}


module.exports = {
  createbrand,
  getBrandList,
  deleteBrand,
  getBrandById,
  updateBrand
}