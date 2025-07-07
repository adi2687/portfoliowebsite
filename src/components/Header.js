import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [config, setConfig] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Fetch config data
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch(process.env.PUBLIC_URL + '/data/config.json');
        if (!response.ok) {
          throw new Error('Failed to load config');
        }
        const data = await response.json();
        setConfig(data);
      } catch (error) {
        console.error('Error loading config:', error);
      }
    };

    fetchConfig();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Determine active section based on scroll position
      const sections = ['home', 'about', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <div className="logo">
          <a href="#home" className="logo-link">
            <span className="logo-text">AK</span>
            <span className="logo-dot"></span>
          </a>
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            {['home', 'about', 'projects'].map((section, index) => (
              <li key={section} style={{animationDelay: `${index * 0.1}s`}}>
                <a 
                  href={`#${section}`} 
                  className={`nav-link ${activeSection === section ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  {/* <span className="nav-number">0{index + 1}.</span> */}
                  <span className="nav-text">{section.charAt(0).toUpperCase() + section.slice(1)}</span>
                  <span className="nav-line"></span>
                </a>
              </li>
            ))}
          </ul>
          
          <a href="#contact" className="resume-button" onClick={closeMenu}>
            <span>Get In Touch</span>
            <i className="fas fa-paper-plane"></i>
          </a>
          <a href={`/${config.resumeFilename}`} className="resume-button" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
            <span>Resume</span>
            <i className="fas fa-file-pdf"></i>
          </a>
        </nav>
        
        <div 
          className={`mobile-nav-toggle ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      
      {isMenuOpen && <div className="overlay" onClick={closeMenu}></div>}
    </header>
  );
};

export default Header;
