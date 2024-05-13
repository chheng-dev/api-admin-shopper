const AdminDataModel = require('../models/AdminDataModel');

class AdminDataController {
  static async fectAdminData(req, res){
    const token = req.headers.authorization.split(' ')[1]; 
    console.log('token', req.headers.authorization);
    try {
      const adminData = await AdminDataModel.getAdminDataByToken(token);
      res.json(adminData);
    } catch(err){
      console.error('Error fetching admin data:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = AdminDataController;