import React, { useRef, useEffect, useState } from 'react';
import './About.css';
import Timeline from './Timeline';

const About = () => {
  const aboutRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const skillsRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [skills, setSkills] = useState([]);
  const [awards, setAwards] = useState([]);
  const [about, setAbout] = useState({ paragraphs: [] });

  // Load data when component mounts
  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        console.log('Loading data...');
        
        // Fetch all data in parallel
        const [skillsResponse, awardsResponse, aboutResponse] = await Promise.all([
          fetch(process.env.PUBLIC_URL + '/data/skills.json'),
          fetch(process.env.PUBLIC_URL + '/data/awards.json'),
          fetch(process.env.PUBLIC_URL + '/data/about.json')
        ]);
        
        if (!skillsResponse.ok || !awardsResponse.ok || !aboutResponse.ok) {
          throw new Error('Failed to load one or more data files');
        }
        
        const [skillsData, awardsData, aboutData] = await Promise.all([
          skillsResponse.json(),
          awardsResponse.json(),
          aboutResponse.json()
        ]);
        
        console.log('Data loaded:', { skillsData, awardsData, aboutData });
        
        if (!isMounted) return;
        
        // Set the loaded data
        setSkills(skillsData);
        setAwards(awardsData);
        setAbout(aboutData);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    fetchData();
    
    // Listen for storage events to update when data changes in the editor
    const handleStorageChange = (e) => {
      if (e.key && e.key.startsWith('portfolio_')) {
        console.log('Storage changed, refetching data...', e.key);
        fetchData();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup
    return () => {
      isMounted = false;
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
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
                {about.paragraphs.map((paragraph, index) => (
                  <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
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
                {awards.map((award, index) => (
                  <div className="award-item" key={index}>
                    <div className="award-icon">
                      <i className={award.icon}></i>
                    </div>
                    <div className="award-content">
                      <h4>{award.title}</h4>
                      <p>{award.description}</p>
                      {award.link && (
                        <a href={award.link} target="_blank" rel="noopener noreferrer">
                          Visit Profile
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        
        <Timeline />
      </div>
    </section>
  );
};

export default About;
