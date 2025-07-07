import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';
// Data will be loaded from the public directory
import FloatingShapes from './FloatingShapes';
import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const Hero = () => {
  const nameRef = useRef(null);
  const taglineRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);

  const [hero, setHero] = useState({ description: 'Loading...' });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch(process.env.PUBLIC_URL + '/data/hero.json');
        if (!response.ok) {
          throw new Error('Failed to load hero data');
        }
        const data = await response.json();
        console.log('Hero data loaded:', data);
        setHero(data);
      } catch (error) {
        console.error('Error loading hero data:', error);
      }
    };

    fetchHeroData();

    const handleStorageChange = () => {
      fetchHeroData();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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

    const elements = [nameRef.current, taglineRef.current, descriptionRef.current, ctaRef.current];
    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="gradient-overlay"></div>
        <div className="particles"></div>
        <FloatingShapes />
      </div>
      <div className="hero-content">
        <div className="hero-image-container">
          <div className="hero-image-wrapper">
            <img 
              src="/mypic.jpeg" 
              alt="Aditya Kurani" 
              className="hero-image"
            />
            <div className="image-frame"></div>
          </div>
        </div>
        <div className="hero-text">
          <p className="intro animate-on-scroll">Hi, I'm</p>
          <h1 className="name animate-on-scroll" ref={nameRef}>
            <span className="highlight">Aditya</span> Kurani
          </h1>
          <h2 className="tagline animate-on-scroll" ref={taglineRef}>
            <span className="typing-text">Computer Science Student & Developer</span>
          </h2>
          <div className="description animate-on-scroll" ref={descriptionRef}>
            <p>{hero.description}</p>
          </div>
          <div className="cta-buttons animate-on-scroll" ref={ctaRef}>
            <a href="#projects" className="cta-button primary">
              <span>View My Projects</span>
              <i className="fas fa-arrow-right"></i>
            </a>
            <a href="https://github.com/adi2687" target="_blank" rel="noopener noreferrer" className="cta-button secondary">
              <span>GitHub Profile</span>
              <i className="fab fa-github"></i>
            </a>
            <a href="#contact" className="cta-button tertiary">
              <span>Contact Me</span>
              <i className="fas fa-envelope"></i>
            </a>
          </div>
          <div className="social-links animate-on-scroll">
            <a href="https://www.linkedin.com/in/aditya-kurani-818668176/" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaLinkedin className="social-icon" />
            </a>
            <a href="https://x.com/AdityaKurani" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaTwitter className="social-icon" />
            </a>
            <a href="https://www.instagram.com/aditya_kurani_26/" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaInstagram className="social-icon" />
            </a>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <span className="scroll-text">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
