import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('all');
  const projectsRef = useRef(null);
  
  const projects = [
    {
      title: 'Outfit-AI',
      description: 'A MERN stack web app that recommends outfits based on uploaded clothes, weather, location, age, gender, and user preferences with AI-generated images, sharing and selling features.',
      tech: ['React JS', 'Node.js', 'MongoDB', 'BeautifulSoup', 'Selenium'],
      links: {
        github: 'https://github.com/OutFit-AI',
        live: 'https://outfit-ai.com'
      },
      featured: true,
      category: 'ai'
    },
    {
      title: 'Online Appointment Interface',
      description: 'A web application that allows users to book doctor appointments and find the nearest clinic using geolocation, rate doctors, get prescriptions via email and chat with doctors.',
      tech: ['PHP/Hack', 'SQL', 'WebSocket', 'JavaScript'],
      links: {
        github: 'https://github.com/OnlineAppointment',
        live: '#'
      },
      featured: true,
      category: 'web'
    },
    {
      title: 'Social Media Platform',
      description: 'A full-stack social media application where users can sign up, post updates, add friends, share posts within their network, real-time messaging, story sharing, and media sharing.',
      tech: ['PHP/Hack', 'SQL', 'JavaScript', 'WebSocket'],
      links: {
        github: 'https://github.com/SocialMedia',
        live: '#'
      },
      featured: true,
      category: 'web'
    },
    {
      title: 'Digital Farming Assistance',
      description: 'A scalable web application aimed at improving farmer productivity by enabling real-time communication, providing access to essential tools and updates on schemes.',
      tech: ['Hack', 'SQL', 'OAuth 2.0', 'REST APIs'],
      links: {
        github: 'https://github.com/Dhsango',
        live: '#'
      },
      featured: false,
      category: 'web'
    },
    {
      title: 'Virtual Voice Assistant',
      description: 'An AI assistant with voice and text commands for system control, scheduling, and automation. Integrated with Google Calendar for reminders, task management, and media control.',
      tech: ['Python', 'Google API', 'AI/ML'],
      links: {
        github: 'https://github.com/VoiceAssistant',
        live: '#'
      },
      featured: false,
      category: 'ai'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const projectElements = document.querySelectorAll('.featured-project, .project-card');
    projectElements.forEach((el) => observer.observe(el));

    return () => {
      projectElements.forEach((el) => observer.unobserve(el));
    };
  }, [activeTab]);

  const featuredProjects = projects.filter(project => project.featured);
  
  const filteredProjects = activeTab === 'all' 
    ? projects.filter(project => !project.featured)
    : projects.filter(project => !project.featured && project.category === activeTab);

  return (
    <section id="projects" className="projects" ref={projectsRef}>
      <div className="projects-container">
        <h2 className="section-title">My Projects</h2>
        
        <div className="featured-projects">
          {featuredProjects.map((project, index) => (
            <div className="featured-project" key={index}>
              <div className="project-content">
                <p className="project-overline">Featured Project</p>
                <h3 className="project-title">
                  <span className="highlight">{project.title}</span>
                </h3>
                <div className="project-description">
                  <p>{project.description}</p>
                </div>
                <ul className="project-tech-list">
                  {project.tech.map((tech, techIndex) => (
                    <li key={techIndex}>{tech}</li>
                  ))}
                </ul>
                <div className="project-links">
                  <a href={project.links.github} aria-label="GitHub Link" className="icon-link">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href={project.links.live} aria-label="Live Demo" className="icon-link">
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>
              </div>
              <div className="project-image">
                <div className="project-image-placeholder">
                  <div className="image-content">
                    <span>{project.title.substring(0, 2)}</span>
                  </div>
                  <div className="image-overlay"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="other-projects-section">
          <h3 className="other-projects-title">Other Noteworthy Projects</h3>
          
          <div className="project-filter">
            <button 
              className={`filter-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${activeTab === 'web' ? 'active' : ''}`}
              onClick={() => setActiveTab('web')}
            >
              Web Apps
            </button>
            <button 
              className={`filter-btn ${activeTab === 'ai' ? 'active' : ''}`}
              onClick={() => setActiveTab('ai')}
            >
              AI/ML
            </button>
          </div>
          
          <div className="other-projects">
            {filteredProjects.map((project, index) => (
              <div className="project-card" key={index}>
                <div className="project-card-inner">
                  <div className="project-card-header">
                    <div className="folder-icon">
                      <i className="far fa-folder"></i>
                    </div>
                    <div className="project-links">
                      <a href={project.links.github} aria-label="GitHub Link" className="icon-link">
                        <i className="fab fa-github"></i>
                      </a>
                      <a href={project.links.live} aria-label="Live Demo" className="icon-link">
                        <i className="fas fa-external-link-alt"></i>
                      </a>
                    </div>
                  </div>
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-description">{project.description}</p>
                  <div className="project-card-footer">
                    <ul className="project-card-tech-list">
                      {project.tech.map((tech, techIndex) => (
                        <li key={techIndex}>{tech}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
