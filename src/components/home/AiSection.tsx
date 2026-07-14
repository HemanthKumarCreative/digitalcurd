'use client';

import React, { useState, useEffect } from 'react';

function ProgressBar({ isActive, duration }: { isActive: boolean, duration: number }) {
  const [width, setWidth] = useState('0%');
  const [transition, setTransition] = useState('none');

  useEffect(() => {
    let frame1: number;
    let frame2: number;

    if (isActive) {
      // Instantly reset to 0% with no transition
      setWidth('0%');
      setTransition('none');
      
      // Wait two frames to ensure the browser has painted the 0% state
      frame1 = requestAnimationFrame(() => {
        frame2 = requestAnimationFrame(() => {
          setTransition(`width ${duration}ms linear`);
          setWidth('100%');
        });
      });
    } else {
      // Instantly clear width and transition when inactive
      setWidth('0%');
      setTransition('none');
    }

    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
    };
  }, [isActive, duration]);

  return (
    <div 
      className="progress" 
      style={{ width, transition }}
    />
  );
}

export default function AiSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const duration = 4000;
  
  const items = [
    { title: 'GenAI Integration', desc: 'Integrate LLMs into products and workflows, including AI agents, enterprise chatbots, and developer copilots.' },
    { title: 'Computer Vision', desc: 'Use computer vision for visual quality control and facial recognition.' },
    { title: 'Data Engineering', desc: 'Build scalable pipelines and data infrastructure to support reliable production systems.' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, duration);
    return () => clearTimeout(timer);
  }, [activeIndex, items.length]);

  return (
    <section className="ai-production-loop">
      {/* LEFT FULL IMAGE */}
      <div className="ai-left">
        <span className=""></span>
        <video 
          preload="metadata" 
          poster="https://www.valuecoders.com/wp-content/themes/valuecoders/v6.0/images/index-v10/ai-pro.webp" 
          autoPlay muted loop playsInline
        >
          <source src="https://www.valuecoders.com/wp-content/themes/valuecoders/v6.0/video/ai-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>    
      </div>

      {/* RIGHT CONTENT */}
      <div className="ai-right">
        <div className="container">
          <div className="ai-content">
            <h2><em>Build an AI Ecosystem</em> That Drives Real Business Outcomes</h2>
            <p>We help enterprises move from experimentation to execution. From custom LLMs to workflow automation, we design, deploy, and scale AI systems that deliver measurable impact.</p>
            <div className="ai-list">
              {items.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <div 
                    key={index} 
                    className={`ai-item ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div className="title"><h4>{item.title}</h4></div>
                    <div className="desc"><p>{item.desc}</p></div>
                    <ProgressBar isActive={isActive} duration={duration} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
