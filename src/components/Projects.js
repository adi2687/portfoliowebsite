import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  const projectsRef = useRef(null);
  
  const projects = [
    {
      title: 'Nova',
      description: 'A comprehensive e-commerce platform built with Python, featuring real-time product tracking, secure payment integration, and personalized shopping experiences with AI-powered recommendations.',
      tech: ['Python','Google API','Google calendar','Google maps'],
      links: {
        github: 'https://github.com/adi2687/Nova',
        live: false,
        linkedin: 'https://www.linkedin.com/posts/aditya-kurani-818668176_ai-innovation-nextgentech-activity-7290479530417258496-Sb_7?utm_source=share&utm_medium=member_desktop&rcm=ACoAACm-iJQBHeUeuiQJdzLWnGL5zXLGTL0fUjQ'
      },
      featured: true,
      category: 'mobile',
      icon: 'fas fa-shopping-bag',
      image: '/nova.png'
    },
    {
      title: 'Outfit-AI Mobile',
      description: 'A React Native mobile app version of Outfit-AI, featuring weather-based outfit recommendations, AI-powered fashion advice, digital wardrobe management, and shopping integration. The app provides a seamless mobile experience with offline capabilities and push notifications.',
      tech: ['React Native', 'Node.js', 'MongoDB', 'Express', 'Gemini AI', 'Socket.io', 'Expo'],
      links: {
        github: 'https://github.com/adi2687/OutFitAI-app',
        live: 'https://outfit-ai-liart.vercel.app/download',
        linkedin: 'https://www.linkedin.com/posts/naresh-mahiya-1ba039254_fashiontech-ai-reactnative-ugcPost-7321492850695716864-B8eE?utm_source=share&utm_medium=member_desktop&rcm=ACoAACm-iJQBHeUeuiQJdzLWnGL5zXLGTL0fUjQ'
      },
      featured: false,
      category: 'mobile',
      icon: 'fas fa-mobile-alt',
      image: '/outfitapp.jpg'
    },
    {
      title: 'Outfit-AI',
      description: 'A comprehensive fashion AI platform featuring weather-based outfit recommendations, AI-powered chatbot for fashion advice, digital wardrobe management, shopping integration with Amazon and Myntra, and image classification using Gemini AI. The platform includes features like outfit planning, social sharing, and a mobile-responsive design.',
      tech: ['React.js', 'Node.js', 'MongoDB', 'Express', 'Gemini AI', 'Socket.io', 'Selenium', 'BeautifulSoup', 'Three.js'],
      features: [
        'Weather-based outfit recommendations using real-time data',
        'AI-powered fashion advice chatbot',
        'Digital wardrobe management with image classification',
        'Shopping integration with Amazon and Myntra',
        'Social sharing and outfit planning',
        'Mobile-responsive design with React Native',
        'Real-time updates and notifications'
      ],
      links: {
        github: 'https://github.com/adi2687/OutFit-AI',
        live: 'https://outfit-ai-liart.vercel.app',
        linkedin: 'https://www.linkedin.com/posts/aditya-kurani-818668176_introducing-outfitai-try-outfitai-https-activity-7317743940403613696-6Exw?utm_source=share&utm_medium=member_desktop&rcm=ACoAACm-iJQBHeUeuiQJdzLWnGL5zXLGTL0fUjQ'
      },
      featured: true,
      category: 'ai',
      icon: 'fas fa-tshirt',
      image: '/outfitaiweb.png'
    },
    {
      title: 'Medpulse',
      description: 'A web application that allows users to book doctor appointments and find the nearest clinic using geolocation, rate doctors, get prescriptions via email and chat with doctors.',
      tech: ['PHP/Hack', 'SQL', 'WebSocket', 'JavaScript'],
      links: {
        github: 'https://github.com/adi2687/OnlineAppointment',
        live: false,
        linkedin: 'https://www.linkedin.com/posts/aditya-kurani-818668176_hackathon-medicaltech-webdevelopment-activity-7251676282919260161-v33C?utm_source=share&utm_medium=member_desktop&rcm=ACoAACm-iJQBHeUeuiQJdzLWnGL5zXLGTL0fUjQ'
      },
      featured: true,
      category: 'web',
      icon: 'fas fa-calendar-check',
      image: '/medpulse.jpg'
    },
    {
      title: 'Friendify',
      description: 'A full-stack social media application where users can sign up, post updates, add friends, share posts within their network, real-time messaging, story sharing, and media sharing.',
      tech: ['PHP/Hack', 'SQL', 'JavaScript', 'WebSocket'],
      links: {
        github: 'https://github.com/adi2687/SocialMedia',
        live: false,
        linkedin: 'https://www.linkedin.com/in/aditya-kurani-818668176/'
      },
      featured: true,
      category: 'web',
      icon: 'fas fa-users',
      image: '/friendify.png'
    },
    {
      title: 'Dhaango',
      description: 'A scalable web application aimed at improving farmer productivity by enabling real-time communication, providing access to essential tools and updates on schemes.',
      tech: ['Hack', 'SQL', 'OAuth 2.0', 'REST APIs'],
      links: {
        github: 'https://github.com/adi2687/Dhaango',
        live: false,
        linkedin: 'https://www.linkedin.com/posts/aksh8t_dhaango-empoweringfarmers-agritech-ugcPost-7256973678339309568-tVja?utm_source=share&utm_medium=member_desktop&rcm=ACoAACm-iJQBHeUeuiQJdzLWnGL5zXLGTL0fUjQ'
      },
      featured: false,
      category: 'web',
      icon: 'fas fa-seedling',
      image: '/dhaango.png'
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

    const projectElements = document.querySelectorAll('.featured-project, .project-card, .project-filter');
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
      <div className="projects-background">
        <div className="projects-particles"></div>
      </div>
      <div className="projects-container">
        <h2 className="section-title">
          <span className="highlight">My Projects</span>
        </h2>
        
        <div className="featured-projects">
          {featuredProjects.map((project, index) => (
            <div 
              className="featured-project" 
              key={index}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="project-image">
                <img src={project.image} alt={`${project.title} preview`} />
              </div>
              <div className="project-content">
                <div className="project-header">
                  <div className="project-icon">
                    <i className={project.icon}></i>
                  </div>
                  <div className="project-links">
                    <a 
                      href={project.links.github} 
                      aria-label="GitHub Link" 
                      className="icon-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-github"></i>
                    </a>
                    {project.links.live && (
                      <a 
                        href={project.links.live} 
                        aria-label="Live Demo" 
                        className="icon-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fas fa-external-link-alt"></i>
                      </a>
                    )}
                    <a 
                      href={project.links.linkedin} 
                      aria-label="LinkedIn Profile" 
                      className="icon-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin"></i>
                    </a>
                  </div>
                </div>
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
              </div>
              
            </div>
          ))}
        </div>

        <div className="other-projects-section">
          <h3 className="other-projects-title">
            <span className="highlight">Other Noteworthy Projects</span>
          </h3>
          
          <div className="project-filter">
            <button 
              className={`filter-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              <span>All</span>
              <span className="filter-count">{projects.filter(p => !p.featured).length}</span>
            </button>
            <button 
              className={`filter-btn ${activeTab === 'web' ? 'active' : ''}`}
              onClick={() => setActiveTab('web')}
            >
              <span>Web Apps</span>
              <span className="filter-count">{projects.filter(p => !p.featured && p.category === 'web').length}</span>
            </button>
            <button 
              className={`filter-btn ${activeTab === 'mobile' ? 'active' : ''}`}
              onClick={() => setActiveTab('mobile')}
            >
              <span>Mobile Apps</span>
              <span className="filter-count">{projects.filter(p => !p.featured && p.category === 'mobile').length}</span>
            </button>
          </div>
          
          <div className="other-projects">
            {filteredProjects.map((project, index) => (
              <div 
                className="project-card" 
                key={index}
                onMouseEnter={() => setHoveredProject(index + featuredProjects.length)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="project-card-inner">
                  {project.image && (
                    <div className="project-card-image">
                      <img src={project.image} alt={`${project.title} preview`} />
                    </div>
                  )}
                  <br/>
                  <div className="project-card-header">
                    <div className="folder-icon">
                      <i className={project.icon}></i>
                    </div>
                    <div className="project-links">
                      <a 
                        href={project.links.github} 
                        aria-label="GitHub Link" 
                        className="icon-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-github"></i>
                      </a>
                      {project.links.live && (
                        <a 
                          href={project.links.live} 
                          aria-label="Live Demo" 
                          className="icon-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fas fa-external-link-alt"></i>
                        </a>
                      )}
                      <a 
                        href={project.links.linkedin} 
                        aria-label="LinkedIn Profile" 
                        className="icon-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-linkedin"></i>
                      </a>
                    </div>
                    <br />
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
