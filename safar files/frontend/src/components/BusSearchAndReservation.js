import React from 'react';

const SearchBusForm = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Search Buses</h5>
              <form>
                <div className="mb-3">
                  <label htmlFor="route" className="form-label">Route</label>
                  <input type="text" className="form-control" id="route" placeholder="Enter route" />
                </div>
                <div className="mb-3">
                  <label htmlFor="startStop" className="form-label">Start Stop</label>
                  <input type="text" className="form-control" id="startStop" placeholder="Enter start stop" />
                </div>
                <div className="mb-3">
                  <label htmlFor="endStop" className="form-label">End Stop</label>
                  <input type="text" className="form-control" id="endStop" placeholder="Enter end stop" />
                </div>
                <button type="submit" className="btn btn-primary">Search</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReserveBusTile = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Reserve Bus</h5>
              <p className="card-text">Tap here to reserve a bus.</p>
              <a href="/reserve-bus" className="btn btn-primary">Reserve</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const BusSearchAndReservation = () => {
    return (
      <div>
        <SearchBusForm />
        <ReserveBusTile />
      </div>
    );
  };

export default BusSearchAndReservation;
