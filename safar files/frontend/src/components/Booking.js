import React, { useState, useContext } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faStar, faMoneyBill, faCar, faUser, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from './AuthProvider'; // Import the AuthContext

function BusBookingComponent() {
  const [selectedRoute, setSelectedRoute] = useState('');
  const [busResults, setBusResults] = useState(null); // State to hold the bus search results
  const [totalPrice, setTotalPrice] = useState(0);
  const [seatsCount, setSeatsCount] = useState(0);
  const { userName, userEmail } = useContext(AuthContext); // Access userName and userEmail from AuthContext

  const routes = [
    { _id: '662bb99d165cec54ecfc7f9d', name: 'Panaji , Ponda & back' },
    { _id: '662bb99d165cec54ecfc7fa0', name: 'Panaji - Calangute Beach & back' },
    { _id: '662bb99d165cec54ecfc7fa3', name: 'Margao - Colva Beach & back' },
    { _id: '662bb99d165cec54ecfc7fa6', name: 'Panaji - Dona Paula - Bambolim GMC & back' },
    { _id: '662bb99d165cec54ecfc7fa9', name: 'Panaji - Dona Paula & back' },
    { _id: '662bb99d165cec54ecfc7fac', name: 'Mapusa - Chapora Beach & back' },
    { _id: '662bb99d165cec54ecfc7faf', name: 'Mapusa - Thivim Railway Stn (Sirsaim) & back' },
    { _id: '662bb99d165cec54ecfc7fb2', name: 'Mapusa - Pernem & back' },
    { _id: '662bb99d165cec54ecfc7fb5', name: 'Mapusa - Panaji & back' },
    { _id: '662bb99d165cec54ecfc7fb8', name: 'Mapusa - Panaji Express & back' },
  ];

  const handleRouteChange = (e) => {
    setSelectedRoute(e.target.value);
  };

  const handleGetBuses = async () => {
    try {
      if (selectedRoute) {
        const response = await axios.post("/api/customer/busAndRouteDetails", { routeId: selectedRoute });
        const { busDetails, routeDetails } = response.data;
        console.log('Bus Details:', busDetails);
        console.log('Route Details:', routeDetails);
        setBusResults({ busDetails, routeDetails }); // Update state with the retrieved bus and route details
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching bus details. Please try again later.");
    }
  };

  const handleBookClick = async () => {
    if (!userName || !userEmail) {
      alert("Please enter your name and email.");
      return;
    }

    if (seatsCount <= 0) {
      alert("Please enter a valid number of seats.");
      return;
    }

    if (totalPrice <= 0) {
      alert("Total price cannot be zero.");
      return;
    }

    try {
      const bookingData = {
        userName: userName,
        userEmail: userEmail,
        seatsCount: seatsCount,
        totalPrice: totalPrice,
        busDetails: busResults.busDetails, // Send bus details along with the booking data
        routeDetails: busResults.routeDetails // Send route details along with the booking data
      };
  
      // Make a POST request to your backend API to handle the booking logic
      const response = await axios.post("/api/bookings", bookingData);
  
      // Handle success response from the server
      alert("Booking successful!");
      // Optionally, you can reset state or navigate to another page after successful booking
    } catch (error) {
      console.error("Error:", error);
      alert("Error processing booking. Please try again later.");
    }

    // Handle booking logic here
  };

  const handleSeatsChange = (e) => {
    const count = parseInt(e.target.value);
    if (!isNaN(count)) {
      setSeatsCount(count);
      setTotalPrice(count * (busResults?.busDetails[0]?.Price || 0)); // Access Price from busResults safely
    } else {
      setSeatsCount(0);
      setTotalPrice(0);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Bus Booking</h2>
      <div className="row">
        <div className="col-md-6">
          <label htmlFor="routeSelect" className="form-label">Select Route:</label>
          <select id="routeSelect" className="form-select" onChange={handleRouteChange} value={selectedRoute}>
            <option value="">Select Route</option>
            {routes.map(route => (
              <option key={route._id} value={route._id}>{route.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6 d-flex align-items-end">
          <button className="btn btn-primary" onClick={handleGetBuses}>Get Buses</button>
        </div>
      </div>

      {/* Conditionally render bus results */}
      {busResults && (
        <div className="mt-5">
          <h2>Bus Results</h2>
          {busResults.busDetails.map(bus => (
            <div key={bus.busId} className="card mt-3">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <FontAwesomeIcon icon={faBus} size="6x" style={{ marginRight: '10px' }} />
                  <div>
                    <h5 className="card-title">Registration Number: {bus.registrationNumber}</h5>
                    <p className="card-text"><FontAwesomeIcon icon={faStar} /> Rating: {bus.rating}</p>
                    <p className="card-text">Availability: {bus.availability ? 'Available' : 'Not Available'}</p>
                    <p className="card-text"><FontAwesomeIcon icon={faMoneyBill} /> Price: Rupees {bus.Price}</p>
                  </div>
                </div>
                <button className="btn btn-primary" onClick={handleBookClick} >
                  <FontAwesomeIcon icon={faClipboardCheck} /> Book Ticket
                </button>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><FontAwesomeIcon icon={faCar} /> Model: {bus.model}</li>
                <li className="list-group-item"><FontAwesomeIcon icon={faUser} /> Capacity: {bus.capacity}</li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Route Name: {busResults.routeDetails.name}</span>
                  <span>Source: {busResults.routeDetails.source}</span>
                  <span>Destination: {busResults.routeDetails.destination}</span>
                </li>
                <li className="list-group-item">Stops: {busResults.routeDetails.stops.join(', ')}</li>
              </ul>
              <div className="card-footer">
                <label htmlFor="seatsCount" className="form-label">Number of Seats:</label>
                <input type="number" id="seatsCount" className="form-control" value={seatsCount} onChange={handleSeatsChange} />
                <p>Total Price: Rupees {totalPrice}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BusBookingComponent;
