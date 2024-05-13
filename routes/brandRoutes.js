const express = require('express');
const router = express.Router();
const multer = require('multer');
const brandController = require('../controllers/brandController');

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, 'public/upload/')
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/brand', upload.single('image'), brandController.createBrand);
router.get('/brands', brandController.getBrandList);
router.delete('/brand/:id', brandController.deleteBrand);
router.get('/brand/:id', brandController.getBrandById);
router.put('/brand/:id', upload.single('image'), brandController.updateBrand);


module.exports = router;