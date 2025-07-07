import React from 'react';
import './Footer.css';
import { FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="social-links">
          <a 
            href="https://www.linkedin.com/in/aditya-kurani" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
          >
            <FaLinkedin className="social-icon" />
          </a>
          <a 
            href="https://www.instagram.com/aditya_kurani_26/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
          >
            <FaInstagram className="social-icon" />
          </a>
          <a 
            href="https://x.com/AdityaKurani" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
          >
            <FaTwitter className="social-icon" />
          </a>
        </div>
        <p>Designed & Built by Aditya Kurani</p>
        <p className="copyright">&copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
