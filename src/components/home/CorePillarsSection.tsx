import React from 'react';
import Link from 'next/link';

export default function CorePillarsSection() {
  return (
    <section className="delivery-models padding-t-120 padding-b-120">
      <div className="container">
        <div className="section-header">
          <h2>Our Three Core Pillars</h2>
          <p>
            We empower businesses to innovate and scale by combining AI, modern digital engineering, and data-driven marketing to deliver integrated solutions that drive measurable growth and long-term success.
          </p>
        </div>
        
        <div className="models-grid">
          {/* Pillar 1: Innovate */}
          <article className="model-card">
            <div className="card-top">
              <div className="icon-box" style={{ fontSize: '24px' }}>🤖</div>
              <span className="badge">INNOVATE</span>
            </div>
            <h3><Link href="#">AI Solutions</Link></h3>
            <p>
              We help businesses unlock the full potential of Artificial Intelligence through intelligent automation, AI agents, conversational chatbots, predictive analytics, and custom AI solutions.
            </p>
            <div className="card-footer">
              <p>Our AI-first approach streamlines operations, enhances decision-making, and creates smarter customer experiences that drive efficiency, innovation, and sustainable growth.</p>
            </div>
          </article>

          {/* Pillar 2: Build (Highlighted) */}
          <article className="model-card highlighted">
            <div className="card-top">
              <div className="icon-box" style={{ fontSize: '24px' }}>🌐</div>
              <span className="badge">BUILD</span>
            </div>
            <h3><Link href="#">Digital Engineering</Link></h3>
            <p>
              We build high-performance websites, ecommerce platforms, and custom digital solutions using modern technologies like Next.js, React, Shopify, and cloud-native architectures.
            </p>
            <div className="card-footer">
              <p>Every solution is designed for speed, scalability, security, and exceptional user experience, ensuring your digital foundation is ready for today's demands and tomorrow's opportunities.</p>
            </div>
          </article>

          {/* Pillar 3: Scale */}
          <article className="model-card">
            <div className="card-top">
              <div className="icon-box" style={{ fontSize: '24px' }}>📈</div>
              <span className="badge">SCALE</span>
            </div>
            <h3><Link href="#">Digital Growth & Analytics</Link></h3>
            <p>
              We accelerate business growth through strategic digital marketing, AI Search Optimization, SEO, performance advertising, conversion optimization, and advanced analytics.
            </p>
            <div className="card-footer">
              <p>By combining data-driven insights with proven growth strategies, we help businesses attract the right audience, maximize marketing ROI, and make confident decisions that fuel long-term success.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
