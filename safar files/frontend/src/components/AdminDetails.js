import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDetails = () => {
  const [adminDetails, setAdminDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await axios.get("/api/admin/adminDetails");
        setAdminDetails(response.data.adminDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin details:", error);
        setError("Error fetching admin details");
        setLoading(false);
      }
    };

    fetchAdminDetails();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2 className="mb-4">Admin Details</h2>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>Admin ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {adminDetails.map(admin => (
            <tr key={admin.adminId}>
              <td>{admin.adminId}</td>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDetails;
