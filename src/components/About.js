import React, { useRef, useEffect } from 'react';
import './About.css';

const About = () => {
  const aboutRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const skillsRef = useRef(null);
  
  const skills = [
    { name: 'JavaScript (ES6+)', level: 90 },
    { name: 'React', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'PHP', level: 70 },
    { name: 'SQL/NoSQL Databases', level: 85 }
  ];
  
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

    const elements = [aboutRef.current, textRef.current, imageRef.current, skillsRef.current];
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
                Hello! I'm <span className="highlight">Aditya</span>, a software developer with a passion for creating digital experiences that are both functional and beautiful. 
                My journey in tech began with a curiosity about how websites work, which led me to dive into the world of programming.
              </p>
              <p>
                I focus on building applications that solve real problems while providing intuitive, enjoyable user experiences. 
                My experience spans across frontend and backend development, with a particular interest in React, Node.js, and modern web technologies.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or learning about UI/UX design principles.
              </p>
            </div>
            
            <div className="skills-section" ref={skillsRef}>
              <h3>Skills & Technologies</h3>
              <div className="skills-container">
                {skills.map((skill, index) => (
                  <div className="skill-item" key={index}>
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{
                          width: `0%`,
                          transitionDelay: `${index * 0.1}s`
                        }}
                        data-width={`${skill.level}%`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="about-image" ref={imageRef}>
            <div className="image-card">
              <div className="image-wrapper">
                {/* Replace with your actual image */}
                <div className="placeholder-image">
                  <span>AK</span>
                </div>
                <div className="image-overlay"></div>
              </div>
              <div className="image-frame"></div>
            </div>
            
            <div className="experience-box">
              <div className="experience-content">
                <span className="experience-number">5+</span>
                <span className="experience-text">Years of Experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
