import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';


const Dashboard = () => {
  // Access the authentication context
  const { user } = useContext(AuthContext);

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">
            Welcome to the Dashboard, {user ? user.username : 'Guest'}!
          </h2>
          {user && (
            <div>
              <p className="card-text">Name: {user.name}</p>
              <p className="card-text">Email: {user.email}</p>
              {/* Display other user information */}
            </div>
          )}
        </div>
      </div>

    </div>
    
  );

  
};

export default Dashboard;
