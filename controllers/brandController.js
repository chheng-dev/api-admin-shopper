const brandModel = require('../models/brandModel');
const multer = require('multer');
const { pool } = require('../config/db');


const createBrand = async (req, res) => {
  const basePath = `${req.protocol}://${req.get('host')}/public/upload/`;

  try {
    const { name, description } = req.body;
    const image = `${basePath}${req.file.filename}`; 
    
    const newBrand = await brandModel.createbrand(name, description, image);
    res.json(newBrand);
  } catch (err) {
    console.error('Error creating brand', err);
    res.status(500).json({ error: 'Internal Server Error'});
  }
}

const getBrandList = async (req, res) => {
  try {
    const brands = await brandModel.getBrandList();
    res.json(brands);
  } catch (err) {
    console.error('Error getting brands', err);
    res.status(500).json({ error: 'Internal Server Error '});
  }
}

const getBrandById = async (req, res) => {
  try {
    const id = req.params.id;
    const brand =  await brandModel.getBrandById(id);
    res.json(brand);
  } catch (err) {
    console.error('Error fetcing brand', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// const updateBrand = async (req, res) => {
//   const basePath = `${req.protocol}://${req.get('host')}/public/upload/`;

//   try {
//     const { id } = req.params;
//     const { name, description } = req.body;

//     const newImage = `${basePath}${req.file}` ? `${basePath}${req.file.filename}` : null;
//     console.log('hi', req.file.path);


//     const updatedBrand = await brandModel.updateBrand(id, name, description, newImage);
//     res.json(updatedBrand);
//   } catch (error) {
//     console.error('Error updating brand', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    let newImage = null;

    if (req.file) {
      const basePath = `${req.protocol}://${req.get('host')}/public/upload/`;
      newImage = `${basePath}${req.file.filename}`;
    }

    const updatedBrand = await brandModel.updateBrand(id, name, description, newImage);
    res.json(updatedBrand);
  } catch (error) {
    console.error('Error updating brand', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const id = req.params.id; 
    await brandModel.deleteBrand(id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  createBrand,
  getBrandList,
  deleteBrand,
  getBrandById,
  updateBrand
}