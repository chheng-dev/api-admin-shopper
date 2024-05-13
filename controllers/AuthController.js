const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


class AuthController {
  static async signup(req, res){
    const {firstname, lastname, email, password, confirm_password} = req.body;
    try {
      // const existingUser = await UserModel.getUserByEmail(email);
      // if(existingUser) {
      //     return res.status(400).json({ message: 'User already exists'});
      // }

      // const hashedPassword = bcrypt.hashSync(password, 10);
      // const hashedConfirmPassword = bcrypt.hashSync(confirm_password, 10);

      // await UserModel.createUser(firstname, lastname, email, hashedPassword, hashedConfirmPassword);
      // res.status(201).json({ message: 'User creatd successfully'});
      const userId = await UserModel.createUser(firstname, lastname, email, password, confirm_password);
      res.status(201).json({ userId });
    } catch(err){
      console.error('Sign-in error:', err);
      res.status(500).json({ message: "Internal Server Error"});
    }
  }

  static async signin(req, res){
    const secretKey = crypto.randomBytes(32).toString('hex');
    const { email, password } = req.body;
    try {
      const user = await UserModel.getUserByEmail(email);
      if(!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ userId: user.userId }, secretKey,{ expiresIn: '1h' });
      res.json({ token });
    } catch(err) {
      console.log('Sign-in error:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = AuthController;
