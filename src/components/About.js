import React, { useRef, useEffect, useState } from 'react';
import './About.css';
import Timeline from './Timeline';


const About = () => {
  const aboutRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const skillsRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const skills = [
    { name: 'C/C++', level: 80, icon: 'fas fa-code' },
    { name: 'JavaScript', level: 92, icon: 'fab fa-js' },
    { name: 'Python', level: 85, icon: 'fab fa-python' },
    { name: 'PHP/Hack', level: 88, icon: 'fab fa-php' },
    { name: 'React JS', level: 90, icon: 'fab fa-react' },
    { name: 'React Native', level: 82, icon: 'fab fa-react' },
    { name: 'Node.js', level: 88, icon: 'fab fa-node-js' },
    { name: 'Express JS', level: 86, icon: 'fab fa-node' },
    { name: 'HTML/CSS', level: 90, icon: 'fab fa-html5' },
    { name: 'SQL/MongoDB', level: 85, icon: 'fas fa-database' },
    { name: 'REST APIs', level: 88, icon: 'fas fa-network-wired' },
    { name: 'WebSocket', level: 80, icon: 'fas fa-plug' }
  ];
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

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

    const elements = [aboutRef.current, textRef.current, imageRef.current, skillsRef.current];
    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
      clearTimeout(timer);
    };
  }, []);
  
  return (
    <section id="about" className="about" ref={aboutRef}>
      <div className="about-background">
        <div className="about-particles"></div>
      </div>
      <div className="about-container">
        <h2 className="section-title">
          <span className="highlight">About Me</span>
        </h2>
        
          <div className="about-content">
            <div className="about-text" ref={textRef}>
              <div className="text-content">
                <p>
                  Hello! I'm <span className="highlight">Aditya Kurani</span>, a dedicated Computer Science student at IIIT Nagpur with a strong passion for software development. I'm proficient in multiple programming languages and actively seeking to tackle coding challenges to enhance my problem-solving skills.
                </p>
                <p>
                  My experience includes working as a Backend Developer Intern at eSubhalekha, where I built backend systems with PHP and Hack using MVC frameworks that supported up to 1,000 requests per day. I've also developed several full-stack applications including an AI-powered outfit recommendation app, an online appointment booking system, and a social media platform.
                </p>
                <p>
                  I'm committed to continuously expanding my technical knowledge to adapt to evolving industry trends. When I'm not coding, you can find me participating in hackathons (ranked 5th nationally!) or working on new project ideas.
                </p>
              </div>
            </div>
            
            <div className="skills-section" ref={skillsRef}>
              <h3>Skills & Technologies</h3>
              <div className="skills-container">
                {skills.map((skill, index) => (
                  <div className="skill-item" key={index}>
                    <div className="skill-icon">
                      <i className={skill.icon}></i>
                    </div>
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <div className="skill-bar">
                        <div 
                          className="skill-progress" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <h3 className="sub-title">Awards & Achievements</h3>
              <div className="awards-container">
                <div className="award-item">
                  <div className="award-icon">
                    <i className="fas fa-trophy"></i>
                  </div>
                  <div className="award-content">
                    <h4>National Level Hackathon</h4>
                    <p>Ranked 5th at the national level hackathon organised by IIITM Gwalior</p>
                  </div>
                </div>
                <div className="award-item">
                  <div className="award-icon">
                    <i className="fas fa-medal"></i>
                  </div>
                  <div className="award-content">
                    <h4>Medecro.ai Hackathon</h4>
                    <p>Reached the final round of a national hackathon hosted by Medecro.ai</p>
                  </div>
                </div>
                <div className="award-item">
                  <div className="award-icon">
                    <i className="fas fa-award"></i>
                  </div>
                  <div className="award-content">
                    <h4>International Youth Math Competition</h4>
                    <p>Qualified IYMC (International Youth Math Competition) 2023</p>
                  </div>
                </div>
                <div className="award-item">
                  <div className="award-icon">
                    <i className="fas fa-code"></i>
                  </div>
                  <div className="award-content">
                    <h4>Leetcode</h4>
                    <p>Solved 120+ questions on Leetcode</p>
                    <a href="https://leetcode.com/u/aditya8798/" target="_blank" rel="noopener noreferrer">Visit Profile</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        <Timeline />
      </div>
    </section>
  );
};

export default About;
