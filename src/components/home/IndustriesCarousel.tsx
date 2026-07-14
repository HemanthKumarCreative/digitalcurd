'use client';

import React, { useRef, useCallback } from 'react';
import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import Link from 'next/link';

export default function IndustriesCarousel() {
  // We use refs for custom arrows as react-glider requires elements or refs
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const industries = [
    { name: 'Healthcare', link: '/industries/healthcare', img: 'healthcare.webp', title: 'Smarter Care, Better Outcomes', desc: 'Innovative software solutions to improve patient care.' },
    { name: 'Media & Entertainment', link: '/industries/media-entertainment', img: 'media.webp', title: 'Improve Engagement', desc: 'Engagement-focused software to enhance content delivery.' },
    { name: 'Retail & eCommerce', link: '/industries/retail-ecommerce', img: 'ecom.webp', title: 'Scalable Tech for Seamless Sales', desc: 'Scalable B2B & B2C solutions for your business.' },
    { name: 'FinTech', link: '/industries/fintech', img: 'fintech.webp', title: 'Innovating Finance, Empowering Growth', desc: 'Next-gen software to revolutionize financial services.' },
    { name: 'Education & eLearning', link: '/industries/edtech', img: '../industries-v6.0/education.webp', title: 'Smart Learning', desc: 'Custom eLearning solutions to meet changing industry needs.' },
    { name: 'Travel & Hospitality', link: '/industries/travel', img: 'hospitality.webp', title: 'Seamless Travel Experiences', desc: 'Booking and personalization platforms that drive loyalty.' },
    { name: 'Logistics & Supply Chain', link: '/industries/logistics', img: 'logistic.webp', title: 'Smarter Supply Chain Operations', desc: 'Real-time tracking and automation for efficient logistics.' },
    { name: 'Insurance', link: '/industries/insurance', img: 'insurance.webp', title: 'Digital Insurance, Simplified', desc: 'Scalable systems for modern insurance operations.' },
    { name: 'Automotive', link: '#', img: 'automobile.webp', title: 'Connected Mobility Solutions', desc: 'Build smart, connected, and scalable automotive systems.' },
  ];

  return (
    <section className="industries-section padding-t-120 padding-b-120" id="cp-industry-v10">
      <div className="container">
        <div className="section-header">
          <div className="header-text">
            <h2>Industries We Cater to</h2>
            <p>Get what you are looking for to fulfill your software development and outsourcing needs at ValueCoders, with our expertise on all in-demand technologies &amp; platforms.</p>
          </div>
          <div className="glider-nav">
            <button className="glider-prev" aria-label="Previous">
              <img src="https://www.valuecoders.com/wp-content/themes/valuecoders/v6.0/icons/arrow-right.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
            </button>
            <button className="glider-next" aria-label="Next">
              <img src="https://www.valuecoders.com/wp-content/themes/valuecoders/v6.0/icons/arrow-right.svg" alt="" />
            </button>
          </div>
        </div>
        
        <div className="glider-contain">
          <Glider
            className="glider"
            hasArrows={true}
            arrows={{ prev: '.glider-prev', next: '.glider-next' }}
            slidesToShow={1.2}
            slidesToScroll={1}
            draggable={true}
            responsive={[
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2.4,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3.5,
                  slidesToScroll: 1
                }
              }
            ]}
          >
            {industries.map((ind, i) => (
              <div className="industry-item" key={i}>
                <div className="industry-card">
                  <div className="card-image">
                    <img src={`https://www.valuecoders.com/wp-content/themes/valuecoders/dev-img/industries-v10/${ind.img}`} alt={ind.name} />
                  </div>
                  <div className="card-body">
                    <div className="title-wrap">
                      <h3><Link href={ind.link}>{ind.name}</Link></h3>
                    </div>
                    <div className="hover-content">
                      <div className="inner-top">
                        <h4>{ind.title}</h4>
                        <p>{ind.desc}</p>
                      </div>
                      <Link href={ind.link} className="expand-btn">Expand</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Glider>
        </div>
      </div>
    </section>
  );
}
