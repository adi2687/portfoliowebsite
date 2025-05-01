import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
// import ThemeToggle from './components/ThemeToggle';
import CustomCursor from './components/CustomCursor';
import AnimatedBackground from './components/AnimatedBackground';
import emailjs from 'emailjs-com';

function App() {
  useEffect(() => {
    // Initialize Email.js with your user ID (public key)
    // Email.js configuration
    // User ID has been updated to match the one in Contact.js
    emailjs.init('user_AbCdEfGhIjKlMnOpQrSt');
    
    // Add scroll reveal animation
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementPosition < windowHeight * 0.85) {
          element.classList.add('animate');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <AnimatedBackground />
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
      {/* <ThemeToggle /> */}
      <CustomCursor />
    </div>
  );
}

export default App;
