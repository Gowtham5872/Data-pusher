
exports.isAdmin = async (req, res, next) => {
    try {
      const role = req.user.role; 
      if (!role || role !== 'Admin') {
        return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
      }
      next();
    } catch (err) {
      res.status(500).json({ success: false, message: 'Role check failed' });
    }
  };
  
  
  exports.isAdminOrUser = async (req, res, next) => {
    try {
      const role = req.user.role;
      if (!role || (role !== 'Admin' && role !== 'User')) {
        return res.status(403).json({ success: false, message: 'Access denied' });
      }
      next();
    } catch (err) {
      res.status(500).json({ success: false, message: 'Role check failed' });
    }
  };
  