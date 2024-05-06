import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OperatorDetails = () => {
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOperators = async () => {
    try {
      const response = await axios.get("/api/admin/bus_operators");
      setOperators(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching operators:", error);
      setError("Error fetching operators");
      setLoading(false);
    }
  };

  const handleDeactivateOperator = async (Id) => {
    try {
      await axios.put(`/api/admin/bus_operators/deactivate/${Id}`);
      // Fetch updated operator details after deactivation
      fetchOperators();
    } catch (error) {
      console.error("Error deactivating operator:", error);
      setError("Error deactivating operator");
    }
  };

  const handleActivateOperator = async (Id) => {
    try {
      await axios.put(`/api/admin/bus_operators/activate/${Id}`);
      // Fetch updated operator details after activation
      fetchOperators();
    } catch (error) {
      console.error("Error activating operator:", error);
      setError("Error activating operator");
    }
  };

  useEffect(() => {
    fetchOperators();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Operator Details</h2>
      {operators.map(operatorGroup => (
        <div key={operatorGroup._id}>
          <h3>{operatorGroup._id}</h3>
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Account Status</th>
                <th>Buses</th>
                <th>Drivers</th>
                <th>Action</th> {/* Added Action column */}
              </tr>
            </thead>
            <tbody>
              {operatorGroup.operators.map(operator => (
                <tr key={operator.busOperatorId}>
                  <td>{operator.Id}</td>
                  <td>{operator.name}</td>
                  <td>{operator.email}</td>
                  <td>{operator.phone}</td>
                  <td>{operator.accountStatus}</td>
                  <td>
                    <ul>
                      {operator.buses.map(bus => (
                        <li key={bus.busId}>
                          {bus.type} - {bus.registrationNumber}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul>
                      {operator.drivers.map(driver => (
                        <li key={driver.driverId}>
                          {driver.name} - {driver.license}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    {/* Deactivate operator button */}
                    {operator.accountStatus === 'deactivated' ? (
                      <button
                        className="btn btn-success"
                        onClick={() => handleActivateOperator(operator.busOperatorId)}
                      >
                        Activate
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeactivateOperator(operator.busOperatorId)}
                      >
                        Deactivate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default OperatorDetails;
