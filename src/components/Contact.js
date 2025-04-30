import React, { useState, useRef, useEffect } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    submitting: false,
    error: null
  });
  const contactRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ submitted: false, submitting: true, error: null });
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus({ submitted: true, submitting: false, error: null });
      setFormData({ name: '', email: '', message: '' });
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus({ submitted: false, submitting: false, error: null });
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="contact" ref={contactRef}>
      <div className="contact-background">
        <div className="contact-particles"></div>
      </div>
      <div className="contact-container">
        <h2 className="section-title">
          <span className="highlight">Get In Touch</span>
        </h2>
        
        <div className="contact-content">
          <div className="contact-text-container">
            <p className="contact-text">
              I'm currently looking for new opportunities and my inbox is always open.
              Whether you have a question, want to work together, or just want to say hello,
              I'll do my best to get back to you as soon as possible!
            </p>
            
            <div className="contact-info">
              <div className="contact-info-item">
                <i className="fas fa-envelope"></i>
                <a href="mailto:your.email@example.com">your.email@example.com</a>
              </div>
              <div className="contact-info-item">
                <i className="fas fa-phone"></i>
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </div>
              <div className="contact-info-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            {formStatus.submitted ? (
              <div className="form-success">
                <i className="fas fa-check-circle"></i>
                <h3>Thank you!</h3>
                <p>Your message has been sent successfully.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Your Email"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Your Message"
                    rows="5"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="submit-button"
                  disabled={formStatus.submitting}
                >
                  {formStatus.submitting ? (
                    <span className="loading-spinner">
                      <i className="fas fa-spinner fa-spin"></i>
                    </span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <i className="fas fa-paper-plane"></i>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
        
        <div className="social-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
