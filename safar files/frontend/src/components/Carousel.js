import React, { useEffect, useState } from "react";
import Carouseldata from "../components/Data/CarouselData";
import "./HomePage.css"; // Assuming styles are defined here
import logo from "../components/images/logobus.png";
import { Link } from "react-router-dom"; // Import Link from React Router

const Carousel = () => {
  const [num, setNum] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNum((prevNum) => (prevNum + 1) % Carouseldata.length);
    }, 4000);

    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  return (
    <>
      <div id="carouselExampleCaptions" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {Carouseldata.map((item, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={index}
              className={index === num ? "active" : ""}
              aria-current={index === num ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {Carouseldata.map((item, index) => (
            <div key={index} className={`carousel-item ${index === num ? "active" : ""}`}>
              <img src={item.imgurl} className="d-block w-100" alt={item.alt} />
              <div className="carousel-caption d-none d-md-block">
                <h5>{item.line1}</h5>
                <p>{item.line2}</p>
                <p>{item.line3}</p>
                <Link to="/services">
                  <button className="Carousel-text-btn register-btn">View services</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Carousel;
