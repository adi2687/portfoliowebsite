import React, { useState, useEffect } from 'react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
      document.body.classList.toggle('light-theme', savedTheme === 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
      {isDark ? (
        <i className="fas fa-sun"></i>
      ) : (
        <i className="fas fa-moon"></i>
      )}
    </button>
  );
};

export default ThemeToggle;
