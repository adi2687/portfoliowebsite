import React, { useRef, useEffect, useState } from 'react';
import './Timeline.css';

const Timeline = () => {
  const timelineRef = useRef(null);
  const [timelineData, setTimelineData] = useState([]);
  
  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        const response = await fetch(process.env.PUBLIC_URL + '/data/timeline.json');
        if (!response.ok) {
          throw new Error('Failed to load timeline data');
        }
        const data = await response.json();
        console.log('Timeline data loaded:', data);
        setTimelineData(data);
      } catch (error) {
        console.error('Error loading timeline data:', error);
      }
    };

    fetchTimelineData();
  }, []);
  
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
  
  // Timeline data is now imported from timeline.json
  
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
