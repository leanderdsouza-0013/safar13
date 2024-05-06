
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BusDetailsComponent() {
  const [busDetails, setBusDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch bus details when component mounts
    fetchBusDetails();
  }, []);

  const fetchBusDetails = async () => {
    try {
      // Fetch bus details from the backend API
      const response = await axios.get('/api/busDetails');
      setBusDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bus details:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Bus Details</h2>
      {loading && <p>Loading bus details...</p>}
      {!loading && !busDetails && <p>No bus details available</p>}
      {!loading && busDetails && (
        <div>
          <h3>Bus Number: {busDetails.busNumber}</h3>
          <p>Model: {busDetails.model}</p>
          <p>Capacity: {busDetails.capacity}</p>
          <p>Route: {busDetails.route.name}</p>
          <p>Stops:</p>
          <ul>
            {busDetails.route.stops.map((stop, index) => (
              <li key={index}>{stop}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BusDetailsComponent;
