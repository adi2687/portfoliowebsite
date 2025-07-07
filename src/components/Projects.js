import React, { useState, useEffect, useRef } from 'react';
import { FaGithub, FaExternalLinkAlt, FaLinkedin } from 'react-icons/fa';
import { FiChevronRight, FiFilter, FiX } from 'react-icons/fi';
import './Projects.css';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const projectsRef = useRef(null);
  const videoRefs = useRef({});
  const modalRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);
  
  // Fetch projects data
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('Loading projects data...');
        const response = await fetch(process.env.PUBLIC_URL + '/data/projects.json');
        if (!response.ok) {
          throw new Error('Failed to load projects');
        }
        const data = await response.json();
        
        if (Array.isArray(data)) {
          console.log(`Loaded ${data.length} projects`);
          setProjects(data);
        } else {
          console.error('Invalid projects data format:', data);
        }
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);
  
  // Handle project click
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Separate featured and other projects
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);
  
  // Filter projects based on active tab
  const filteredProjects = activeTab === 'all' 
    ? otherProjects 
    : otherProjects.filter(project => project.category === activeTab);
  
  
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

  useEffect(() => {
    // Create intersection observer for videos
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            // Set video to muted and play
            video.muted = true;
            video.play().catch(error => {
              console.log("Video play failed:", error);
            });
          } else {
            if (!video.paused) {
              video.pause();
            }
          }
        });
      },
      { threshold: 0.1 } // Lower threshold for earlier triggering
    );

    // Observe all video elements
    Object.values(videoRefs.current).forEach(video => {
      if (video) {
        videoObserver.observe(video);
      }
    });

    return () => {
      Object.values(videoRefs.current).forEach(video => {
        if (video) {
          videoObserver.unobserve(video);
        }
      });
    };
  }, []);




  return (
    <section id="projects" className="projects" ref={projectsRef}>
      {/* Project Details Modal */}
      {isModalOpen && selectedProject && (
        <div className={`modal-overlay ${selectedProject.isFullScreen ? 'fullscreen' : ''}`}>
          <div 
            className={`project-modal ${selectedProject.isFullScreen ? 'fullscreen' : ''}`} 
            ref={modalRef}
          >
            {!selectedProject.isFullScreen && (
              <button className="close-button" onClick={closeModal}>&times;</button>
            )}
            <div className="modal-content">
              <div className="modal-header">
                <h2>{selectedProject.title}</h2>
                <div className="project-links">
                  {selectedProject.links.github && (
                    <a href={selectedProject.links.github} target="_blank" rel="noopener noreferrer">
                      <FaGithub /> GitHub
                    </a>
                  )}
                  {selectedProject.links.live && selectedProject.links.live !== 'false' && (
                    <a href={selectedProject.links.live} target="_blank" rel="noopener noreferrer">
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                  {selectedProject.links.linkedin && (
                    <a href={selectedProject.links.linkedin} target="_blank" rel="noopener noreferrer">
                      <FaLinkedin /> LinkedIn
                    </a>
                  )}
                </div>
              </div>
                  
                  <div className="modal-body">
                    <div className="project-image-container">
                      {selectedProject.isVideo ? (
                        <video 
                          src={selectedProject.image} 
                          autoPlay 
                          loop 
                          muted 
                          playsInline
                          className="project-media"
                        />
                      ) : (
                        <img 
                          src={selectedProject.image} 
                          alt={selectedProject.title} 
                          className="project-media"
                        />
                      )}
                    </div>
                    
                    <div className="project-details">
                      <p className="project-description">{selectedProject.description}</p>
                      
                      <div className="project-tech">
                        <h4>Technologies:</h4>
                        <div className="tech-tags">
                          {selectedProject.tech.map((tech, index) => (
                            <span key={index} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                      
                      {selectedProject.features && (
                        <div className="project-features">
                          <h4>Key Features:</h4>
                          <ul>
                            {selectedProject.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
            </div>
          </div>
        </div>
      )}
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
              onClick={() => handleProjectClick(project)}
            >
              <div className="project-image">
                {project.isVideo ? (
                  <video 
                    ref={el => videoRefs.current[project.title] = el}
                    src={project.image} 
                    controls 
                    poster={project.image.replace('.mp4', '.jpg')}
                    className="video-preview"
                    playsInline
                    muted
                    autoPlay
                    loop
                    preload="auto"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : project.title === 'NOVA' ? (
                  <video 
                    src="/novavideo.mp4" 
                    controls 
                    poster="/nova.png"
                    className="video-preview"
                    playsInline
                    muted
                    autoPlay
                    loop
                    preload="auto"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : project.title === 'Medpulse' ? (
                  <video 
                    src="/medpulsevid.mp4" 
                    controls 
                    poster="/medpulse.jpg"
                    className="video-preview"
                    playsInline
                    muted
                    autoPlay
                    loop
                    preload="auto"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img src={project.image} alt={`${project.title} preview`} />
                )}
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
                  {project.image && !project.isVideo && (
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
