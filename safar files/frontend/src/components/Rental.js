import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus,faUser, faCar, faStar, faMoneyBill, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from './AuthProvider'; // Import the AuthContext

function BusDetailsComponent() {
  const [busDetailsList, setBusDetailsList] = useState([]); // State to hold the list of bus details
  const [numberOfDays, setNumberOfDays] = useState(1); // State to hold the number of days for renting
  const [totalPrice, setTotalPrice] = useState(0); // State to hold the total price

  const { userName, userEmail } = useContext(AuthContext); // Access userName and userEmail from AuthContext

  const handleRentClick = async (busDetails) => {
    try {
      if (!userName || !userEmail) {
        alert('Please login to rent a bus.');
        return;
      }

      const response = await axios.post('/api/customer/rentBus', {
        busDetails,
        numberOfDays,
        userName,
        userEmail,
        // Add more data as needed
      });
      console.log('Rent bus response:', response.data);
      // Handle further actions based on the response (e.g., show confirmation message)
    } catch (error) {
      console.error('Error renting bus:', error);
      // Handle error
    }
  };

  useEffect(() => {
    // Fetch bus details from the server
    async function fetchBusDetails() {
      try {
        const response = await axios.get('/api/customer/allBusDetails'); // Assuming this endpoint returns an array of bus details
        setBusDetailsList(response.data);
      } catch (error) {
        console.error('Error fetching bus details:', error);
        // Handle error
      }
    }
    fetchBusDetails(); // Call the function to fetch bus details
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  // Function to handle change in number of days input
  const handleDaysChange = (e) => {
    const days = parseInt(e.target.value);
    setNumberOfDays(days);
    // Calculate total price based on number of days and price per day
    setTotalPrice(days * busDetailsList[0].price); // Assuming busDetailsList is not empty
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Rental Bus Details</h2>
      {busDetailsList.map((busDetails, index) => (
        <div key={index} className="card mb-3" style={{ backgroundColor: '#f0f0f0' }}>
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h5 className="card-title"><FontAwesomeIcon icon={faBus} size="5x" /> Reg. Number:  {busDetails.registrationNumber}</h5>
              </div>
              <div className="col">
                <p className="card-text"><FontAwesomeIcon icon={faStar} /> Rating: {busDetails.rating}</p>
                <p className="card-text">Availability: {busDetails.availability ? 'Available' : 'Not Available'}</p>
                <p className="card-text"><FontAwesomeIcon icon={faMoneyBill} /> Price: Rupees 1500/day {busDetails.price}</p>
                {/* Include other properties as needed */}
                <div className="form-group mt-3">
                  <label htmlFor="numberOfDays">Number of Days</label>
                  <input type="number" className="form-control" id="numberOfDays" value={numberOfDays} onChange={handleDaysChange} />
                </div>
              </div>
            </div>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><FontAwesomeIcon icon={faCar} /> Model: {busDetails.model} <FontAwesomeIcon icon={faUser} /> Capacity: {busDetails.capacity}</li>
          </ul>
          <div className="card-body">
            <button className="btn btn-primary" onClick={() => handleRentClick(busDetails)}><FontAwesomeIcon icon={faClipboardCheck} /> Rent Bus</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BusDetailsComponent;
