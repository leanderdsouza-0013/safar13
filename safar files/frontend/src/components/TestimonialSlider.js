import React, { useState, useEffect } from "react";
import "./TestimonialSlider.css"; // Import your CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const TestimonialSlider = ({ testimonialsData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === testimonialsData.length - 1 ? 0 : prevSlide + 1
      );
    }, 4000); // Adjust the interval time as needed

    return () => clearInterval(interval); // Clear interval on unmount
  }, [testimonialsData.length]);

  const handleAddTestimonial = () => {
    // Add logic to add a new testimonial
    console.log("Adding a new testimonial...");
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? testimonialsData.length - 1 : prevSlide - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === testimonialsData.length - 1 ? 0 : prevSlide + 1
    );
  };

  return (
    <div className="testimonial-slider">
      {/* Display current slide */}
      <div className="testimonial">
        <div className="testimonial-content">
          <img
            src={testimonialsData[currentSlide].image}
            alt={testimonialsData[currentSlide].name}
            className="testimonial-image"
          />
          <p className="testimonial-name">
            {testimonialsData[currentSlide].name}
          </p>
          <p className="testimonial-company">
            {testimonialsData[currentSlide].username}
          </p>
          <p className="testimonial-rating">
            Rating: {testimonialsData[currentSlide].rating}
          </p>
          <p className="testimonial-comment">
            {testimonialsData[currentSlide].comment}
          </p>
        </div>
      </div>
      {/* Add testimonial buttons */}
      <div className="testimonial-buttons">
        <button className="view-more-button" onClick={prevSlide}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className="add-testimonial-button" onClick={handleAddTestimonial}>
          Share Your Experience
        </button>
        <button className="view-more-button" onClick={nextSlide}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

// Default testimonial data
TestimonialSlider.defaultProps = {
  testimonialsData: [
    {
      name: "John Doe",
      username: "johndoe123",
      rating: 5,
      comment: "Great service. Had a great experience.",
      image: require("./tushar.png"), // Replace with the correct image path
    },
    {
      name: "Jane Smith",
      username: "janesmith456",
      rating: 4,
      comment: "Good and hassle-free service. Had a great time.",
      image: require("./irfan.png"), // Replace with the correct image path
    },
  ],
};

export default TestimonialSlider;
