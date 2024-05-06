import React, { useState } from "react";
import "./about_us.css"; // Assuming you have a separate CSS file



const AboutUs = () => {
  // Company description
  const companyDescription = `Safar is a pioneering transportation service provider dedicated to revolutionizing the way people commute and travel across cities. Established with a vision to offer convenient, reliable, and affordable transportation solutions, Safar caters to both individual commuters and event organizers, offering a range of services tailored to meet diverse needs. Safar facilitates hassle-free booking of local buses for day-to-day travel needs, offers private bus hire services for special events, provides a platform for bus owners to maximize their business potential, and offers a convenient pass system for regular commuters.`;

  // Future goals
  const futureGoals = `Looking ahead, Safar aims to expand its services to new cities and regions, providing seamless transportation options to an even broader audience. We are committed to enhancing our technology infrastructure, improving user experiences, and promoting sustainable transportation solutions. Our goal is to become the leading transportation service provider, setting new standards for convenience, reliability, and affordability.`;

  // State to manage visibility of future goals
  const [showFutureGoals, setShowFutureGoals] = useState(false);
  // Replace with your team member information
  const teamMembers = [
    {
      name: "Tushar Patil",
      title: "CEO",
      bio: "Experienced leader with a passion for innovation.",
      image: require("./tushar.png"), // Replace with actual image path
    },
    {
      name: "Leander",
      title: "CTO",
      bio: "Technology enthusiast with a knack for problem-solving.",
      image: require("./leander.png"), // Replace with actual image path
    },
    {
      name: "Sumit Sharma",
      title: "COO",
      bio: "Strategic thinker focused on operational excellence.",
      image: require("./sumit.png"), // Replace with actual image path
    },
    {
      name: "claton",
      title: "CMO",
      bio: "Creative marketer with a flair for storytelling",
     // image: require("./sumit.png"), // Replace with actual image path
    },
    
    {
      name: "Irfan Shaikh",
      title: "Marketing Director",
      bio: "Creative marketer with a flair for storytelling.",
      image: require("./irfan.png"), // Replace with actual image path
    },
    {
      name: "Sammer Khaji",
      title: "HR Manager",
      bio: "People-oriented professional dedicated to employee well-being.",
      // image: require("./team-member-5.jpg"), // Replace with actual image path
    },
  ];

  return (
    <section className="about-us">
      {/* Add your logo here */}
      <div className="logo-container">
        <img src="./safarlogo.png" alt="Safar Logo" />
      </div>
      <h3>About Safar</h3>
      <p>{companyDescription}</p>

      <h3>Future Goals</h3>
      <p>{futureGoals}</p>

      <h3>Management Team</h3>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <div className="team-member" key={index}>
            <img src={member.image} alt={member.name} />
            <h4>{member.name}</h4>
            <p>{member.title}</p>
            <p>{member.bio}</p>
          </div>
        ))}
      </div>
      <div>
      </div>
    </section>
  );
};

export default AboutUs;
