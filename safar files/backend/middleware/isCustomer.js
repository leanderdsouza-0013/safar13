// middleware/isCustomer.js

const isCustomer = (req, res, next) => {
    const userRole = req.user.role; // Assuming the user's role is included in the request object
    if (userRole === 'customer') {
      next(); // User is a customer, allow access to the route
    } else {
      res.status(403).json({ message: 'Unauthorized access' }); // User is not a customer, deny access
    }
  };
  
  module.exports = isCustomer;
  