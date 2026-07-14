'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HelpSectionGrid() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="help-section padding-t-120 padding-b-120">
      <div className="container">
        {/* Heading */}
        <div className="section-head">
          <h2>Your Challenges. <em>Our Solutions</em></h2>
          <p>We assess your current stage and align our delivery structure accordingly. Below are some scenarios where most businesses require our assistance.</p>
        </div>
        {/* Cards */}
        <div className="help-grid">
          <div className="help-card" data-key="1" style={{ display: 'block' }}>
            <div className="icon">
              <img src="https://www.valuecoders.com/wp-content/uploads/2026/07/You-need-to-accelerate-your-software-roadmap-1.svg" className="normal" alt="" />
              <img src="https://www.valuecoders.com/wp-content/uploads/2026/07/You-need-to-accelerate-your-software-roadmap-2.svg" className="hover" alt="" />
            </div>
            <h3><Link href="/solutions/ship-your-roadmap">You Need to Accelerate Your Software Roadmap</Link></h3>
            <p>You have a fixed deadline but you are falling behind your planned schedule.</p>
            <h4>How We Help:</h4>
            <ul>
              <li>Rapid capacity scaling</li>
              <li>Speedy deployment</li>
              <li>Predictable velocity</li>
            </ul>
            <div className="border-line"></div>
            <Link href="/solutions/ship-your-roadmap" className="learn-more">Scale Engineering</Link>
          </div>

          <div className="help-card" data-key="2" style={{ display: 'block' }}>
            <div className="icon">
              <img src="https://www.valuecoders.com/wp-content/uploads/2026/07/You-need-to-modernise-legacy-systems.svg" className="normal" alt="" />
              <img src="https://www.valuecoders.com/wp-content/uploads/2026/07/You-need-to-modernise-legacy-systems-1.svg" className="hover" alt="" />
            </div>
            <h3><Link href="/modernization-services">You Need to Modernize Legacy Systems</Link></h3>
            <p>The platform you use needs an upgrade and blocking the next phase.</p>
            <h4>How We Help:</h4>
            <ul>
              <li><Link href="/application-modernization">Application modernization</Link></li>
              <li>Workflow automation</li>
              <li>Incremental migration, zero downtime</li>
            </ul>
            <div className="border-line"></div>
            <Link href="/modernization-services" className="learn-more">Modernise Legacy Systems</Link>
          </div>

          <div className="help-card" data-key="3" style={{ display: 'block' }}>
            <div className="icon">
              <img src="https://www.valuecoders.com/wp-content/uploads/2026/07/Scale-Your-India-Engineering-Center.svg" className="normal" alt="" />
              <img src="https://www.valuecoders.com/wp-content/uploads/2026/07/Scale-Your-India-Engineering-Center-1.svg" className="hover" alt="" />
            </div>
            <h3><Link href="/offshore-software-development-center-india">You Need to Scale Your India Engineering Center</Link></h3>
            <p>You want to build a GCC and are looking for a partner who can staff, onboard..</p>
            <h4>How We Help:</h4>
            <ul>
              <li><Link href="/dedicated-development-teams">Dedicated pods</Link></li>
              <li><Link href="/it-staff-augmentation-services">Engineering capacity at scale</Link></li>
              <li>Regulated excellence</li>
            </ul>
            <div className="border-line"></div>
            <Link href="/offshore-software-development-center-india" className="learn-more">Scale Your India Centre</Link>
          </div>

          <div className="help-card" data-key="4" style={{ display: isExpanded ? 'block' : 'none' }}>
            <div className="icon">
              <img src="https://www.valuecoders.com/wp-content/uploads/2026/07/You-Need-to-Validate-Your-Idea-with-a-Real-Product.svg" className="normal" alt="" />
              <img src="https://www.valuecoders.com/wp-content/uploads/2026/07/You-Need-to-Validate-Your-Idea-with-a-Real-Product-1.svg" className="hover" alt="" />
            </div>
            <h3><Link href="/solutions/build-your-mvp">You Need to Validate Your Idea with a Real Product</Link></h3>
            <p>You want to turn your business idea into a product and test it in a limited timeframe.</p>
            <h4>How We Help:</h4>
            <ul>
              <li><Link href="/mvp-app-development-company">MVP development</Link></li>
              <li>Architecture that scales</li>
              <li>Speed without shortcuts</li>
            </ul>
            <div className="border-line"></div>
            <Link href="/solutions/build-your-mvp" className="learn-more">Build Your MVP</Link>
          </div>

          <div className="help-card" data-key="5" style={{ display: isExpanded ? 'block' : 'none' }}>
            <div className="icon">
              <img src="https://www.valuecoders.com/wp-content/uploads/2026/07/You-Need-to-Ship-AI-into-Production.svg" className="normal" alt="" />
              <img src="https://www.valuecoders.com/wp-content/uploads/2026/07/You-Need-to-Ship-AI-into-Production-1.svg" className="hover" alt="" />
            </div>
            <h3><Link href="/ai">You Need to Ship AI into Production</Link></h3>
            <p>You need engineers who can build LLM-powered products and ML systems.</p>
            <h4>How We Help:</h4>
            <ul>
              <li>Generative AI app development</li>
              <li><Link href="/machine-learning">ML engineering and deployment</Link></li>
              <li><Link href="/ai/custom-ai-agent-development">AI agent</Link> and workflow automation</li>
            </ul>
            <div className="border-line"></div>
            <Link href="/ai" className="learn-more">Explore AI Engineering</Link>
          </div>

          <div className="help-card" data-key="6" style={{ display: isExpanded ? 'block' : 'none' }}>
            <div className="icon">
              <img src="https://www.valuecoders.com/wp-content/uploads/2026/07/Capa_1-1.svg" className="normal" alt="" />
              <img src="https://www.valuecoders.com/wp-content/uploads/2026/07/Capa_1-2.svg" className="hover" alt="" />
            </div>
            <h3><Link href="/solutions/build-your-product">You Are Not Sure About the Kind of Software Help You Need</Link></h3>
            <p>You are in a state of strategic uncertainty.</p>
            <h4>How We Help:</h4>
            <ul>
              <li>Define your delivery problem</li>
              <li>Scope a Discovery Sprint</li>
              <li>Get a no-obligation assessment</li>
            </ul>
            <div className="border-line"></div>
            <Link href="/solutions/build-your-product" className="learn-more">Talk to Our Team</Link>
          </div>
        </div>

        {!isExpanded && (
          <div className="bottom-append-part">
            <div className="btn-primary-two">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setIsExpanded(true);
                }} 
                style={{ background: 'none', border: 'none', color: 'inherit', padding: 0, cursor: 'pointer', font: 'inherit' }}
              >
                View All
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
