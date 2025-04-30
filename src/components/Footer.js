import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>Designed & Built by Aditya Kurani</p>
        <p className="copyright">&copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
