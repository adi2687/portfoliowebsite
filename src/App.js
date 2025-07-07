import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import JsonEditor from './components/JsonEditor';
// import ThemeToggle from './components/ThemeToggle';
import CustomCursor from './components/CustomCursor';
import AnimatedBackground from './components/AnimatedBackground';
import emailjs from 'emailjs-com';

// Main App component
function App() {
  useEffect(() => {
    // Initialize Email.js with your user ID (public key)
    // Email.js configuration
    // User ID has been updated to match the one in Contact.js
    emailjs.init('user_AbCdEfGhIjKlMnOpQrSt');
    
    // Load local storage data if available
    const loadLocalData = async () => {
      const files = ['projects', 'awards', 'skills', 'about', 'hero', 'config'];
      files.forEach(file => {
        const data = localStorage.getItem(`portfolio_${file}.json`);
        if (data) {
          // In a real app, you would send this to your backend
          console.log(`Loaded ${file} from local storage`);
        }
      });
    };
    
    loadLocalData();
    
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
    <Router>
      <Routes>
        <Route path="/edit/:file?" element={
          <div className="App">
            <JsonEditor />
          </div>
        } />
        <Route path="/" element={
          <div className="App">
            <CustomCursor />
            <AnimatedBackground />
            <Header />
            <main>
              <Hero />
              <About />
              <Projects />
              <Contact />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/editor" element={<JsonEditor />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
