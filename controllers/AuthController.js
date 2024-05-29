const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const UserModel = require('../models/User');

class AuthController {
  static async register(req, res){
    const {email, password} = req.body;
    
    try{
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await UserModel.createUser(email, hashedPassword);
      res.status(201).json(user);
    } catch (err){
      res.status(500).json({ error: err.message });
    }
  }

  static async login (req, res) {
    const {email, password} = req.body;
    try {
      const user = await UserModel.findUserbyEmail(email);
      if(!user) {
        return res.status(400).json({ error: 'Invalid credentials'});
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials'});
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {expiresIn: '1h'});
      res.send({ token });
    } catch (err){
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = AuthController;
