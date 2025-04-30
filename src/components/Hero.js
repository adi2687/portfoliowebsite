import React, { useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
  const nameRef = useRef(null);
  const taglineRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);

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
      </div>
      <div className="hero-content">
        <p className="intro animate">Hi, my name is</p>
        <h1 className="name" ref={nameRef}>Aditya Kurani.</h1>
        <h2 className="tagline" ref={taglineRef}>I build exceptional digital experiences.</h2>
        <div className="description" ref={descriptionRef}>
          <p>
            I'm a passionate software developer with expertise in creating innovative web applications.
            My focus is on crafting intuitive, responsive, and high-performance solutions that solve real-world problems.
          </p>
        </div>
        <div className="cta-buttons" ref={ctaRef}>
          <a href="#projects" className="primary-btn">
            <span>View My Work</span>
            <i className="fas fa-arrow-right"></i>
          </a>
          <a href="#contact" className="secondary-btn">
            <span>Contact Me</span>
          </a>
        </div>
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div>
            <span className="scroll-text">Scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
