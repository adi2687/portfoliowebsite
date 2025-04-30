import React, { useEffect, useRef } from 'react';
import './FloatingShapes.css';

const FloatingShapes = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Create particles
    const particlesArray = [];
    const numberOfParticles = 50;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 15 + 5;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `rgba(100, 255, 218, ${Math.random() * 0.3})`;
        this.shape = Math.floor(Math.random() * 3); // 0: circle, 1: square, 2: triangle
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        
        switch(this.shape) {
          case 0: // Circle
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 1: // Square
            ctx.rect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
            ctx.fill();
            break;
          case 2: // Triangle
            ctx.moveTo(this.x, this.y - this.size/2);
            ctx.lineTo(this.x - this.size/2, this.y + this.size/2);
            ctx.lineTo(this.x + this.size/2, this.y + this.size/2);
            ctx.closePath();
            ctx.fill();
            break;
          default:
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
      }
    }
    
    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    init();
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="floating-shapes"></canvas>;
};

export default FloatingShapes;
