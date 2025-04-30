import React, { useState, useRef, useEffect } from 'react';
import emailjs from 'emailjs-com';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
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
    
    // Store the current form data for download option
    const submittedData = { ...formData };
    
    // Email.js configuration
    // You'll need to sign up at emailjs.com and replace these with your actual service ID, template ID, and user ID
    const serviceId = 'service_uet0wns'; // Your Email.js service ID
    const templateId = 'template_xyz123'; // Your Email.js template ID
    const userId = 'user_AbCdEfGhIjKlMnOpQrSt'; // Your Email.js user ID (Public Key)
    
    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      to_name: 'Aditya Kurani',  // Your name
      reply_to: formData.email,
      message: formData.message,
      subject: `Portfolio Contact: ${formData.name}`
    };
    
    // Send email using Email.js
    emailjs.send(serviceId, templateId, templateParams, userId)
      .then((response) => {
        console.log('Email sent successfully!', response);
        setFormStatus({ submitted: true, submitting: false, error: null });
        
        // Keep the submitted data available for download
        // but clear the form fields
        setFormData(submittedData);
        
        // Reset form status after 10 seconds
        setTimeout(() => {
          setFormStatus({ submitted: false, submitting: false, error: null });
          setFormData({ name: '', email: '', message: '' });
        }, 10000);
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        setFormStatus({ submitted: false, submitting: false, error: 'Failed to send email. Please try again later.' });
      });
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
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <a href="mailto:adityakurani26@gmail.com">adityakurani26@gmail.com</a>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <a href="tel:+919413230180">+91 9413230180</a>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>IIIT Nagpur, Maharashtra, India</span>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            {formStatus.submitted ? (
              <div className="form-success">
                <i className="fas fa-check-circle"></i>
                <h3>Thank you!</h3>
                <p>Your message has been sent successfully.</p>
                <button 
                  className="download-message-btn"
                  onClick={() => {
                    const messageText = `Name: ${formData.name}
Email: ${formData.email}
Message: ${formData.message}

Sent on: ${new Date().toLocaleString()}`;
                    const blob = new Blob([messageText], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'message_to_aditya.txt';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }}
                >
                  <i className="fas fa-download"></i>
                  Download a copy of your message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                {formStatus.error && (
                  <div className="form-error">
                    <i className="fas fa-exclamation-circle"></i>
                    <p>{formStatus.error}</p>
                  </div>
                )}
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
          <a href="https://github.com/adi2687" className="social-link" target="_blank" rel="noopener noreferrer" title="GitHub">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/aditya-kurani-818668176/" className="social-link" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://leetcode.com/u/aditya8798/" className="social-link" target="_blank" rel="noopener noreferrer" title="LeetCode">
            <i className="fas fa-code"></i>
          </a>
          <a href="mailto:adityakurani26@gmail.com" className="social-link" title="Email">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
