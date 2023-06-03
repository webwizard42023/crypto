import React from 'react';


const AboutUs = () => {
  return (
    <div className="about-us">
      <h1 className="title">About Us</h1>
      <p className="description">
        We are a team of passionate individuals who are dedicated to delivering high-quality products and services to our clients.
      </p>
      <div className="team">
        <h2 className="team-title">Meet Our Team</h2>
        <div className="team-member">
          
          <h3 className="member-name">John Doe</h3>
          <p className="member-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div className="team-member">
         
          <h3 className="member-name">Jane Doe</h3>
          <p className="member-description">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
