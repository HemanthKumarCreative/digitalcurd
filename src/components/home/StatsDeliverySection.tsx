import React from 'react';

export default function StatsDeliverySection() {
  return (
    <section className="delivery-section padding-t-120 padding-b-120">
      <div className="container">
        <div className="inner-part">
          
          {/* Left: copy */}
          <div className="delivery-section__left">
            <span>Helping businesses grow smarter</span>
            <h2>
              One Partner for Marketing, Technology & Analytics<br />
            </h2>
            <p>From ambitious startups to established enterprises, we help organizations turn ideas into measurable business growth through AI, digital marketing, commerce, and intelligent technology.</p>
            <p>From AI-powered automation and Shopify commerce to performance marketing, WhatsApp engagement, modern web development, and business intelligence—we create connected digital ecosystems that help businesses scale with confidence.</p>
          </div>
          
          {/* Right: stats grid */}
          <div className="delivery-section__right">
            {/* Card 1 */}
            <div className="stat-card">
              <div className="stat-card__number"><h3>15+</h3></div>
              <div className="stat-card__label"><p>Years Industry Experience</p></div>
            </div>

            {/* Card 2 */}
            <div className="stat-card">
              <div className="stat-card__number"><h3>100+</h3></div>
              <div className="stat-card__label"><p>Successful Digital Projects</p></div>
            </div>

            {/* Card 3 */}
            <div className="stat-card">
              <div className="stat-card__number"><h3>20+</h3></div>
              <div className="stat-card__label"><p>Business Technologies</p></div>
            </div>

            {/* Card 4: Rating */}
            <div className="stat-card">
              <div className="stat-card__number"><h3>100%</h3></div>
              <div className="stat-card__label"><p>AI Growth Strategy</p></div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
