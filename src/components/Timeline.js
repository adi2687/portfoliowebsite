import React, { useRef, useEffect } from 'react';
import './Timeline.css';

const Timeline = () => {
  const timelineRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.timeline-item');
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('animate');
              }, 300 * index);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);
  
  const timelineData = [
    {
      date: 'Sept 2023 - June 2027',
      title: 'IIIT Nagpur',
      subtitle: 'Bachelors in Technology in Computer Science and Engineering',
      description: 'Coursework: Data Structures and algorithms, Web Development, Computer Programming and OOPS. Current CGPA: 8.32',
      icon: 'fas fa-graduation-cap'
    },
    {
      date: 'Jan 2025 - Feb 2025',
      title: 'Backend Developer Intern',
      subtitle: 'eSubhalekha',
      description: 'Built backend systems with PHP and Hack using MVC frameworks, supporting up to 1,000 requests per day. Improved routing efficiency, reducing response times by 15% and optimizing server performance.',
      icon: 'fas fa-briefcase'
    },
    {
      date: '2024',
      title: 'National Level Hackathon',
      subtitle: 'IIITM Gwalior',
      description: 'Ranked 5th at the national level hackathon organised by IIITM Gwalior.',
      icon: 'fas fa-trophy'
    },
    {
      date: '2024',
      title: 'Medecro.ai Hackathon',
      subtitle: 'National Hackathon',
      description: 'Reached the final round of a national hackathon hosted by Medecro.ai.',
      icon: 'fas fa-medal'
    }
  ];
  
  return (
    <div className="timeline-container" ref={timelineRef}>
      <h3 className="timeline-title">Education & Experience</h3>
      <div className="timeline">
        {timelineData.map((item, index) => (
          <div className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`} key={index}>
            <div className="timeline-icon">
              <i className={item.icon}></i>
            </div>
            <div className="timeline-content">
              <div className="timeline-date">{item.date}</div>
              <h3 className="timeline-item-title">{item.title}</h3>
              <h4 className="timeline-item-subtitle">{item.subtitle}</h4>
              <p className="timeline-text">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
