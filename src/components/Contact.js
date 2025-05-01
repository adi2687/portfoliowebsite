import React from 'react';
import Form from './Form';
import './Contact.css';

const Contact = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Feel free to reach out to me for any questions or opportunities!</p>
          
          <div className="info-item">
            <i className="fas fa-envelope"></i>
            <div>
              <h3>Email</h3>
              <p>adityakurani26@gmail.com</p>
            </div>
          </div>

          

          <div className="info-item">
            <i className="fas fa-map-marker-alt"></i>
            <div>
              <h3>Location</h3>
              <p>Ajmer Rajasthan</p>
            </div>
          </div>
        </div>

        <div className="form-wrapper">
          <Form />
        </div>
      </div>
    </section>
  );
};

export default Contact;
