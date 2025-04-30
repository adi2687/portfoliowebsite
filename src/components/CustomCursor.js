import React, { useState, useEffect } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const mMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const mLeave = () => {
      setHidden(true);
    };

    const mDown = () => {
      setClicked(true);
    };

    const mUp = () => {
      setClicked(false);
    };

    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, .project-card, .social-link, .icon-link, .logo-link').forEach(el => {
        el.addEventListener('mouseenter', () => setLinkHovered(true));
        el.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };

    // Add event listeners
    document.addEventListener('mousemove', mMove);
    document.addEventListener('mouseleave', mLeave);
    document.addEventListener('mousedown', mDown);
    document.addEventListener('mouseup', mUp);
    
    // Wait for DOM to be fully loaded before adding link hover events
    if (document.readyState === 'complete') {
      handleLinkHoverEvents();
    } else {
      window.addEventListener('load', handleLinkHoverEvents);
    }

    return () => {
      // Remove event listeners
      document.removeEventListener('mousemove', mMove);
      document.removeEventListener('mouseleave', mLeave);
      document.removeEventListener('mousedown', mDown);
      document.removeEventListener('mouseup', mUp);
      window.removeEventListener('load', handleLinkHoverEvents);
    };
  }, []);

  // Only show custom cursor on desktop
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) return null;

  return (
    <>
      <div 
        className={`cursor-dot ${hidden ? 'hidden' : ''} ${clicked ? 'clicked' : ''} ${linkHovered ? 'link-hovered' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        className={`cursor-ring ${hidden ? 'hidden' : ''} ${clicked ? 'clicked' : ''} ${linkHovered ? 'link-hovered' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
};

export default CustomCursor;
