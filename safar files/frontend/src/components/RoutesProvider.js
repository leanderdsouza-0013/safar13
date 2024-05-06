import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoutesContext = React.createContext(); // Create a context for global route details

function RoutesProvider({ children }) {
  const [routes, setRoutes] = useState(null); // State to hold the route details

  useEffect(() => {
    // Fetch route details from the server
    async function fetchRoutes() {
      try {
        const response = await axios.get('/api/customer/routes');
        setRoutes(response.data);
      } catch (error) {
        console.error('Error fetching routes:', error);
        // Handle error
      }
    }

    fetchRoutes(); // Call the function to fetch route details
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  return (
    <RoutesContext.Provider value={routes}>
      {children}
    </RoutesContext.Provider>
  );
}

function useRoutes() {
  const context = React.useContext(RoutesContext);
  if (!context) {
    throw new Error('useRoutes must be used within a RoutesProvider');
  }
  return context;
}

export { RoutesProvider, useRoutes };
