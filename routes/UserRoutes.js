const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/AuthMiddleware');
const userController = require('../controllers/UserController');

router.get('/info', authMiddleware, userController.getUserInfo);
router.get('/admin', authMiddleware, (req, res) => {
  res.json({ message: 'Welcome to the admin area' });
});

module.exports = router;
