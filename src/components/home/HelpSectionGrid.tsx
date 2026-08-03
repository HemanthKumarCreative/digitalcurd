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
          <h2>Strategy.  <em>Execution.</em> Optimization.</h2>
          <p>We combine cutting-edge AI development with data-driven digital marketing to build scalable growth systems for forward-thinking businesses.</p>
        </div>
        {/* Cards */}
        <div className="help-grid">
          
          {/* Card 1 */}
          <div className="help-card" data-key="1">
            <div className="icon">
              <img src="https://www.valuecoders.com/wp-content/uploads/2026/07/You-need-to-accelerate-your-software-roadmap-1.svg" className="normal" alt="" />
              <img src="https://www.valuecoders.com/wp-content/uploads/2026/07/You-need-to-accelerate-your-software-roadmap-2.svg" className="hover" alt="" />
            </div>
            <h3><Link href="#">Digital Presence & Web</Link></h3>
            <p>You need a high-performance, conversion-optimized website to scale your brand.</p>
            <h4>How We Help:</h4>
            <ul>
              <li>Next.js & React Development</li>
              <li>UI/UX & Brand Identity</li>
              <li>Website Redesign & Migration</li>
            </ul>
            <div className="border-line"></div>
          </div>

          {/* Card 2 */}
          <div className="help-card" data-key="2">
            <div className="icon">
              <img src="https://www.valuecoders.com/wp-content/uploads/2026/07/You-need-to-modernise-legacy-systems.svg" className="normal" alt="" />
              <img src="https://www.valuecoders.com/wp-content/uploads/2026/07/You-need-to-modernise-legacy-systems-1.svg" className="hover" alt="" />
            </div>
            <h3><Link href="#">Ecommerce Growth</Link></h3>
            <p>Your storefront needs an upgrade to boost sales, speed, and customer experience.</p>
            <h4>How We Help:</h4>
            <ul>
              <li>Shopify & Shopify Plus</li>
              <li>Custom Theme Development</li>
              <li>Conversion Rate Optimization</li>
            </ul>
            <div className="border-line"></div>
          </div>

          {/* Card 3 */}
          <div className="help-card" data-key="3">
            <div className="icon">
              <img src="https://www.valuecoders.com/wp-content/uploads/2026/07/Scale-Your-India-Engineering-Center.svg" className="normal" alt="" />
              <img src="https://www.valuecoders.com/wp-content/uploads/2026/07/Scale-Your-India-Engineering-Center-1.svg" className="hover" alt="" />
            </div>
            <h3><Link href="#">AI & Automation</Link></h3>
            <p>You want to leverage artificial intelligence to improve operational efficiency.</p>
            <h4>How We Help:</h4>
            <ul>
              <li>Custom AI Agents</li>
              <li>WhatsApp Automation</li>
              <li>Workflow Optimization</li>
            </ul>
            <div className="border-line"></div>
          </div>

          {/* Expanded Cards */}
          {isExpanded && (
            <>
              {/* Card 4 */}
              <div className="help-card" data-key="4">
                <div className="icon">
                  <img src="https://www.valuecoders.com/wp-content/uploads/2026/07/You-Need-to-Validate-Your-Idea-with-a-Real-Product.svg" className="normal" alt="" />
                  <img src="https://www.valuecoders.com/wp-content/uploads/2026/07/You-Need-to-Validate-Your-Idea-with-a-Real-Product-1.svg" className="hover" alt="" />
                </div>
                <h3><Link href="#">Search & Visibility</Link></h3>
                <p>Your brand is struggling to rank and be discovered by your target audience.</p>
                <h4>How We Help:</h4>
                <ul>
                  <li>Technical & Content SEO</li>
                  <li>AI Search Optimization (AISO)</li>
                  <li>Local & Global SEO Strategy</li>
                </ul>
                <div className="border-line"></div>
              </div>

              {/* Card 5 */}
              <div className="help-card" data-key="5">
                <div className="icon">
                  <img src="https://www.valuecoders.com/wp-content/uploads/2026/07/You-Need-to-Ship-AI-into-Production.svg" className="normal" alt="" />
                  <img src="https://www.valuecoders.com/wp-content/uploads/2026/07/You-Need-to-Ship-AI-into-Production-1.svg" className="hover" alt="" />
                </div>
                <h3><Link href="#">Performance Marketing</Link></h3>
                <p>You need data-driven paid campaigns that deliver measurable ROI and revenue.</p>
                <h4>How We Help:</h4>
                <ul>
                  <li>Google Ads & Performance Max</li>
                  <li>Meta & LinkedIn Advertising</li>
                  <li>ROAS & CAC Optimization</li>
                </ul>
                <div className="border-line"></div>
              </div>

              {/* Card 6 */}
              <div className="help-card" data-key="6">
                <div className="icon">
                  <img src="https://www.valuecoders.com/wp-content/uploads/2026/07/Capa_1-1.svg" className="normal" alt="" />
                  <img src="https://www.valuecoders.com/wp-content/uploads/2026/07/Capa_1-2.svg" className="hover" alt="" />
                </div>
                <h3><Link href="#">Data & Analytics</Link></h3>
                <p>You have data but need actionable insights to make informed business decisions.</p>
                <h4>How We Help:</h4>
                <ul>
                  <li>Power BI Dashboards</li>
                  <li>Google Analytics 4 (GA4)</li>
                  <li>Marketing Attribution</li>
                </ul>
                <div className="border-line"></div>
              </div>
            </>
          )}

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
