const UserModel = require('../models/User')

class UserController {
  static async getUserInfo(req, res){
    try {
      const user = await UserModel.findUserById(req.user);

      if(!user) {
        return res.status(404).json({ message: 'User not found'});
      }
      res.json(user);

    } catch(err){
      console.error('Error getting products', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = UserController;