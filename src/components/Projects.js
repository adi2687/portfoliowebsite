import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('all');
  const projectsRef = useRef(null);
  
  const projects = [
    {
      title: 'DhaanGo',
      description: 'A comprehensive web application with chatbot functionality, marketplace features, and user authentication system.',
      tech: ['React', 'PHP', 'FastAPI', 'Python', 'CSS'],
      links: {
        github: '#',
        live: '#'
      },
      featured: true,
      category: 'web'
    },
    {
      title: 'AI Wardrobe',
      description: 'A full-stack application with ML capabilities for clothing and fashion recommendations.',
      tech: ['React', 'Node.js', 'Machine Learning', 'CSS'],
      links: {
        github: '#',
        live: '#'
      },
      featured: true,
      category: 'ai'
    },
    {
      title: 'Appointment Booking System',
      description: 'A healthcare appointment booking system with doctor management, patient profiles, and disease prediction functionality.',
      tech: ['PHP', 'JavaScript', 'MySQL', 'HTML', 'CSS'],
      links: {
        github: '#',
        live: '#'
      },
      featured: true,
      category: 'web'
    },
    {
      title: 'NOVA',
      description: 'A Python-based personal assistant with location-based features, task management, and image processing capabilities.',
      tech: ['Python', 'Google API', 'Machine Learning'],
      links: {
        github: '#',
        live: '#'
      },
      featured: false,
      category: 'ai'
    },
    {
      title: 'Social and Chat App',
      description: 'A social networking and messaging platform with user profiles and real-time communication.',
      tech: ['JavaScript', 'Node.js', 'Socket.io', 'MongoDB'],
      links: {
        github: '#',
        live: '#'
      },
      featured: false,
      category: 'web'
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
