import React, { useState, createContext } from 'react';
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to track the authenticated user
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);
  
  // Function to handle user login
  const login = (userData) => {
    setUser(userData);
      // Store customer data in context state
      if (userData.customer && userData.customer.role === 'customer') {
        // Store customer data in context state
        setUserId(userData.customer.customerId);
        setUserEmail(userData.customer.email);
        setUserRole(userData.customer.role);
        setUserName(userData.customer.name)
        }
       if (userData.admin && userData.admin.role === 'admin') {
          // Store customer data in context state
          setUserId(userData.admin.adminId);
          setUserEmail(userData.admin.email);
          setUserRole(userData.admin.role);
          setUserName(userData.admin.name)
          }
      if (userData.driver &&userData.driver.role === 'driver') {
          // Store customer data in context state
          setUserId(userData.driver.driverId);
          setUserEmail(userData.driver.email);
          setUserRole(userData.driver.role);
          setUserName(userData.driver.name)
            }
      if (userData.busOperator && userData.busOperator.role === 'busOperator') {
           // Store customer data in context state
          setUserId(userData.busOperator.busOperatorId);
          setUserEmail(userData.busOperator.email);
          setUserRole(userData.busOperator.role);
          setUserName(userData.busOperator.name)
         }
  };

  // Function to handle user logout
  const logout = () => {
    setUser(null);
    setUserId(null);
    setUserEmail(null);
    setUserRole(null);
    setUserName(null);
  };

  // Provide the authentication context to child components
  return (
    <AuthContext.Provider value={{ userId, userEmail, userRole, userName, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
