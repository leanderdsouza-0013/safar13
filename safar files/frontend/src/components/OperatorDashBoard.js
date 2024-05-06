import React, { useState } from 'react';
import AddDriverForm from './AddDriverForm'; // Import the component for adding drivers

const OperatorDashboard = () => {
  const [showAddDriver, setShowAddDriver] = useState(false);
  const [showAddBus, setShowAddBus] = useState(false);


  return (
    <div>
      <h2>Operator Dashboard</h2>
      <hr />

      <div className="container mt-4">
        {/* Buttons to toggle different sections */}
        <div className="row">
          <div className="col-md-6">
            <button className="btn btn-primary mb-3" onClick={() => setShowAddDriver(!showAddDriver)}>
              {showAddDriver ? 'Hide Add Driver Form' : 'Add Driver'}
            </button>
          </div>
          <div className="col-md-6">
            <button className="btn btn-primary mb-3" onClick={() => setShowAddBus(!showAddBus)}>
              {showAddBus ? 'Hide Add Bus Form' : 'Add Bus'}
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <button className="btn btn-primary mb-3" >
             
            </button>
          </div>
          <div className="col-md-6">
            <button className="btn btn-primary mb-3" >
             
            </button>
          </div>
        </div>
      </div>

      {/* Conditional rendering based on button toggles */}
      {showAddDriver && <AddDriverForm />}

    </div>
  );
};

export default OperatorDashboard;
